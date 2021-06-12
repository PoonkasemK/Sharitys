import React, { Fragment, useState } from "react";

const InputProgress = ({ id }) => {
  const [uptitle, setuptitle] = useState("");
  const [updesc, setupdesc] = useState("");
  // const [upimage, setupimage] = useState("");
  // const [pjid, setpjid] = useState("");
  var upimage = undefined;

  const onSubmitForm = async (e) => {
    e.preventDefault();
    // console.log(sessionStorage.getItem("upImage").imgUrl);
    // console.log(sessionStorage.getItem("upImage"));
    // setupimage(sessionStorage.getItem("upImage"));
    upimage = sessionStorage.getItem("upImage");
    console.log(upimage);
    sessionStorage.removeItem("upImage");
    try {
      const body = { uptitle, updesc, upimage, id };
      await fetch(process.env.REACT_APP_SERVER_URL + `/db/inputprog/${id}`, {
        // const response = await fetch(`http://localhost:5000/inputprog/4`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      alert("รายงานความคืบหน้าสำเร็จ");
      window.location = "/UpdateProgress/" + id;
    } catch (err) {
      console.error(err.message);
    }
  };

  return (
    <Fragment>
      <form onSubmit={onSubmitForm}>
        <label for="uptitle">หัวข้อ: </label>
        <input
          type="text"
          className="form-control"
          value={uptitle}
          onChange={(e) => setuptitle(e.target.value)}
        />
        <br />
        <label for="updesc">คำบรรยาย: </label>
        <textarea
          rows="3"
          type="text"
          className="form-control"
          value={updesc}
          onChange={(e) => setupdesc(e.target.value)}
        />
        <br />
        <button className="btn btn-success"> ส่ง </button>
      </form>
    </Fragment>
  );
};

export default InputProgress;
