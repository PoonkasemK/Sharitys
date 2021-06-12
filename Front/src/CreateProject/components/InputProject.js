import React, { Fragment, useState } from "react";
import axios from "axios";
import UploadProjPic from "../../ManageProject/components/uploadProjPic";

const InputProject = () => {
  const [pjName, setpjName] = useState("");
  const [pjGoal, setpjgoal] = useState("");
  const [pjDesc, setpjdesc] = useState("");
  const [pjBenefit, setpjbenefit] = useState("");
  const [pjBankType, setpjbanktype] = useState("");
  const [pjBankNo, setpjbankno] = useState("");
  const [pjEndDate, setpjenddate] = useState("");
  const [pjBankName, setpjbankname] = useState("");

  const [pjfb, setpjfb] = useState("");
  const [pjTwt, setpjtwt] = useState("");
  const [pjIG, setpjig] = useState("");
  const [pjOwnerType, setpjownertype] = useState("");
  const [pjOwnerName, setpjownername] = useState("");
  const [pjOwnerEmail, setpjowneremail] = useState("");
  const [pjtype, setpjtype] = useState("");
  let pjid2 = undefined;
  let fdfirebaseid = undefined;
  let pjimage = undefined;
  const [pjsouvenir1, setpjsouvenir1] = useState("");
  const [pjsouvenir2, setpjsouvenir2] = useState("");
  const [pjsouvenir3, setpjsouvenir3] = useState("");
  const [pjsprice1, setpjsprice1] = useState("");
  const [pjsprice2, setpjsprice2] = useState("");
  const [pjsprice3, setpjsprice3] = useState("");
  const [pjamount, setpjamount] = useState("");

  const onSubmitForm = async (e) => {
    e.preventDefault();
    try {
      let recpId = undefined;
      pjimage = sessionStorage.getItem("pjImage");
      console.log("pjImage seesion = " + sessionStorage.getItem("pjImage"));
      console.log("pjimage =" + pjimage);
      console.log("UID = " + sessionStorage.getItem("uid"));
      fdfirebaseid = sessionStorage.getItem("uid");
      console.log("fdfirebaseid=" + fdfirebaseid);

      const body = {
        pjName,
        pjGoal,
        pjDesc,
        pjBenefit,
        pjBankType,
        pjBankNo,
        pjEndDate,
        pjfb,
        pjTwt,
        pjIG,
        pjOwnerType,
        pjOwnerName,
        pjOwnerEmail,
        recpId,
        pjBankName,
        fdfirebaseid,
        pjimage,
        pjsouvenir1,
        pjsouvenir2,
        pjsouvenir3,
        pjsprice1,
        pjsprice2,
        pjsprice3,
        pjamount,
        pjtype,
      };

      const response = await fetch(
        process.env.REACT_APP_SERVER_URL + "/db/createpj",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(body),
        }
      );
      // console.log("After createpj");
      // console.log(pjName);

      console.log(response.status);
      if (response.status === 200) {
        const response = await fetch(
          process.env.REACT_APP_SERVER_URL + `/db/getpjid/${pjName}`
        );
        const jsonData = await response.json();
        pjid2 = await jsonData.pjid;
        console.log("JsonData pjid=" + jsonData.pjid);
        console.log("pjid2 = " + pjid2);
        // console.log("Here is getpjid");
        // console.log(pjid);
        if (pjid2) {
          const res = await axios.post(
            process.env.REACT_APP_SERVER_URL + "/omise/createRecpid",
            {
              name: body.pjOwnerName,
              bank_account: {
                bank_code: body.pjBankType,
                number: body.pjBankNo,
                name: body.pjBankName,
              },
              pjid: jsonData.pjid,
              uid: sessionStorage.getItem("uid"),
              //uid: "demouid",
            }
          );
          console.log(res.data);
          if (res.data) {
            console.log(res.data);
            body.recpId = await res.data.id;

            console.log("In here");
            console.log(body.recpId);
          }
        }
      }

      console.log("Before Sending to Recpidfn" + pjid2);
      const recpfn = await axios.put(
        process.env.REACT_APP_SERVER_URL + `/db/recpid?pjid=` + pjid2,
        {
          // method: "PUT",
          // headers: { "Content-Type": "application/json" },
          recpid: body.recpId,
        }
      );
      console.log(recpfn.data);
      console.log("Out here");

      alert("สร้างโครงการสำเร็จ");

      window.location = "/";
    } catch (err) {
      console.error(err.message);
    }
  };

  return (
    <Fragment>
      <form onSubmit={onSubmitForm}>
        <h2>ข้อมูลโครงการ </h2>

        <label for="pjName">ชื่อโครงการ*: </label>
        <input
          required
          type="text"
          className="form-control"
          value={pjName}
          onChange={(e) => setpjName(e.target.value)}
        />

        <label>รูปหน้าปกโครงการ*: </label>
        <UploadProjPic />

        <h5>
          {" "}
          คำบรรยายรายละเอียด <br />{" "}
        </h5>

        <label for="pjgoal">จุดประสงค์*: </label>
        <textarea
          required
          className="form-control"
          value={pjGoal}
          onChange={(e) => setpjgoal(e.target.value)}
        />

        <label for="pjdesc">แผนโครงการ*: </label>
        <textarea
          required
          className="form-control"
          value={pjDesc}
          onChange={(e) => setpjdesc(e.target.value)}
        />

        <label for="pjbenefit">
          ประโยชน์ที่จะได้รับจากการจัดตั้งโครงการนี้*:{" "}
        </label>
        <textarea
          required
          className="form-control"
          value={pjBenefit}
          onChange={(e) => setpjbenefit(e.target.value)}
        />

        <label for="pjtype">ประเภทโครงการ*: </label>
        <select
          class="btn btn-outline-dark btn-sm m-1"
          value={pjtype}
          onChange={(e) => setpjtype(e.target.value)}
          required
        >
          <option value=""> เลือกประเภทโครงการ... </option>
          <option value="animal"> สัตว์ </option>
          <option value="disaster"> ภัยพิบัติ </option>
          <option value="nature"> ธรรมชาติ </option>
          <option value="accident"> อุบัติเหตุ </option>
          <option value="education"> การศึกษา </option>
          <option value="others"> อื่น ๆ </option>
        </select>
        <br />

        <label for="pjBankType">ธนาคารของบัญชีโครงการ*: </label>
        <select
          class="btn btn-outline-dark btn-sm m-1"
          required
          value={pjBankType}
          onChange={(e) => setpjbanktype(e.target.value)}
        >
          <option value=""> เลือกธนาคาร... </option>
          <option value="baac">
            {" "}
            BAAC - ธนาคารเพื่อการเกษตรและสหกรณ์การเกษตร{" "}
          </option>
          <option value="bay"> BAY - ธนาคารกรุงศรีอยุธยา </option>
          <option value="bbl"> BBL - ธนาคารกรุงเทพ </option>
          <option value="bnp"> BNP - ธนาคารบีเอ็นพี พารีบาส์ </option>
          <option value="boa"> BOA - ธนาคารแห่งอเมริกา </option>
          <option value="cacib"> CACIB - ธนาคารเครดิต อากริโคล </option>
          <option value="cimb"> CIMB - ธนาคาร ซีไอเอ็มบี ไทย </option>
          <option value="citi"> CITI - ธนาคารซิตี้แบงก์ </option>
          <option value="db"> DB - ธนาคารดอยซ์ แบงก์ </option>
          <option value="ghb"> GHB - ธนาคารอาคารสงเคราะห์ </option>
          <option value="gsb"> GSB - ธนาคารออมสิน </option>
          <option value="hsbc">
            {" "}
            HSBC - ธนาคารฮ่องกงและเซี่ยงไฮ้แบงกิ้งคอร์ปอเรชั่น{" "}
          </option>
          <option value="ibank"> IBANK - ธนาคารอิสลามแห่งประเทศไทย </option>
          <option value="icbc"> ICBC - ธนาคารไอซีบีซี(ไทย) </option>
          <option value="jpm"> JPM - ธนาคารเจพีมอร์แกนเชส </option>
          <option value="kbank"> KBANK - ธนาคารกสิกรไทย </option>
          <option value="kk"> KK - ธนาคารเกียรตินาคินภัทร </option>
          <option value="ktb"> KTB - ธนาคารกรุงไทย </option>
          <option value="lhb"> LHB - ธนาคารแลนด์ แอนด์ เฮ้าส์ </option>
          <option value="mb"> MB - ธนาคารมิซูโฮะ </option>
          <option value="mega"> MEGA - ธนาคารเมกะ สากลพาณิชย์ </option>
          <option value="mufg"> MUFG - ธนาคารโตเกียว-มิตซูบิชิ ยูเอฟเจ </option>
          <option value="rbs"> RBS - ธนาคาร Royal Bank of Scotland </option>
          <option value="sc"> SC - ธนาคารสแตนดาร์ดชาร์เตอร์ด (ไทย) </option>
          <option value="scb"> SCB - ธนาคารไทยพาณิชย์ </option>
          <option value="smbc">
            {" "}
            SMBC - ธนาคารซูมิโตโม มิตซุย แบงกิ้งคอร์ปอเรชั่น{" "}
          </option>
          <option value="tbank"> TBANK - ธนาคารธนชาต </option>
          <option value="tcrb"> TCRB - ธนาคารไทยเครดิต </option>
          <option value="tisco"> TISCO - ธนาคารทิสโก้ </option>
          <option value="tmb"> TMB – ธนาคารทหารไทย </option>
          <option value="uob"> UOB – ธนาคารยูโอบี </option>
        </select>
        <br />

        <label for="pjbankno">เลขที่บัญชี*: </label>
        <input
          required
          type="text"
          pattern="[0-9]*"
          className="form-control"
          value={pjBankNo}
          onChange={(e) => setpjbankno(e.target.value)}
        />

        <label for="pjBankName">ชื่อบัญชี*: </label>
        <input
          required
          type="text"
          className="form-control"
          value={pjBankName}
          onChange={(e) => setpjbankname(e.target.value)}
        />

        <label for="pjenddate">วันที่สิ้นสุดโครงการ*: </label>
        <input
          required
          type="date"
          className="form-control"
          value={pjEndDate}
          onChange={(e) => setpjenddate(e.target.value)}
        />

        <label for="pjamount">จำนวนเงินทีี่คาดหวัง*: </label>
        <input
          required
          type="number"
          className="form-control"
          value={pjamount}
          onChange={(e) => setpjamount(e.target.value)}
        />

        <label for="pjsouvenir1">ของที่ระลึกระดับ 1 ที่วางแผนว่าจะให้*: </label>
        <input
          required
          type="text"
          className="form-control"
          value={pjsouvenir1}
          onChange={(e) => setpjsouvenir1(e.target.value)}
        />

        <label for="pjsprice1">เมื่อบริจาคถึง*: </label>
        <input
          required
          type="number"
          className="form-control"
          value={pjsprice1}
          onChange={(e) => setpjsprice1(e.target.value)}
        />

        <label for="pjsouvenir2">ของที่ระลึกระดับ 2 ที่วางแผนว่าจะให้*: </label>
        <input
          required
          type="text"
          className="form-control"
          value={pjsouvenir2}
          onChange={(e) => setpjsouvenir2(e.target.value)}
        />

        <label for="pjsprice2">เมื่อบริจาคถึง*: </label>
        <input
          required
          type="number"
          className="form-control"
          value={pjsprice2}
          onChange={(e) => setpjsprice2(e.target.value)}
        />

        <label for="pjsouvenir3">ของที่ระลึกระดับ 3 ที่วางแผนว่าจะให้*: </label>
        <input
          required
          type="text"
          className="form-control"
          value={pjsouvenir3}
          onChange={(e) => setpjsouvenir3(e.target.value)}
        />

        <label for="pjsprice3">เมื่อบริจาคถึง*: </label>
        <input
          required
          type="number"
          className="form-control"
          value={pjsprice3}
          onChange={(e) => setpjsprice3(e.target.value)}
        />

        <h2>
          ข้อมูลเจ้าของโครงการ <br />
        </h2>
        <label for="pjownertype"> ประเภทเจ้าของโครงการ*: </label>
        <select
          class="btn btn-outline-dark btn-sm m-1"
          required
          value={pjOwnerType}
          onChange={(e) => setpjownertype(e.target.value)}
        >
          <option value=""> เลือกประเภทเจ้าของโครงการ... </option>
          <option value="ind"> ในนามบุคคล </option>
          <option value="group"> ในนามกลุ่มบุคคล </option>
          <option value="org"> ในนามองค์กร </option>
        </select>
        <br />

        <label for="pjownername">นามเจ้าของโครงการ*: </label>
        <input
          required
          type="text"
          className="form-control"
          value={pjOwnerName}
          onChange={(e) => setpjownername(e.target.value)}
        />

        <label for="pjowneremail">อีเมลสำหรับติดต่อเกี่ยวกับโครงการ*: </label>
        <input
          required
          type="email"
          className="form-control"
          value={pjOwnerEmail}
          onChange={(e) => setpjowneremail(e.target.value)}
        />

        <h2>ข้อมูลอื่น ๆ ของโครงการ</h2>

        <label for="pjfb">Facebook ของโครงการ: </label>
        <input
          type="text"
          className="form-control"
          value={pjfb}
          onChange={(e) => setpjfb(e.target.value)}
        />

        <label for="pjtwt">Twitter ของโครงการ: </label>
        <input
          type="text"
          className="form-control"
          value={pjTwt}
          onChange={(e) => setpjtwt(e.target.value)}
        />

        <label for="pjig">Instagram ของโครงการ: </label>
        <input
          type="text"
          className="form-control"
          value={pjIG}
          onChange={(e) => setpjig(e.target.value)}
        />
        <button className="btn btn-outline-success mt-3 mb-3 btn-block">
          {" "}
          ยื่นโครงการ{" "}
        </button>
      </form>
    </Fragment>
  );
};

export default InputProject;
