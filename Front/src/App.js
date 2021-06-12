import React, { Fragment, useEffect, useState } from "react";
import "./App.css";
import { Route, BrowserRouter as Router } from "react-router-dom";
import Main from "./Main/components/Main";
import AllProject from "./AllProject/components/AllProject";
import ViewAccident from "./AllProject/components/ViewAccident";
import ViewAnimal from "./AllProject/components/ViewAnimal";
import ViewDisaster from "./AllProject/components/ViewDisaster";
import ViewEducation from "./AllProject/components/ViewEducation";
import ViewNature from "./AllProject/components/ViewNature";
import ViewOthers from "./AllProject/components/ViewOthers";
import AboutUs from "./AboutUs/components/AboutUs";
import Blog from "./Blog/components/Blog";
import SignIn from "./SignIn/components/Login";
import CreateProject from "./CreateProject/components/CreateProject";
import ManageProject from "./ManageProject/components/ManageProject";
import SignOut from "./SignOut/components/SignOut";
import ProjectInfo from "./ProjectInfo/components/ProjectInfo";
import Payment from "./Omise/components/Payment";
import TerminateExpProject from "./TerminateExpProject/components/TerminateExpProject";
import ViewUrgent from "./AllProject/components/ViewUrgent";
import SetUrgentAd from "./ManageProject/components/SetUrgentAd";
import Transfer from "./Transfer/components/transferTest";
import UpdateProgress from "./UpdateProgress/components/UpdateProgress";
import ProjectHistory from "./History/components/pjHistory";
import Profile from "./Profile/components/profile";
import DonorHistory from "./History/components/dnHistory";
import TerminateReqProject from "./TerminateReqProject/components/TerminateReqProject";
import ApproveProject from "./ManageProject/components/ApprovePendingforap";
import PaymentSuccess from "./Omise/components/Success";
import Cards from "./Profile/components/cards";
import Search from "./NavBar/components/Search";

function App() {
  const [projects, setProjects] = useState([]);

  const getProjects = async () => {
    try {
      const response = await fetch(
        process.env.REACT_APP_SERVER_URL + "/db/showallpj"
      );
      const jsonData = await response.json();

      setProjects(jsonData);
    } catch (err) {
      console.error(err.message);
    }
  };

  useEffect(() => {
    getProjects();
  }, []);

  // console.log(projects);
  // let projectCount;

  // {projects.map((project) => {import  from <ProjectInfo pjid={pjid} />})}

  return (
    <Router>
      {projects.map((project) => (
        <Fragment key={project.pjid}>
          <Route
            path={"/ProjectInfo/" + project.pjid}
            exact
            component={() => <ProjectInfo pjid={project.pjid} />}
          />
          <Route
            path={"/Payment/" + project.pjid}
            exact
            component={() => <Payment pjid={project.pjid} />}
          />
          <Route
            path={"/UpdateProgress/" + project.pjid}
            exact
            component={() => <UpdateProgress project={project} />}
          />
          <Route
            path={"/ProjectHistory/" + project.pjid}
            exact
            component={() => <ProjectHistory project={project} />}
          />
          <Route
            path={"/Transfer/" + project.pjid}
            exact
            component={() => <Transfer project={project} />}
          />
        </Fragment>
      ))}
      <Route path="/" exact component={Main} />
      <Route path="/AllProject" exact component={AllProject} />
      <Route path="/ViewAccident" exact component={ViewAccident} />
      <Route path="/ViewAnimal" exact component={ViewAnimal} />
      <Route path="/ViewDisaster" exact component={ViewDisaster} />
      <Route path="/ViewEducation" exact component={ViewEducation} />
      <Route path="/ViewNature" exact component={ViewNature} />
      <Route path="/ViewOthers" exact component={ViewOthers} />
      <Route path="/AboutUs" exact component={AboutUs} />
      <Route path="/Blog" exact component={Blog} />
      <Route path="/SignIn" exact component={SignIn} />
      <Route path="/CreateProject" exact component={CreateProject} />
      <Route path="/ManageProject" exact component={ManageProject} />
      <Route path="/SignOut" exact component={SignOut} />
      <Route path="/ViewUrgent" exact component={ViewUrgent} />
      <Route path="/SetUrgentAd" exact component={SetUrgentAd} />
      <Route path="/Profile" exact component={Profile} />
      <Route path="/DonorHistory" exact component={DonorHistory} />
      <Route path="/PaymentSuccess" exact component={PaymentSuccess} />
      <Route path="/Search" exact component={Search} />
      <Route path="/Cards" exact component={Cards} />
      <Route
        path="/TerminateReqProject"
        exact
        component={TerminateReqProject}
      />
      <Route
        path="/TerminateExpProject"
        exact
        component={TerminateExpProject}
      />
      <Route path="/ApproveProject" exact component={ApproveProject} />
    </Router>
  );
}

export default App;
