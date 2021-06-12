import React, { Fragment, useEffect, useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import CardViewProgress from "./CardViewProgress";

const ViewProgress = ({ id }) => {
  const [progress, setProgress] = useState([]);
  console.log("check: " + id);

  // Real;
  const getAProgress = async (pjid) => {
    try {
      const response = await fetch(
        process.env.REACT_APP_SERVER_URL + `/db/progress/${id}`,
        {
          method: "GET",
        }
      );

      const jsonData = await response.json();
      setProgress(jsonData);
    } catch (err) {
      console.error(err.message);
    }
  };

  // //Test
  // const getAProgress = async () => {
  //   try {
  //     const response = await fetch(`http://localhost:5000/progress/4`, {
  //       method: "GET",
  //     });

  //     const jsonData = await response.json();
  //     setProgress(jsonData);
  //   } catch (err) {
  //     console.error(err.message);
  //   }
  // };

  useEffect(() => {
    getAProgress();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  console.log(progress);

  return (
    <Fragment>
      <br />
      <br />
      <br />
      <Container>
        {progress.map((aprogress) => (
          <Row>
            <Col md="12">
              <CardViewProgress key={aprogress.upid} aprogress={aprogress} />
              <br />
            </Col>
          </Row>
        ))}
      </Container>
      {/* <table class="table mt-5 text-center">
        <thead>
          <tr>
            <th>หัวข้อ</th>
            <th>รายละเอียด</th>
            <th>รูป</th>
          </tr>
        </thead>
        <tbody>
          {progress.map((aprogress) => (
            <tr key={aprogress.upid}>
              <td>{aprogress.uptitle}</td>
              <td>{aprogress.updesc}</td>
              <td>
                <img src={aprogress.upimage} />
              </td>
            </tr>
          ))}
        </tbody>
      </table> */}
    </Fragment>
  );
};

export default ViewProgress;
