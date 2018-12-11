import React from "react";

const ImageCard = () => {
  return (
    <div className="col s6 m4">
      <div className="card">
        <div className="card-image">
          <img
            src="https://materializecss.com/images/sample-1.jpg"
            alt="Test Card"
          />
          <span className="card-title">Image Card</span>
        </div>
        <div className="card-content">
          <p>
            I am a very simple card. I am good at containing small bits of
            information. I am convenient because I require little markup to use
            effectively.
          </p>
        </div>
        <div className="card-action">
          <a href="#link">This is a link</a>
        </div>
      </div>
    </div>
  );
};

export default ImageCard;
