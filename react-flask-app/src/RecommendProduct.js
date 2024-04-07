import React from "react";

export function RecommendProduct() {
    return (
      <div className="product">
        <h3 className="survey-title">Based on your preferences...</h3>
        <img className="placeholder" src="https://upload.wikimedia.org/wikipedia/commons/4/49/A_black_image.jpg" alt="placeholder"/>
        <p>Wow!</p>
        <div className="button-container">
          <button className="button" type="button">Buy Online</button>
          <button className="button" type="button">Find Nearest Store</button>
        </div>
      </div>
    );
  }