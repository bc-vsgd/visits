import { useState } from "react";
import axios from "axios";

const OneSpotForm = ({ url, id }) => {
  // state id: visit id
  const [files, setFiles] = useState({});
  const [title, setTitle] = useState("");
  const [categories, setCategories] = useState([]);
  const [description, setDescription] = useState("");
  const [link, setLink] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const spotSubmit = async (event) => {
    event.preventDefault();
    // Conditions: pictures + title
    if (Object.keys(files).length > 0 && title) {
      try {
        const formData = new FormData();
        formData.append("title", title);
        formData.append("categories", categories);
        formData.append("description", description);
        formData.append("link", link);

        for (const key in files) {
          if (Object.hasOwnProperty.call(files, key)) {
            formData.append("pictures", files[key]);
          }
        }

        const { data } = await axios.post(
          `${url}/visit/${id}/spot/create`,
          formData,
          { headers: { "Content-Type": "multipart/form-data" } }
        );
        console.log("One spot comp, data: ", data);
      } catch (error) {
        console.log("One spot form comp, error: ", error);
      }
    } else {
      if (Object.keys(files).length === 0) {
        setErrorMessage("This spot must have pictures");
      } else if (!title) {
        setErrorMessage("This spot must have a title");
      }
    }
  };
  return (
    <div>
      <form onSubmit={spotSubmit} className="one-spot-form">
        <input
          type="file"
          multiple
          onChange={(event) => {
            // console.log(event.target.files);
            setFiles(event.target.files);
            setErrorMessage("");
          }}
        />
        {/* Display pictures */}
        {Object.keys(files).length !== 0 && (
          <div>
            {Object.keys(files).map((key, index) => {
              return (
                <img
                  key={index}
                  src={URL.createObjectURL(files[key])}
                  alt="Picture"
                />
              );
            })}
          </div>
        )}
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(event) => {
            setTitle(event.target.value);
            setErrorMessage("");
          }}
        />
        <input
          type="text"
          placeholder="Description"
          value={description}
          onChange={(event) => {
            setDescription(event.target.value);
          }}
        />
        <input
          type="text"
          placeholder="Categories: building, street, ..."
          value={categories}
          onChange={(event) => {
            setCategories(event.target.value);
          }}
        />
        <input
          type="text"
          placeholder="Link"
          value={link}
          onChange={(event) => {
            setLink(event.target.value);
          }}
        />
        <button>Add this spot</button>
        <div>{errorMessage}</div>
      </form>
    </div>
  );
};

export default OneSpotForm;
