const express = require("express");
const pool = require("./db");
const morgan = require("morgan");
const router = express.Router();

//middleware
router.use(morgan("tiny"));
// app.use(cors());
router.use(express.json());

//ROUTES

//create a project
router.post("/createpj", async (req, res) => {
  try {
    const { pjName } = req.body;
    const { pjGoal } = req.body;
    const { pjDesc } = req.body;
    const { pjBenefit } = req.body;
    const { pjBankType } = req.body;
    const { pjBankNo } = req.body;
    const { pjBankName } = req.body;
    const { pjEndDate } = req.body;
    const { pjfb } = req.body;
    const { pjTwt } = req.body;
    const { pjIG } = req.body;
    const { pjOwnerType } = req.body;
    const { pjOwnerName } = req.body;
    const { pjOwnerEmail } = req.body;
    const {
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
    } = req.body;

    const newProject = await pool.query(
      "INSERT INTO project (pjcurrentamount,pjstartdate,pjurgent,pjStatus,pjName,pjGoal,pjDesc,pjBenefit,pjBankType,pjBankNo,pjEndDate,pjFb,pjTwt,pjIG,pjOwnerType,pjOwnerName,pjOwnerEmail,pjBankName,fdfirebaseid,pjimage,pjsouvenir1,pjsouvenir2,pjsouvenir3,pjsprice1,pjsprice2,pjsprice3,pjamount,pjtype) VALUES(0,current_date,'n','pendingforap',$1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14,$15,$16,$17,$18,$19,$20,$21,$22,$23,$24) RETURNING *",
      [
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
      ]
    );
    console.log(newProject.rows[0]);
    res.json(newProject.rows[0]);
  } catch (err) {
    console.error(err.message);
  }
});

//Update Progress //Success
router.post("/inputprog/:pjid", async (req, res) => {
  try {
    const { uptitle } = req.body;
    const { updesc } = req.body;
    const { upimage } = req.body;
    const { pjid } = req.params;
    const newProject = await pool.query(
      "INSERT INTO projectupdate (uptitle,updesc,upimage,pjid) VALUES ($1,$2,$3,$4)",
      [uptitle, updesc, upimage, pjid]
    );
    res.json(newProject.rows);
  } catch (err) {
    console.error(err.message);
  }
});

//get all projects

//Success
router.get("/showallpj", async (req, res) => {
  try {
    const allProjects = await pool.query(
      "SELECT * FROM project ORDER BY pjstatus DESC, pjid ASC"
    );

    res.json(allProjects.rows);
  } catch (err) {
    console.error(err.message);
  }
});

router.get("/showallpjonpage", async (req, res) => {
  try {
    const allProjects = await pool.query(
      "SELECT * FROM project where pjstatus != 'pendingforap' ORDER BY pjstatus ASC, pjid ASC"
    );

    res.json(allProjects.rows);
  } catch (err) {
    console.error(err.message);
  }
});

router.get("/showallpjforfd/:fdfirebaseid", async (req, res) => {
  try {
    const { fdfirebaseid } = req.params;
    const allProjects = await pool.query(
      "SELECT * FROM project WHERE fdfirebaseid = $1 ORDER BY pjstatus desc",
      [fdfirebaseid]
    );
    res.json(allProjects.rows);
  } catch (err) {
    console.error(err.message);
  }
});

router.get("/showallexppj", async (req, res) => {
  try {
    const allProjects = await pool.query(
      "SELECT * FROM project where pjEndDate <= CURRENT_DATE AND pjstatus='fundraising' ORDER BY pjenddate ASC"
    );
    res.json(allProjects.rows);
  } catch (err) {
    console.error(err.message);
  }
});

router.get("/seturgentpj", async (req, res) => {
  try {
    const allProjects = await pool.query(
      "SELECT * FROM project where pjEndDate > CURRENT_DATE+14 AND pjurgent = 'n' AND pjstatus='fundraising' ORDER BY pjEndDate DESC"
    );
    res.json(allProjects.rows);
    console.log(allProjects);
  } catch (err) {
    console.error(err.message);
  }
});

