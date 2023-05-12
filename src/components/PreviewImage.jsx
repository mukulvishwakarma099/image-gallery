import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { BiArrowBack } from "react-icons/bi";

const PreviewImage = ({ allImages }) => {
  const { id } = useParams();
  const navigate = useNavigate();

  const image = allImages.find((img) => {
    return img.id === parseInt(id);
  });

  const { caption, url, date } = image;
  return (
    <div className="preview-container">
      <div className="preview-title">
        <h3>{caption}</h3>
        <span
          style={{
            display: "flex",
            alignItems: "center",
            flexDirection: "column",
            fontSize: "1.2rem",
          }}
        >
          <BiArrowBack onClick={() => navigate("/")} />
          <span style={{ fontSize: ".8rem" }}>Home</span>
        </span>
      </div>
      <div className="preview-image">
        <img src={url} alt="" />
      </div>
      <p>Clicked on:- {date}</p>
    </div>
  );
};

export default PreviewImage;
