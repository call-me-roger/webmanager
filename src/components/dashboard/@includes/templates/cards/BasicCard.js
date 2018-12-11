import React from "react";

const BasicCard = () => {
  return (
    <div className="col s6 m4">
      <div className="card blue-grey darken-1">
        <div className="card-content white-text">
          <span className="card-title">Basic Card</span>
          <p>
            I am a very simple card. I am good at containing small bits of
            information. I am convenient because I require little markup to use
            effectively.
          </p>
        </div>
        <div className="card-action">
          <a href="#link">This is a link</a>
          <a href="#link">This is a link</a>
        </div>
      </div>
    </div>
  );
};

export default BasicCard;
