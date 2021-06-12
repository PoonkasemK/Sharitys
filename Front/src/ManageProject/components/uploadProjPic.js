//Upload pic for Project Progress (to ProjectProgress Folder in Firebase)
import React, { useState, Component } from "react";
import { storage } from "../../UpdateProgress/components/firebase";
import Modal from "react-bootstrap/Modal";
import Spinner from "react-bootstrap/Spinner";

class UploadModal extends Component {
  render() {
    return (
      <Modal
        {...this.props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            <div>
              <p>อัปโหลดรูปสำหรับโครงการ</p>
            </div>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div class="input-group mb-3">
            <div class="input-group-prepend">
              <span class="input-group-text" id="inputGroupFileAddon01">
                อัปโหลด
              </span>
            </div>
            <div class="custom-file">
              <input
                type="file"
                class="custom-file-input"
                id="inputGroupFile01"
                aria-describedby="inputGroupFileAddon01"
                onChange={(e) => this.props.handleImageAsFile(e)}
              />
              <label class="custom-file-label" for="inputGroupFile01">
                {this.props.imageAsFileName}
              </label>
            </div>
            {/* <button type="button" class="btn btn-outline-dark" onClick={() => this.props.handleSubmit()}>Upload Image</button> */}
          </div>
        </Modal.Body>
        <Modal.Footer>
          <button
            type="button"
            class="btn btn-outline-dark"
            onClick={this.props.onHide}
          >
            ยกเลิก
          </button>
          <button
            type="button"
            class="btn btn-success"
            onClick={() => {
              this.props.setloading(true);
              this.props.handleFireBaseUpload();
              this.props.onHide();
            }}
          >
            อัปโหลด
          </button>
        </Modal.Footer>
      </Modal>
    );
  }
}

function App() {
  const allInputs = { imgUrl: "" };
  const [imageAsFile, setImageAsFile] = useState("");
  const [imagePreview, setImagePreview] = useState("");
  const [imageAsUrl, setImageAsUrl] = useState(allInputs);
  const [modalShow, setModalShow] = useState(false);
  const [loading, setloading] = useState(false);

  const handleSubmit = () => {
    // TODO: do something with -> this.state.file
    console.log("handle uploading-", imageAsFile);
    console.log("url: " + imageAsUrl);
    setImagePreview(imageAsUrl);
    // setImagePreview(<img src={imageAsUrl} alt="uploaded image"/>)
  };

  const handleImageAsFile = (e) => {
    const image = e.target.files[0];
    setImageAsFile(image);
  };

  const handleFireBaseUpload = () => {
    console.log("start of upload");
    // async magic goes here...
    if (imageAsFile === "") {
      console.error(`not an image, the image file is a ${typeof imageAsFile}`);
    }
    // const uploadTask = storage.ref(`/images/${imageAsFile.name}`).put(imageAsFile)

    const uploadTask = storage
      .ref(`/images/ProjectPic/${imageAsFile.name}`)
      .put(imageAsFile);

    //initiates the firebase side uploading
    uploadTask.on(
      "state_changed",
      (snapShot) => {
        //takes a snap shot of the process as it is happening
        console.log(snapShot);
      },
      (err) => {
        //catches the errors
        console.log(err);
      },
      () => {
        // gets the functions from storage refences the image storage in firebase by the children
        // gets the download url then sets the image from firebase as the value for the imgUrl key:
        //storage.ref('images').child(imageAsFile.name).getDownloadURL()
        storage
          .ref("images/ProjectPic")
          .child(imageAsFile.name)
          .getDownloadURL()

          .then((fireBaseUrl) => {
            setImageAsUrl((prevObject) => ({
              ...prevObject,
              imgUrl: fireBaseUrl,
            }));
            setImagePreview(fireBaseUrl);
            setloading(false);
          });
      }
    );
  };
  // console.log(imageAsFile);
  sessionStorage.setItem("pjImage", imageAsUrl.imgUrl);
  // console.log(imageAsUrl);

  return (
    <div class="row">
      {loading === true && (
        <Spinner animation="border" role="loading status" variant="warning" />
      )}
      {loading === false && imagePreview && (
        <img class="m-3" src={imagePreview} alt="" width="500" heigh="500" />
      )}
      <button
        type="button"
        class="btn btn-outline-dark btn-block ml-3 mr-3 mb-2"
        onClick={() => setModalShow(true)}
      >
        อัปโหลดรูปหน้าปกโครงการ
      </button>

      {modalShow && (
        <UploadModal
          // setImagePreview={setImagePreview}
          // imagePreview={imagePreview}
          setloading={setloading}
          imageAsFileName={imageAsFile.name}
          handleImageAsFile={handleImageAsFile}
          handleFireBaseUpload={handleFireBaseUpload}
          handleSubmit={handleSubmit}
          show={modalShow}
          onHide={() => setModalShow(false)}
        />
      )}
    </div>
  );
}

export default App;
