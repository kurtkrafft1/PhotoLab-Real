import React, { useState } from "react";
import { Button, Modal, Form, Input, TextArea } from "semantic-ui-react";
import PhotographyManager from "../../modules/PhotographyManager";
import keys from "../../keys/ApiKies";
import moment from "moment";

const NewPhotoModal = props => {
  const [newPhoto, setNewPhoto] = useState({
    title: "",
    description: "",
    userId: "",
    likes: ""
  });
  const [image, setImage] = useState({ url: "" });
  const [isLoading, setIsLoading] = useState(false);
  const user = JSON.parse(sessionStorage.getItem("credentials"));
  // const user={id:1}

  const handleFieldChange = e => {
    const stateToChange = { ...newPhoto };
    stateToChange[e.target.id] = e.target.value;
    setNewPhoto(stateToChange);
  };
  const postNewPhoto = e => {
    e.preventDefault();
    if (newPhoto.title === "" || image.url === "") {
      window.alert("Please fill out the title and upload an image");
    } else {
      let m = moment();
      const photo = {
        userId: user.id,
        title: newPhoto.title,
        description: newPhoto.description,
        url: image.url,
        date: m.format(" MMM ~ Do ~ YYYY"),
        likes: 1
      };
      console.log(m)
      console.log(m.format(" MMM ~ Do ~ YYYY"));
   
      setImage({ url: "" });
      PhotographyManager.postNewphoto(photo).then(
        props.toggleModal,
        setNewPhoto({
          url:
            "https://seeba.se/wp-content/themes/consultix/images/no-image-found-360x260.png"
        })
      );
    }
  };
  const uploadImage = async e => {
    const files = e.target.files;
    const data = new FormData();
    data.append("file", files[0]);
    data.append("upload_preset", "photoLab");
    setIsLoading(true);
    const res = await fetch(
      `https://api.cloudinary.com/v1_1/${keys.cloudinary}/image/upload`,
      {
        method: "POST",
        body: data
      }
    );
    const file = await res.json();
    setImage({ url: file.secure_url });
    setIsLoading(false);
  };
  return (
    <Modal
      id="signup-modal"
      open={props.modalOpen}
      trigger={
        <i
          id="icons"
          className=" big plus square outline icon"
          onClick={props.toggleModal}
        ></i>
      }
    >
      <Modal.Header>Add New Photo</Modal.Header>
      <Modal.Content>
        <Form>
          <Form.Group widths="equal">
            <Form.Field>
              <label htmlFor="title">Title</label>
              <input
                type="text"
                id="title"
                placeholder="Title..."
                onChange={handleFieldChange}
              />
            </Form.Field>
          </Form.Group>
          <Form.Field
            id="description"
            control={TextArea}
            label="Description"
            placeholder="Description..."
            onChange={handleFieldChange}
          />
          <Form.Field>
            <label htmlFor="eventImage">Please upload or find an image</label>
            <input
              name="file"
              id="eventImage"
              type="file"
              className="file-upload"
              data-cloudinary-field="image_id"
              onChange={uploadImage}
              data-form-data="{ 'transformation': {'crop':'limit','tags':'samples','width':3000,'height':2000}}"
            />
          </Form.Field>
          <div className="newPhoto">
            {isLoading ? (
              <h3> Loading...</h3>
            ) : image.url === "" ? (
              <img
                src="https://seeba.se/wp-content/themes/consultix/images/no-image-found-360x260.png"
                style={{ width: "300px" }}
                alt="none-found"
              />
            ) : (
              <img
                src={image.url}
                style={{ width: "300px" }}
                alt="upload-photos"
              />
            )}
          </div>
        </Form>
        <div className="login-form=buttons">
          <Button onClick={postNewPhoto}>Submit</Button>
          <Button onClick={props.toggleModal}>Cancel</Button>
        </div>
      </Modal.Content>
    </Modal>
  );
};
export default NewPhotoModal;

// id='title'
// control={Input}
// label='Title'
// placeholder='Title...'
// onChange={handleFieldChange}
