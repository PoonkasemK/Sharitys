//Upload pic for Project Progress (to ProjectProgress Folder in Firebase)
import React, { useState } from "react";
import { Container } from "react-bootstrap";
import { storage } from "./firebase";

function App() {
  const allInputs = { imgUrl: "" };
  const [imageAsFile, setImageAsFile] = useState("");
  const [imageAsUrl, setImageAsUrl] = useState(allInputs);

  const handleImageAsFile = (e) => {
    const image = e.target.files[0];
    setImageAsFile((imageFile) => image);
  };

  const handleFireBaseUpload = (e) => {
    e.preventDefault();
    console.log("start of upload");
    // async magic goes here...
    if (imageAsFile === "") {
      console.error(`not an image, the image file is a ${typeof imageAsFile}`);
    }
    // const uploadTask = storage.ref(`/images/${imageAsFile.name}`).put(imageAsFile)

    const uploadTask = storage
      .ref(`/images/ProjectProgress/${imageAsFile.name}`)
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
          .ref("images/ProjectProgress")
          .child(imageAsFile.name)
          .getDownloadURL()

          .then((fireBaseUrl) => {
            setImageAsUrl((prevObject) => ({
              ...prevObject,
              imgUrl: fireBaseUrl,
            }));
          });
      }
    );
  };
  console.log(imageAsFile);
  console.log(imageAsUrl.imgUrl);
  sessionStorage.setItem("upImage", imageAsUrl.imgUrl);

  return (
    <div className="App">
      <h2 className="UpdateProgress__title">รายงานความคืบหน้า</h2>
      <br />
      <br />
      <div className="EditProject__Edit-image">
        <Container>
          <h3>เลือกรูปประกอบ</h3>
          <br />
          <form onSubmit={handleFireBaseUpload}>
            <input type="file" onChange={handleImageAsFile} required />
            <button>บันทึกรูปเข้าสู่ระบบและแสดงรูป</button>
          </form>
          <br />
          <img alt="" className="UploadProgPic__img" src={imageAsUrl.imgUrl} />
        </Container>
        <br />
      </div>
      <br />
    </div>
  );
}

export default App;
