import React from "react";
import { NavLink } from "react-router-dom";
import { apiURL, noImage } from "../../constants";
import moment from "moment";
import "./Post.css";

const Post = ({ title, image, datetime, user, id }) => {
  const path = apiURL + "/uploads/" + image;
  let date = datetime;
  date = moment(date).calendar();
  return (
    <div className="card my-3 mx-auto" style={{ maxWidth: "740px" }}>
      <div className="row no-gutters p-3">
        <div className="col-md-3">
          <img src={image ? path : noImage} className="card-img" alt={title} />
        </div>
        <div className="col-md-9">
          <div className="card-body">
            <p className="card-text">
              <small className="text-muted">
                {date} by @{user}
              </small>
            </p>
            <NavLink className="nav-link" to={`/posts/${id}`}>
              <h3 className="card-title">{title}</h3>
            </NavLink>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Post;
