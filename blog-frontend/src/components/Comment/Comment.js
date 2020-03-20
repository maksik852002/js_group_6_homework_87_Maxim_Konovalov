import React from "react";
import moment from "moment";

const Comment = ({ text, user, datetime }) => {
  let date = datetime;
  date = moment(date).calendar();

  return (
    <div className="py-2 w-75 m-auto">
      <div
        className="toast"
        style={{
          opacity: "1",
          border: "1px solid #e5e5ea",
          maxWidth: "100%",
          boxShadow: "0 0.25rem 0.75rem rgba(229,229,234,.6)"
        }}
      >
        <div className="toast-header">
          <strong className="mr-auto">{user} </strong>
          <small>{date.toLocaleString()}</small>
        </div>
        <div className="toast-body">
          <span className="w-100">{text}</span>
        </div>
      </div>
    </div>
  );
};

export default Comment;
