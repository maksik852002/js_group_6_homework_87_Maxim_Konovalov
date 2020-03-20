import React, { Component } from "react";

class PostForm extends Component {
  state = {
    title: "",
    description: "",
    image: ""
  };

  submitFormHandler = event => {
    event.preventDefault();
    const formData = new FormData();
    Object.keys(this.state).forEach(key => {
      formData.append(key, this.state[key]);
    });
    this.props.onSubmit(formData);
  };

  inputChangeHandler = event => {
    this.setState({
      [event.target.name]: event.target.value
    });
  };

  fileChangeHandler = event => {
    this.setState({ [event.target.name]: event.target.files[0] });
  };

  render() {
    return (
      <form onSubmit={this.submitFormHandler}>
        <div className="custom-file mb-3">
          <input
            name="image"
            type="file"
            className="custom-file-input"
            id="image"
            onChange={this.fileChangeHandler}
          />
          <label className="custom-file-label" htmlFor="image">
            {this.state.image ? this.state.image.name : "Choose file"}
          </label>
        </div>
        <div className="form-group">
          <label htmlFor="title">Title</label>
          <input
            name="title"
            type="text"
            className="form-control"
            id="title"
            placeholder="Enter title"
            value={this.state.title}
            onChange={this.inputChangeHandler}
          />
        </div>
        <div className="form-group">
          <label htmlFor="description">Description</label>
          <textarea
            name="description"
            type="textarea"
            style={{ resize: "none" }}
            className="form-control"
            rows="15"
            id="description"
            placeholder="Enter description"
            value={this.state.description}
            onChange={this.inputChangeHandler}
          />
        </div>
        <button type="submit" className="btn btn-secondary">
          Submit
        </button>
      </form>
    );
  }
}

export default PostForm;
