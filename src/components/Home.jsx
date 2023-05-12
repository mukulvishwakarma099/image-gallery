import React from "react";
import ActionBar from "./ActionBar";
import Card from "./Card";

const Home = ({ allImages, image }) => {
  return (
    <div>
      <ActionBar image={image} allImages={allImages} />
      <div className="gallery-wrapper">
        <div className="gallery">
          {allImages?.map((item) => (
            <Card key={item.id} item={item} image={image} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;