router.get("/allurgentpj", async (req, res) => {
  try {
    const allProjects = await pool.query(
      "SELECT * FROM project where pjEndDate >= CURRENT_DATE AND pjEndDate <= CURRENT_DATE +14 AND pjstatus='fundraising' UNION SELECT * FROM project where pjurgent = 'y' AND pjstatus='fundraising' ORDER BY pjEndDate DESC"
    );
    res.json(allProjects.rows);
    console.log(allProjects);
  } catch (err) {
    console.error(err.message);
  }
});

router.get("/showallreqterpj", async (req, res) => {
  try {
    const allProjects = await pool.query(
      "SELECT * FROM project where pjstatus='pendingforter' ORDER BY pjEndDate DESC"
    );
    res.json(allProjects.rows);
  } catch (err) {
    console.error(err.message);
  }
});
//get a project

//Success
router.get("/project/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const project = await pool.query("SELECT * FROM project WHERE pjid = $1", [
      id,
    ]);

    res.json(project.rows[0]);
    console.log(project);
  } catch (err) {
    console.error(err.message);
  }
});

//Success
router.get("/projects/type/:pjtype", async (req, res) => {
  try {
    const { pjtype } = req.params;
    const projects = await pool.query(
      "SELECT * FROM project WHERE pjtype = $1 AND pjstatus != 'pendingforap' ORDER BY pjstatus ASC, pjid ASC",
      [pjtype]
    );
    res.json(projects.rows);
    console.log(req.params);
  } catch (err) {
    console.error(err.message);
  }
});

//Success
router.get("/progress/:pjid", async (req, res) => {
  try {
    const { pjid } = req.params;
    const progress = await pool.query(
      "SELECT * FROM projectupdate WHERE pjid = $1 ORDER BY upid DESC",
      [pjid]
    );

    res.json(progress.rows);
  } catch (err) {
    console.error(err.message);
  }
});

// put pjcurrentamount
router.put("/pjcurrentamount/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { pjcurrentamount } = req.body;

    console.log(req.params.id);
    console.log(req.body);

    const updateProject = await pool.query(
      "UPDATE project SET pjcurrentamount = $1 WHERE pjid = $2",
      [pjcurrentamount, id]
    );

    res.json("Project information was updated!");

    res.status(200).json({
      status: "success",
    });
  } catch (err) {
    console.error(err.message);
  }
});

//update a project

router.put("/project/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const {
      pjname,
      pjgoal,
      pjdesc,
      pjbenefit,
      pjbanktype,
      pjbankno,
      pjenddate,
      pjfb,
      pjtwt,
      pjig,
      pjownertype,
      pjownername,
      pjowneremail,
      pjamount,
      pjtype,
      pjsouvenir1,
      pjsouvenir2,
      pjsouvenir3,
      pjsprice1,
      pjsprice2,
      pjsprice3,
      pjimage,
    } = req.body;

    console.log(req.params.id);
    console.log(req.body);

    const updateProject = await pool.query(
      "UPDATE project SET pjname = $1,pjgoal= $2,pjdesc= $3,pjbenefit= $4,pjbanktype= $5,pjbankno= $6,pjenddate= $7,pjfb= $8,pjtwt= $9,pjig= $10,pjownertype= $11, pjownername= $12, pjowneremail =$13,pjamount=$15,pjtype=$16,pjsouvenir1=$17,pjsouvenir2=$18,pjsouvenir3=$19,pjsprice1=$20,pjsprice2=$21,pjsprice3=$22,pjimage=$23 WHERE pjid = $14",
      [
        pjname,
        pjgoal,
        pjdesc,
        pjbenefit,
        pjbanktype,
        pjbankno,
        pjenddate,
        pjfb,
        pjtwt,
        pjig,
        pjownertype,
        pjownername,
        pjowneremail,
        id,
        pjamount,
        pjtype,
        pjsouvenir1,
        pjsouvenir2,
        pjsouvenir3,
        pjsprice1,
        pjsprice2,
        pjsprice3,
        pjimage,
      ]
    );

    res.json("Project information was updated!");

    res.status(200).json({
      status: "success",
    });
  } catch (err) {
    console.error(err.message);
  }
});

//delete a project - for admin (delete project pending that's not approved for created)

