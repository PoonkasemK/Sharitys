import React from "react";
import { Col } from "react-bootstrap";

import {
  EmailShareButton,
  FacebookShareButton,
  FacebookMessengerShareButton,
  LineShareButton,
  TwitterShareButton,
} from "react-share";
import {
  EmailIcon,
  FacebookIcon,
  FacebookMessengerIcon,
  LineIcon,
  TwitterIcon,
  FacebookShareCount,
} from "react-share";

function SocialMediaButtons({ projUrl, projName }) {
  // console.log(projUrl + projName);
  return (
    <>
      <Col md="auto" className="ProjectInfo__sub-title">
        <h4>แชร์โครงการนี้:</h4>
      </Col>

      <Col md="auto" className=" Share__icon">
        <FacebookShareButton
          url={projUrl}
          quote={"มาช่วยกันบริจาคให้ " + projName + " ที่"}
          hashtag="#sharitys"
        >
          <FacebookIcon size={45} round={true} />
          <FacebookShareCount url={projUrl} />
        </FacebookShareButton>
        &nbsp;&nbsp;&nbsp;
        <TwitterShareButton
          url={projUrl}
          title={"มาช่วยกันบริจาคให้ " + projName + " ที่"}
          via="Sharitys6"
          hashtag="#sharitys"
        >
          <TwitterIcon size={45} round={true} />
        </TwitterShareButton>
        &nbsp;&nbsp;&nbsp;
        <EmailShareButton
          url={projUrl}
          subject={"มาช่วยกันบริจาคให้ " + projName + " ที่"}
          body="This campaign could use your help"
        >
          <EmailIcon size={45} round={true} />
        </EmailShareButton>
        &nbsp;&nbsp;&nbsp;
        <FacebookMessengerShareButton url={projUrl} appId="418508466041319">
          <FacebookMessengerIcon size={45} round={true} />
        </FacebookMessengerShareButton>
        &nbsp;&nbsp;&nbsp;
        <LineShareButton
          url={projUrl}
          title={"มาช่วยกันบริจาคให้ " + projName + " ที่"}
        >
          <LineIcon size={45} round={true} />
        </LineShareButton>
      </Col>
    </>
  );
}

export default SocialMediaButtons;
