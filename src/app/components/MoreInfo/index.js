import React from "react";
import PerfectScrollbar from "react-perfect-scrollbar";
import Aux from "../../hoc/_Aux";

import { Card, Row, Col } from "react-bootstrap";
import "./moreInfostyle.css";
import "./_chat.scss"
const MoreInfo = (props) => {
  let listClass = ["header-user-list"];
  if (props.listOpen) {
    listClass = [...listClass, "open"];
  }

  return (
    <Aux>
      <div className={listClass.join(" ")}>
        <div className="h-list-body">
          <a
            href={"/"}
            className="h-close-text"
            onClick={props.closed}
          >
            <i className="fa chevron-right" />
          </a>
          <div className="main-friend-cont scroll-div">
            <div
              className="main-friend-list"
              style={{ height: "calc(100vh - 85px)" }}
            >
              <PerfectScrollbar>
                {/* <Friends listOpen={props.listOpen} /> */}
                <Card>
                  <Card.Body>
                    <Row>
                      
                    </Row>
                  </Card.Body>
                </Card>
              </PerfectScrollbar>
            </div>
          </div>
        </div>
      </div>
    </Aux>
  );
};

export default MoreInfo;
