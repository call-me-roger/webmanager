import React from "react";

const ImageActionCard = () => {
  return (
    <div className="col s6 m4">
      <div className="card">
        <div className="card-image">
          <img
            src="https://materializecss.com/images/sample-1.jpg"
            alt="test action card"
          />
          <span className="card-title">Image Action Card</span>
          <a
            className="btn-floating halfway-fab waves-effect waves-light red"
            href="#test"
          >
            <i className="material-icons">add</i>
          </a>
        </div>
        <div className="card-content">
          <p>
            I am a very simple card. I am good at containing small bits of
            information. I am convenient because I require little markup to use
            effectively.
          </p>
        </div>
      </div>
    </div>
  );
};

export default ImageActionCard;
