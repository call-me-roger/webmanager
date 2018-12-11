import React from "react";

const CardReveal = () => {
  return (
    <div className="col s6 m4">
      <div className="card">
        <div className="card-image waves-effect waves-block waves-light">
          <img
            className="activator"
            src="https://materializecss.com/images/office.jpg"
            alt="test card"
          />
        </div>
        <div className="card-content">
          <span className="card-title activator grey-text text-darken-4">
            Card Reveal<i className="material-icons right">more_vert</i>
          </span>
          <p>
            <a href="#link">This is a link</a>
          </p>
        </div>
        <div className="card-reveal">
          <span className="card-title grey-text text-darken-4">
            Card Reveal<i className="material-icons right">close</i>
          </span>
          <p>
            Here is some more information about this product that is only
            revealed once clicked on.
          </p>
        </div>
      </div>
    </div>
  );
};

export default CardReveal;
