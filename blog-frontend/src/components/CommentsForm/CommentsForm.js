import React, { Component } from "react";
import { MdChat } from "react-icons/md";

import "./CommentsForm.css";

class CommentsForm extends Component {
  state = {
    text: "",
    isExpand: false
  };

  submitFormHandler = event => {
    event.preventDefault();
    const data = { text: this.state.text, post: this.props.id };
    this.props.createPost(data);
    this.setState({ text: "", isExpand: false });
  };

  inputChangeHandler = event => {
    this.setState({
      [event.target.name]: event.target.value
    });
  };

  render() {
    let formGroup = "form-group d-none";
    let formDummer = "comment-dummer";
    this.state.isExpand &&
      (formGroup = "form-group mb-0") &&
      (formDummer = "d-none");
    return (
      <form className="comment-form" onSubmit={this.submitFormHandler}>
        <label
          onClick={() => this.setState({ isExpand: true })}
          className={formDummer}
          htmlFor="text"
        >
          <span style={{ margin: "8px 15px 7px 0" }}>
            {" "}
            <MdChat size="20px" color="#8d96b2" />{" "}
          </span>
          <div className="comment-wrapper">Enter your comment</div>
        </label>
        <div className={formGroup}>
          <textarea
            id="text"
            name="text"
            type="textarea"
            className="comment-input"
            rows="2"
            placeholder="Enter your comment"
            value={this.state.text}
            onChange={this.inputChangeHandler}
          />
          <div className="form-gorup-append">
            <button
              type="submit"
              disabled={this.state.text === 0 ? true : false}
              className="comment-btn"
            >
              Send
            </button>
            <button
              onClick={() => this.setState({ isExpand: false })}
              type="button"
              className="comment-btn"
            >
              Close
            </button>
          </div>
        </div>
      </form>
    );
  }
}

export default CommentsForm;
