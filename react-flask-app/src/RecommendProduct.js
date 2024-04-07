import React, { useState } from "react";
import Stores from "./Stores";

const RecommendProduct = () => {
  
  const [showNearestStore, setShowNearestStore] = useState(false);

  return (
    !showNearestStore ? (
      <div className = "columns" >
        <div className="left">
          <h3 className="survey-title">Trails For You!</h3>
          <div className="trails">
            <div className="trail-item">
              <div className="trail-columns">
                <div>
                  <img src="https://images.alltrails.com/eyJidWNrZXQiOiJhc3NldHMuYWxsdHJhaWxzLmNvbSIsImtleSI6InVwbG9hZHMvcGhvdG8vaW1hZ2UvNTUzMjY1MzQvNDI0ZGI1ZWVjZDQ4NGVhOGZmMmRjZjhiZTVmYzcyNWQuanBnIiwiZWRpdHMiOnsidG9Gb3JtYXQiOiJ3ZWJwIiwicmVzaXplIjp7IndpZHRoIjoyMDQ4LCJoZWlnaHQiOjIwNDgsImZpdCI6Imluc2lkZSJ9LCJyb3RhdGUiOm51bGwsImpwZWciOnsidHJlbGxpc1F1YW50aXNhdGlvbiI6dHJ1ZSwib3ZlcnNob290RGVyaW5naW5nIjp0cnVlLCJvcHRpbWlzZVNjYW5zIjp0cnVlLCJxdWFudGlzYXRpb25UYWJsZSI6M319fQ==" />
                </div>
                <div>
                  <p>
                    <h4>Salish Trail - Admiralty Trail - West Canyon</h4>
                    Head out on this 7.4-km loop trail near Greater Vancouver...
                    <br></br>
                    View on <a target="_blank" rel="noopener noreferrer" href="https://www.alltrails.com/trail/canada/british-columbia/salish-trail-admiralty-trail-west-canyon">AllTrails</a>
                  </p>
                </div>
              </div>
            </div>
            <div className="trail-item">
            <div className="trail-columns">
                <div>
                  <img src="https://images.alltrails.com/eyJidWNrZXQiOiJhc3NldHMuYWxsdHJhaWxzLmNvbSIsImtleSI6InVwbG9hZHMvcGhvdG8vaW1hZ2UvNjI5NDU0NDUvODgwYzU4ZWJhM2Y2YTY1ZTYwYTQ0MzVhOGQ4ODk1MjIuanBnIiwiZWRpdHMiOnsidG9Gb3JtYXQiOiJ3ZWJwIiwicmVzaXplIjp7IndpZHRoIjoyMDQ4LCJoZWlnaHQiOjIwNDgsImZpdCI6Imluc2lkZSJ9LCJyb3RhdGUiOm51bGwsImpwZWciOnsidHJlbGxpc1F1YW50aXNhdGlvbiI6dHJ1ZSwib3ZlcnNob290RGVyaW5naW5nIjp0cnVlLCJvcHRpbWlzZVNjYW5zIjp0cnVlLCJxdWFudGlzYXRpb25UYWJsZSI6M319fQ==" />
                </div>
                <div>
                  <p>
                    <h4>Sword Fern Trail - Salish Trail - Iron Knee Trail</h4>
                    Enjoy this 10.9-km out-and-back trail near Musqueam 2...
                    <br></br>
                    View on <a target="_blank" rel="noopener noreferrer" href="https://www.alltrails.com/explore/trail/canada/british-columbia/sword-fern-trail-salish-trail-iron-knee-trail">AllTrails</a>
                  </p>
                </div>
              </div>
            </div>
            <div className="trail-item">
            <div className="trail-columns">
                <div>
                  <img src="https://images.alltrails.com/eyJidWNrZXQiOiJhc3NldHMuYWxsdHJhaWxzLmNvbSIsImtleSI6InVwbG9hZHMvcGhvdG8vaW1hZ2UvMjg1Mjg3MjUvM2M2ODZkODRjNjQwYjMzMTg1N2IzZGE0NmMwMjNlNzEuanBnIiwiZWRpdHMiOnsidG9Gb3JtYXQiOiJ3ZWJwIiwicmVzaXplIjp7IndpZHRoIjoyMDQ4LCJoZWlnaHQiOjIwNDgsImZpdCI6Imluc2lkZSJ9LCJyb3RhdGUiOm51bGwsImpwZWciOnsidHJlbGxpc1F1YW50aXNhdGlvbiI6dHJ1ZSwib3ZlcnNob290RGVyaW5naW5nIjp0cnVlLCJvcHRpbWlzZVNjYW5zIjp0cnVlLCJxdWFudGlzYXRpb25UYWJsZSI6M319fQ==" />
                </div>
                <div>
                  <p>
                    <h4>Wreck Beach and Foreshore Trail</h4>
                    Enjoy this 6.9-km out-and-back trail near Gambier Island Trust Area...
                    <br></br>
                    View on <a target="_blank" rel="noopener noreferrer" href="https://www.alltrails.com/explore/trail/canada/british-columbia/wreck-beach-and-foreshore-trail">AllTrails</a>
                  </p>
                </div>
              </div>
            </div>
            
          </div>
        </div>
        <div className="middle">
          <h3 className="survey-title">Based on your preferences...</h3>
          <img className="placeholder" src="https://upload.wikimedia.org/wikipedia/commons/4/49/A_black_image.jpg" alt="placeholder" />
          <p>Based on your preferences and your personalized measurements, we have determined "product_name" to be the best for you!</p>
          <div className="button-container">
            <button className="button" type="button">Buy Online</button>
            <button className="button" type="button" onClick={() => {setShowNearestStore(true)}}>Find Nearest Store</button>
          </div>
        </div>
        <div className="right">
          <h3 className="survey-title">More For You:</h3>
          <div className="grid">
            <div className="grid-item">
              <p>
                <h4>Product 1</h4>
                <img src="https://images.arcteryx.com/details/1350x1710/F23-X000007341-Beta-Insulated-Jacket-Black-Front-View.jpg"/>
                <br></br>
                bla bla bla bla bla bla bla bla bla bla bla bla
              </p>
            </div>
            <div className="grid-item">
              <p>
                <h4>Product 2</h4>
                <img src="https://images.arcteryx.com/details/1350x1710/F23-X000007341-Beta-Insulated-Jacket-Black-Front-View.jpg" />
                <br></br>
                bla bla bla bla bla bla bla bla bla bla bla bla
              </p>
            </div>
            <div className="grid-item">
              <p>
                <h4>Product 4</h4>
                <img src="https://images.arcteryx.com/details/1350x1710/F23-X000007341-Beta-Insulated-Jacket-Black-Front-View.jpg" />
                <br></br>
                bla bla bla bla bla bla bla bla bla bla bla bla
              </p>
            </div>
            <div className="grid-item">
              <p>
                <h4>Product 4</h4>
                <img src="https://images.arcteryx.com/details/1350x1710/F23-X000007341-Beta-Insulated-Jacket-Black-Front-View.jpg" />
                <br></br>
                bla bla bla bla bla bla bla bla bla bla bla bla
              </p>
            </div>  
          </div>
        </div>
      </div >
    ) : (
      <div className="stores">
        <Stores />
      </div>
    )
    );
  }

export default RecommendProduct;