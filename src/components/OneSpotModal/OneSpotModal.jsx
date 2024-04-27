const OneSpotModal = ({ spot, setIsSpotModalVisible }) => {
  // console.log("one spot modal, spot: ", spot);
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
          <img src={spot.spot_image.secure_url} alt={spot.title} />
          <p>{spot.description}</p>
        </div>
      </div>
    </div>
  );
};

export default OneSpotModal;