//Success
router.delete("/deletepj/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const deleteProject = await pool.query(
      "DELETE FROM project WHERE pjid = $1",
      [id]
    );
    res.json("Project was deleted!");
  } catch (err) {
    console.log(err.message);
  }
});

//Success
router.put("/approvepj/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const confirmProject = await pool.query(
      "UPDATE project SET pjStatus = 'fundraising' WHERE pjid = $1",
      [id]
    );
    res.json("Project approval was confirm!");
  } catch (err) {
    console.log(err.message);
  }
});

//Success
router.put("/terminatepjadmin/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const confirmProject = await pool.query(
      "UPDATE project SET pjStatus = 'terminated' WHERE pjid = $1 ",
      [id]
    );
    res.json("Project was terminated");
  } catch (err) {
    console.log(err.message);
  }
});

//Success
router.put("/terminatepjfd/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const confirmProject = await pool.query(
      "UPDATE project SET pjStatus = 'pendingforter' WHERE pjid = $1",
      [id]
    );
    res.json("Project was terminated");
  } catch (err) {
    console.log(err.message);
  }
});

router.put("/seturgentpj/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const confirmProject = await pool.query(
      "UPDATE project SET pjUrgent = 'y' WHERE pjid = $1",
      [id]
    );
    res.json("Project was terminated");
  } catch (err) {
    console.log(err.message);
  }
});

router.post("/terminateallpj", async (req, res) => {
  try {
    const { id } = req.params;
    const confirmProject = await pool.query(
      "INSERT INTO adminterminatecheck (tchecktime) VALUES (CURRENT_TIMESTAMP)"
    );
    res.json("All expired project was terminated");
  } catch (err) {
    console.log(err.message);
  }
});

router.put("/confirmpendingforter/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const confirmTerminate = await pool.query(
      "UPDATE project SET pjStatus = 'terminated' WHERE pjid = $1",
      [id]
    );
    res.json("Project was terminated");
  } catch (err) {
    console.log(err.message);
  }
});

router.get("/allpendingforap", async (req, res) => {
  try {
    const allProjects = await pool.query(
      "SELECT * FROM project where pjstatus='pendingforap'"
    );
    res.json(allProjects.rows);
    console.log(allProjects);
  } catch (err) {
    console.error(err.message);
  }
});

router.get("/getpjid/:pjname", async (req, res) => {
  try {
    const { pjname } = req.params;
    const getpjid = await pool.query(
      "SELECT pjid FROM project WHERE pjname = $1 ORDER BY pjid DESC",
      [pjname]
    );

    res.json(getpjid.rows[0]);
    console.log(getpjid);
  } catch (err) {
    console.error(err.message);
  }
});

//recpid setting for omise //Success
// app.put("/recpid/:pjid", async (req, res) => {
//   try {
//     const { pjid } = req.params;
//     const { recpid } = req.body;
//     const recpidsetting = await pool.query(
//       "UPDATE project SET recpid = $2 WHERE pjid = $1",
//       [pjid, recpid]
//     );
//     console.log(recpidsetting.rows[0]);
//     res.json("Updated recpid!");
//   } catch (err) {
//     console.log(err.message);
//   }
// });

router.put("/recpid", async (req, res) => {
  try {
    const { pjid } = req.query;
    const { recpid } = req.body;
    console.log("PJ ID =" + pjid);
    const recpidsetting = await pool.query(
      "UPDATE project SET recpid = $2 WHERE pjid = $1",
      [pjid, recpid]
    );
    console.log(recpidsetting.rows[0]);
    res.json("Updated recpid!");
  } catch (err) {
    console.log(err.message);
  }
});

router.get("/search", async (req, res) => {
  try {
    const { pjname } = req.query;

    const users = await pool.query(
      "SELECT * FROM project WHERE LOWER(pjname) LIKE LOWER($1) or LOWER(pjgoal) LIKE LOWER($1) or LOWER(pjdesc) LIKE LOWER($1) or LOWER(pjbenefit) LIKE LOWER($1) or LOWER(pjownername) LIKE LOWER($1)",
      [`%${pjname}%`]
    );

    res.json(users.rows);
  } catch (err) {
    console.error(err.message);
  }
});

module.exports = router;

// var listener = app.listen(port, () => {
//   console.log("server has started on port " + listener.address().port);
// });
