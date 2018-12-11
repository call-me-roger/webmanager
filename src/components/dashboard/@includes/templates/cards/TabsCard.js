import React from "react";

const TabsCard = () => {
  return (
    <div className="col s6 m4">
      <div className="card blue">
        <div className="card-content white-text">
          <p>
            I am a very simple card. I am good at containing small bits of
            information. I am convenient because I require little markup to use
            effectively.
          </p>
        </div>
        <div className="card-tabs">
          <ul className="tabs tabs-fixed-width tabs-transparent">
            <li className="tab">
              <a href="#test1">Test 1</a>
            </li>
            <li className="tab">
              <a href="#test2">Test 2</a>
            </li>
            <li className="tab">
              <a href="#test3" className="active">
                Test 3
              </a>
            </li>
            <li className="indicator" />
          </ul>
        </div>
        <div className="card-content blue lighten-5">
          <div id="test1">Test 1</div>
          <div id="test2">Test 2</div>
          <div id="test3" className="active">
            Test 3
          </div>
        </div>
      </div>
    </div>
  );
};

export default TabsCard;
