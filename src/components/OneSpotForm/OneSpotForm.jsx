import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const OneSpotForm = ({ url, id, setIsLoading, dataLength, setDataLength }) => {
  // console.log("one spot form, dataLength: ", dataLength);
  const navigate = useNavigate();
  // state id: visit id
  const [files, setFiles] = useState({});
  const [title, setTitle] = useState("");
  const [categories, setCategories] = useState([""]);
  const [description, setDescription] = useState("");
  const [link, setLink] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  // console.log("categories: ", categories.length);

  // Form submit
  const spotSubmit = async (event) => {
    event.preventDefault();
    // Conditions: pictures + title
    if (Object.keys(files).length > 0 && title) {
      // Spots form page: loader display
      setIsLoading(true);

      try {
        // console.log("form submit, categories: ", categories);
        const formData = new FormData();
        formData.append("title", title);
        formData.append("categories", JSON.stringify(categories));
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
        setDataLength((prev) => {
          return prev + 1;
        });
      } catch (error) {
        console.log("One spot form comp, error: ", error);
      }
      // Reset form
      setFiles({});
      setTitle("");
      setCategories([]);
      setDescription("");
      setLink("");
    } else {
      if (Object.keys(files).length === 0) {
        setErrorMessage("This spot must have pictures");
      } else if (!title) {
        setErrorMessage("This spot must have a title");
      }
    }
  };

  // Delete a selected picture
  const deleteFile = (fileKey) => {
    const filesCopy = {};
    const filesArray = Object.entries(files);
    filesArray.splice(fileKey, 1);
    for (let i = 0; i < filesArray.length; i++) {
      filesCopy[i] = filesArray[i][1];
    }
    setFiles(filesCopy);
  };

  return (
    <div>
      <form onSubmit={spotSubmit} className="flex-col one-spot-form">
        {/* Pictures */}
        <div>
          <input
            type="file"
            multiple
            onChange={(event) => {
              // Pictures already selected: add new pictures
              if (Object.entries(files).length > 0) {
                const filesCopy = {};
                const filesArray = Object.entries(files);
                const selectedFiles = Object.entries(event.target.files);
                filesArray.push(...selectedFiles);
                for (let i = 0; i < filesArray.length; i++) {
                  filesCopy[i] = filesArray[i][1];
                }
                setFiles(filesCopy);
              } else {
                // No picture selected yet
                setFiles(event.target.files);
              }
              setErrorMessage("");
            }}
          />
          {/* Display pictures */}
          {Object.keys(files).length !== 0 && (
            <div className="flex-row">
              {Object.keys(files).map((fileKey, index) => {
                return (
                  <div key={index}>
                    <img
                      src={URL.createObjectURL(files[fileKey])}
                      alt="Picture"
                    />
                    <button
                      type="button"
                      onClick={() => {
                        deleteFile(fileKey);
                      }}
                    >
                      X
                    </button>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        <div className="flex-row">
          {/* Title */}
          <input
            type="text"
            placeholder="Title"
            value={title}
            onChange={(event) => {
              setTitle(event.target.value);
              setErrorMessage("");
            }}
          />
          {/* Description */}
          <input
            type="text"
            placeholder="Description"
            value={description}
            onChange={(event) => {
              setDescription(event.target.value);
            }}
          />
          {/* Categories */}
          <div className="flex-col">
            {categories.map((category, index) => {
              return (
                <div key={index}>
                  <div className="flex-row">
                    <input
                      type="text"
                      placeholder={`Categories: ${index}`}
                      value={categories[index]}
                      onChange={(event) => {
                        const arr = [...categories];
                        arr[index] = event.target.value;
                        setCategories(arr);
                      }}
                    />
                    <button
                      type="button"
                      onClick={() => {
                        const arr = [...categories];
                        arr.push("");
                        setCategories(arr);
                      }}
                    >
                      Add category
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
          {/* Link */}
          <input
            type="text"
            placeholder="Link"
            value={link}
            onChange={(event) => {
              setLink(event.target.value);
            }}
          />
        </div>
        {/* Button: add the spot */}
        <button>Add this spot</button>
        <div>{errorMessage}</div>
      </form>
      {/* Button: register the visit */}
      {dataLength > 0 && (
        <button
          onClick={() => {
            navigate(`/visit/${id}`);
          }}
        >
          Close this visit
        </button>
      )}
    </div>
  );
};

export default OneSpotForm;
