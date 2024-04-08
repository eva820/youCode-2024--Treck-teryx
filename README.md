# Treck'teryx - A tailored recommendation service for individuals of all experience levels seeking outdoor adventure!

![image](https://github.com/eva820/youCode-2024--Treck-teryx/assets/125091369/1f75ea9c-dbb9-418f-9ab0-ad7b17f9bdae)
`Streamlining the planning so you can get to doing what you love faster!`

## Inspiration
As individuals ourselves who sometimes find it overwhelming when trying to start a new outdoor activity, Treck'teryx was created to make this process easier by helping users do all the planning - from choosing the right outdoor apparel and accessories to finding the best trails and routes for the activity - so that adventurers of all experience levels can focus on being active and staying healthy.

## What it does...
Treck'teryx first asks users to complete a quick survey to determine their preferences and personalize their experience. Then based on these results, users will be taken to our recommendation page where all the best clothes and activity sites are suggested for them. Our site facilitates Arc’teryx’s omnichannel strategy by providing users with the option of buying online or going to their nearest retail store, effectively converting ordinary users into eager customers.

## How we built it!
As a team, we used Github for version control. To build the website, we used React.JS for frontend development, and Flask to integrate the frontend with the backend, which was built with Python. 

The computer vision component was built using the OpenCV and Google’s MediaPipe libraries in Python. OpenCV is used to decode and stream the webcam data to which MediaPipe adds the landmarks to (the dots you see mapped on a figure). With this combination, we have set up quality assurance functions to ensure we can get a good few seconds of data, which we then use PyTorch on to compute the averages of several ratios of a person’s body based on their height.

Afterwards, by using prompt engineering on the GPT 3.5 Turbo model, we are able to predict the user’s measurements on Arc’teryx products based on their body scan. 

![image](https://github.com/eva820/youCode-2024--Treck-teryx/assets/125091369/c83949d2-6e32-45d9-a9e5-ff70e2a92c07)
`Check out this cool body scan feature that analyzes your clothing size measurements for you!`

## Challenges we ran into...
_Body Scan Feature:_
Computer vision is hard, who knows. For as high level a language Python is, it can sink to near-C level when debugging PyTorch and OpenCV code. For quite a while, we couldn’t stream the webcam data to our website while also doing calculations on the joint coordinates of the scan. Not only is this hard to debug since it mixes the front and backend, it is also hard to debug since it’s broadcasting a continuous stream of data which renders utilities like pdb useless. 

_Product Recommendation System:_
We had difficulties integrating the product recommendation values with the actual site, as we were not incredibly experienced with React.JS.

## Accomplishments that we're proud of!
Above all, the Treck’teryx team is quite proud of the effort we put into this project and how much we were able to get done in 24 hours. We think our body scan and recommendation system features especially are key highlights of our development. Overall it feels fulfilling to produce a polished product after overcoming all the obstacles and challenges we encountered along the way during development. We think our final project fits the theme of this hackathon and the prompt well, so we’re excited to show it off!

## What we learned…
Although we encountered numerous obstacles, the most important thing we learned was that perseverance goes a long way. It was our grit and passion for this project that led us to creating our Treck’teryx site despite all our struggles. This project also helped us all develop our programming abilities using React, Flask, and the other technologies we used.

## What's next for Treck'teryx?
We see a great opportunity for Treck’teryx to get implemented in various fields, such as being implemented into in-person Arc'teryx shops and partnerships.

## Presentation Pitch Slides Deck
https://docs.google.com/presentation/d/1RZUA3sCIa3l3c5tdb7bksX2rSd9sgSCCIcjNVkj5_fQ/edit?usp=sharing
