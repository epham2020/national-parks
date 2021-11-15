import React from "react";
import { Link, withRouter } from "react-router-dom";

function Navigation(props) {
  return (
    <div className="navigation">
      {/* navigation bar is green */}
      <nav class="navbar navbar-expand navbar-dark" style={{"background-color": "#228b22"}}>
        <div class="container">
          {/* NPS logo and name that returns to home page when clicked */}
          <Link class="navbar-brand" to="/national-parks">
            <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/1/1d/US-NationalParkService-Logo.svg/1200px-US-NationalParkService-Logo.svg.png" width="40" height="auto" alt=""></img>
            &nbsp;&nbsp;&nbsp;National Park Service
          </Link>
          <div>
            <ul class="navbar-nav ml-auto">
              {/* creates Home text on navigation that directs to Home when clicked */}
              <li
                class={`nav-item  ${
                  props.location.pathname === "/national-parks" ? "active" : ""
                }`}
              >
                <Link class="nav-link" to="/national-parks">
                  Home
                  <span class="sr-only">(current)</span>
                </Link>
              </li>
              {/* creates Parks text on navigation that directs to Parks when clicked */}
              <li
                class={`nav-item  ${
                  props.location.pathname === "/national-parks/parks" ? "active" : ""
                }`}
              >
                <Link class="nav-link" to="/national-parks/parks">
                  Parks
                </Link>
              </li>
              {/* creates Activities text on navigation that directs to Activities when clicked */}
              <li
                class={`nav-item  ${
                  props.location.pathname === "/national-parks/activities" ? "active" : ""
                }`}
              >
                <Link class="nav-link" to="/national-parks/activities">
                  Activities
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
}

export default withRouter(Navigation);