from flask import Flask, Response
import cv2
import base64
from flask_cors import CORS  # Import CORS from flask_cors
import mediapipe as mp
import numpy as np
import time
import torch
import math

app = Flask(__name__)
CORS(app)

def body_in_frame(landmarks, mp_pose):
    left = landmarks[mp_pose.PoseLandmark.LEFT_HEEL.value].y
    right = landmarks[mp_pose.PoseLandmark.RIGHT_HEEL.value].y
    nose = landmarks[mp_pose.PoseLandmark.NOSE.value].y
    print('got here')

    # heel out of frame
    if left > 0.95 or right > 0.95:
        return False
    # heel wayy to in frame
    if left < 0 or right < 0 or nose < 0:
        return False
    if nose > 0.15:
        return False

    return True

# pair is the two landmarks we want to measure between
def get_distance_between_two_t(avg_tensor, pair):
    l1, l2 = pair[0], pair[1]
    
    i1_x = avg_tensor[l1][0]
    i1_y = avg_tensor[l1][1]
    i2_x = avg_tensor[l2][0]
    i2_y = avg_tensor[l2][1]

    return math.sqrt((i1_x - i2_x)**2 + (i1_y - i2_y)**2)

def get_distance_t(avg_tensor, landmarks):
    distance = 0
    
    for i in range(len(landmarks) - 1):  # Iterate up to the second last element
        pair = (landmarks[i], landmarks[i+1])  # Access current element and the next one
        distance += get_distance_between_two_t(avg_tensor, pair)

    return distance

def base_neck_tensor(avg_tensor, mp_pose):
    base = torch.zeros(4)
    base[0] = (avg_tensor[mp_pose.PoseLandmark.LEFT_SHOULDER.value][0] + avg_tensor[mp_pose.PoseLandmark.RIGHT_SHOULDER.value][0]) / 2
    avg_y_mouth = (avg_tensor[mp_pose.PoseLandmark.MOUTH_LEFT.value][1] + avg_tensor[mp_pose.PoseLandmark.MOUTH_RIGHT.value][1]) / 2
    avg_y_shoulder = (avg_tensor[mp_pose.PoseLandmark.LEFT_SHOULDER.value][1] + avg_tensor[mp_pose.PoseLandmark.RIGHT_SHOULDER.value][1]) / 2
    base[1] = (avg_y_mouth + avg_y_shoulder) / 2
    
    # print(base)
    return base

def find_sleeve(avg_tensor, mp_pose):
    # print(avg_tensor)
    d1 = get_distance_t(avg_tensor, [mp_pose.PoseLandmark.LEFT_SHOULDER.value, mp_pose.PoseLandmark.LEFT_ELBOW.value, mp_pose.PoseLandmark.LEFT_WRIST.value])
    d2 = get_distance_t(avg_tensor, [mp_pose.PoseLandmark.RIGHT_SHOULDER.value, mp_pose.PoseLandmark.RIGHT_ELBOW.value, mp_pose.PoseLandmark.RIGHT_WRIST.value])

    base_tensor = base_neck_tensor(avg_tensor)
    print(base_tensor)

    d1 += math.sqrt((base_tensor[0] - avg_tensor[mp_pose.PoseLandmark.LEFT_SHOULDER.value][0])**2 + (base_tensor[1] - avg_tensor[mp_pose.PoseLandmark.LEFT_SHOULDER.value][1])**2)
    d2 += math.sqrt((base_tensor[0] - avg_tensor[mp_pose.PoseLandmark.RIGHT_SHOULDER.value][0])**2 + (base_tensor[1] - avg_tensor[mp_pose.PoseLandmark.RIGHT_SHOULDER.value][1])**2)

    # print(d1, d2)
    
    # print(d1, d2)
    return (d1 + d2) / 2

