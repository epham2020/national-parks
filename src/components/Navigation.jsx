import React from "react";
import { Link, withRouter } from "react-router-dom";

function Navigation(props) {
  return (
    <div className="navigation">
      <nav class="navbar navbar-expand navbar-dark bg-warning">
        <div class="container">
          <Link class="navbar-brand" to="/national-parks">
            National Park Service
          </Link>

          <div>
            <ul class="navbar-nav ml-auto">
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
              <li
                class={`nav-item  ${
                  props.location.pathname === "/national-parks/parks" ? "active" : ""
                }`}
              >
                <Link class="nav-link" to="/national-parks/parks">
                  Parks
                </Link>
              </li>
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