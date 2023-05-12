import React from "react";
import { Link } from "react-router-dom";

const Card = ({ item, image }) => {
  // select the image on basis of their id and changing css class if true and false
  async function handleClick(item) {
    const { id, select } = item;
    await image.update(id, { select: !select });
  }
  return (
    <>
      <div className="card-wrapper">
        <div
          className={item.select ? "selected" : "card"}
          onClick={() => handleClick(item)}
        >
          <div className="image-container">
            <img className="image" src={item?.url} alt="" />
          </div>
          <div className="description">
            <p>{item.caption}</p>
            <span>{item.date}</span>
          </div>
        </div>
        <div className="preview">
          <Link to={`/preview/${item.id}`}>
            <button>Preview</button>
          </Link>
        </div>
      </div>
    </>
  );
};

export default Card;