def find_inseam(avg_tensor, mp_pose):
    d1 = get_distance_t(avg_tensor, [mp_pose.PoseLandmark.LEFT_HIP.value, mp_pose.PoseLandmark.LEFT_KNEE.value, mp_pose.PoseLandmark.LEFT_ANKLE.value])
    d2 = get_distance_t(avg_tensor, [mp_pose.PoseLandmark.RIGHT_HIP.value, mp_pose.PoseLandmark.RIGHT_KNEE.value, mp_pose.PoseLandmark.RIGHT_ANKLE.value])
    # print(d1, d2)
    return (d1 + d2) / 2

def find_height(avg_tensor, mp_pose):
    avg_bottom_x = (avg_tensor[mp_pose.PoseLandmark.LEFT_ANKLE.value][0] + avg_tensor[mp_pose.PoseLandmark.RIGHT_ANKLE.value][0]) / 2
    avg_bottom_y = (avg_tensor[mp_pose.PoseLandmark.LEFT_ANKLE.value][1] + avg_tensor[mp_pose.PoseLandmark.RIGHT_ANKLE.value][1]) / 2
    nose = mp_pose.PoseLandmark.NOSE.value
    
    return math.sqrt((avg_tensor[nose][0] - avg_bottom_x)**2 + (avg_tensor[nose][1] - avg_bottom_y)**2)




def webcam(mp_drawing, mp_pose):
    cap = cv2.VideoCapture(0)
    captured_body = False
    quit = False
    measurements = []
    start = None
    image = None

    with mp_pose.Pose(min_detection_confidence=0.5, min_tracking_confidence=0.5) as pose:
        while cap.isOpened():
            ret, frame = cap.read()
        
            image = cv2.cvtColor(frame, cv2.COLOR_BGR2RGB)
            results = pose.process(image)
            image = cv2.cvtColor(image, cv2.COLOR_RGB2BGR)

            if results.pose_landmarks:
            # try:
                landmarks = results.pose_landmarks.landmark
                
                # variables to maintain continous stream of data
                if not captured_body:
                    captured_body = True
                    start = time.time() 

                # if our body isn't in frame, restart
                if not body_in_frame(landmarks, mp_pose):
                    captured_body = False
                    start = None
                    measurements.clear()
                    
                # add landmarks to our current stuff
                if captured_body:
                    measurements.append(landmarks)
                    
                    # quit when we have 3 seconds of data
                    if time.time() - start > 1:
                        quit = True
                
            # except:
            #     captured_body = False
            #     start = None
            #     measurements.clear()

            mp_drawing.draw_landmarks(image, results.pose_landmarks, mp_pose.POSE_CONNECTIONS)
            ret, buffer = cv2.imencode('.jpg', image)
            frame = buffer.tobytes()
            yield (b'--frame\r\n'
                b'Content-Type: image/jpeg\r\n\r\n' + frame + b'\r\n')
            print(measurements)
            
            if quit:
                break

    cap.release()

    tensor_data = torch.zeros(len(measurements), 33, 4)
    print(tensor_data.shape)

    for idx, itm in enumerate(measurements):
        for jdx, jtm in enumerate(itm):
            tensor_data[idx][jdx][0] = jtm.x
            tensor_data[idx][jdx][1] = jtm.y
            tensor_data[idx][jdx][2] = jtm.z
            tensor_data[idx][jdx][3] = jtm.visibility 

    avg_tensor = torch.mean(tensor_data[:, :, :], dim=0)
    # for i,tns in enumerate(avg_tensor):
    #     print(tns, i)
    print(find_height(avg_tensor, mp_pose))

    return find_height(avg_tensor, mp_pose)


@app.route('/webcam')
def webcam_display():
    mp_drawing = mp.solutions.drawing_utils
    mp_pose = mp.solutions.pose
    # height = webcam(mp_drawing, mp_pose)
    return Response(webcam(mp_drawing, mp_pose), mimetype='multipart/x-mixed-replace;boundary=frame')
    # return Response(str(height), mimetype='text/plain')



if __name__ == '__main__':
    app.run(debug = True, port = 8080)
