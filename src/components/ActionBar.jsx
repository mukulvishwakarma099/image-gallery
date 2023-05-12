import React from "react";
import axios from "axios";
import dateFormat from "dateformat";
import { MdCloudUpload } from "react-icons/md";

const ActionBar = ({ allImages, image }) => {
  const selectedCardsId = allImages
    ?.filter((item) => item.select == true)
    .map((item) => item.id);

  // to delete images ---------->
  function handleRemove() {
    image
      .bulkDelete(selectedCardsId)
      .then((data) => console.log(data))
      .catch((err) => console.log(err.message));
  }

  // to download images ---------->
  function handleDownload() {
    const imgURLs = allImages
      ?.filter((item) => item.select == true)
      .map((item) => item.url);
    if (imgURLs.length) {
      for (const url of imgURLs) {
        axios({
          url: url,
          method: "GET",
          responseType: "blob",
        }).then((res) => {
          const url = window.URL.createObjectURL(new Blob([res.data]));
          const link = document.createElement("a");
          link.href = url;
          link.setAttribute("download", `image.jpg`);
          document.body.appendChild(link);
          link.click();
          window.URL.revokeObjectURL(url);
        });
      }
    }
  }

  // to select all images ---------->
  async function handleSelectAll(e) {
    const { checked } = e.target;
    let newImages = allImages.map((elem) => elem);
    let ids = newImages.map((i) => i.id);
    if (checked) {
      for (const id of ids) {
        await image.update(id, { select: true });
      }
    } else {
      for (const id of ids) {
        await image.update(id, { select: false });
      }
    }
  }

  // to get url of images ---------->
  const getBase64 = (file) => {
    /**
     * It takes a file and returns a promise that resolves to the base64 representation of the file (image in our case).
     * @returns A promise that resolves to a base64 encoded string.
     */
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
      reader.readAsDataURL(file);
    });
  };

  // to upload image ---------->
  async function chooseFile(e) {
    const file = e.target.files[0];

    await image.add({
      id: file.lastModified,
      url: await getBase64(file),
      caption: file.name,
      date: dateFormat(new Date().toLocaleDateString(), "mmm d"),
      select: false,
    });
  }

  return (
    <div>
      <div className="actionbar">
        {selectedCardsId?.length ? (
          <div className="img-select">
            <p>{selectedCardsId?.length} selected</p>
          </div>
        ) : (
          ""
        )}

        {selectedCardsId?.length ? (
          <div className="action-btn">
            <div className="checkbox">
              <label htmlFor="checkbox">Select All</label>
              <input
                type="checkbox"
                name="selectAll"
                id="SelectAll"
                onClick={(e) => {
                  handleSelectAll(e);
                }}
              />
            </div>

            <div>
              <button className="delete" onClick={handleRemove}>
                Remove
              </button>
              <button className="download" onClick={handleDownload}>
                Download
              </button>
            </div>
          </div>
        ) : (
          <div className="flex-center upload-container">
            <label>
              <input
                id="input"
                type="file"
                accept="image/*"
                onChange={chooseFile}
                style={{ display: "none" }}
              />

              <p className="upload">
                <MdCloudUpload />
                Upload
              </p>
            </label>
          </div>
        )}
      </div>
    </div>
  );
};

export default ActionBar;
