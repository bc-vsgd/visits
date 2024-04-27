import { useState, useEffect } from "react";

const OneSpotModal = ({ spot, setIsSpotModalVisible }) => {
  // console.log("one spot modal, spot: ", spot);
  // Get all pictures in a single array
  const picsArray = [];
  picsArray.push(spot.spot_image.secure_url);
  if (spot.spot_pictures) {
    for (let i = 0; i < spot.spot_pictures.length; i++) {
      picsArray.push(spot.spot_pictures[i].secure_url);
    }
  }
  // States
  const [imgIndex, setImgIndex] = useState(0);
  const [imgToDisplay, setImgToDisplay] = useState("");

  useEffect(() => {
    setImgToDisplay(picsArray[imgIndex]);
  }, [imgIndex]);

  // Carousel buttons actions
  const changePicture = (action) => {
    if (action === "+") {
      if (imgIndex === picsArray.length - 1) {
        setImgIndex(0);
      } else {
        setImgIndex((prev) => prev + 1);
      }
    } else if (action === "-") {
      if (imgIndex === 0) {
        setImgIndex(picsArray.length - 1);
      } else {
        setImgIndex((prev) => prev - 1);
      }
    }
  };

  return (
    <div
      className="spot-modal-parent flex-row"
      onClick={() => {
        setIsSpotModalVisible(false);
      }}
    >
      <div
        className="spot-modal"
        onClick={(event) => {
          event.stopPropagation();
        }}
      >
        <button
          onClick={() => {
            setIsSpotModalVisible(false);
          }}
        >
          X
        </button>
        <div>
          <p>{spot.title}</p>
          {picsArray.length > 1 && (
            <button
              onClick={() => {
                changePicture("-");
              }}
            >
              -
            </button>
          )}
          <img src={imgToDisplay} alt={spot.title} />
          {picsArray.length > 1 && (
            <button
              onClick={() => {
                changePicture("+");
              }}
            >
              +
            </button>
          )}
          <p>{spot.description}</p>
          <p>
            <a
              href="https://www.w3schools.com/tags/att_a_target.asp"
              target="_parent"
            >
              Link
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default OneSpotModal;
