import React from "react";
import BasicCard from "./cards/BasicCard";
import ImageCard from "./cards/ImageCard";
import ImageActionCard from "./cards/ImageActionCard";
import CardReveal from "./cards/CardReveal";
import OptionsCard from "./cards/OptionsCard";
import TabsCard from "./cards/TabsCard";

const Templates = () => {
  return (
    <div className="container row section">
      <h3>Cards</h3>
      <div
        className="valign-wrapper left-align"
        style={{ flexFlow: "row wrap" }}
      >
        <BasicCard />
        <ImageCard />
        <TabsCard />
        <CardReveal />
        <OptionsCard />
        <ImageActionCard />
      </div>
    </div>
  );
};

export default Templates;
