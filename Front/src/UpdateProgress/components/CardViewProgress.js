import React from "react";
import { Card } from "react-bootstrap";

export default function CardViewProgress({ aprogress }) {
  function handleCheckImage() {
    if (aprogress.upimage) {
      return (
        <Card.Img
          className="CardView__progress-image"
          variant=""
          src={aprogress.upimage}
        />
      );
    }
  }

  return (
    <div>
      <Card className="CardView__progress-container">
        {handleCheckImage()}
        <Card.Body className="CardView__progress-body">
          <Card.Title className="text-center CardView__progress-title">
            {aprogress.uptitle}
          </Card.Title>
          <br />
          <br />
          <Card.Text className="CardView__progress-description">
            {aprogress.updesc}
          </Card.Text>
        </Card.Body>
      </Card>
    </div>
  );
}
