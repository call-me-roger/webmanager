import React from "react";
import Slide from "@material-ui/core/Slide";

const SlideTransition = props => {
  const direction = props.direction ? props.direction : "up";
  return <Slide direction={direction} {...props} />;
};

export default SlideTransition;
