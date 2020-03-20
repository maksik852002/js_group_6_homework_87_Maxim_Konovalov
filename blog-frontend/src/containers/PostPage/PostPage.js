import React, { Component } from "react";
import { connect } from "react-redux";
import moment from "moment";
import { apiURL } from "../../constants";
import { fetchPost } from "../../store/actions/postsActions";
import {
  fetchComments,
  createComment
} from "../../store/actions/commentsActions";
import CommentsForm from "../../components/CommentsForm/CommentsForm";
import Comment from "../../components/Comment/Comment";
import Spinner from "../../components/UI/Spinner/Spinner";

class PostPage extends Component {
  componentDidMount() {
    this.props.fetchPost(this.props.match.params.id);
    const query = `?post=${this.props.match.params.id}`;
    this.props.fetchComments(query);
  }

  createCommentHandler = async data => {
    const query = `?post=${this.props.match.params.id}`;
    await this.props.createComment(data, query);
  };

  render() {
    const { post, comments, user, loading } = this.props;
    const path = apiURL + "/uploads/" + post.image;
    let date = post.datetime;
    date = moment(date).calendar();
    return (
      <div className="d-flex flex-wrap mt-3">
        {loading ? (
          <Spinner />
        ) : (
          <>
            <div className="w-100">
              <div className="d-flex justify-content-between">
                <small className="text-muted">{date.toLocaleString()}</small>
                <small className="text-muted">
                  {" "}
                  Author: <b>{post.user && post.user.username}</b>
                </small>
              </div>
              <h2 className="text-center">{post.title}</h2>
              <hr />
              <div>
                <div className="clearfix">
                {post.image && (
                  <div
                      style={{
                        width: "420px",
                        float: "left",
                        marginRight: "20px",
                        padding: "10px",
                        textAlign: "center"
                      }}
                    >
                      <img
                        src={post.image && path}
                        className="card-img-top text-center"
                        alt={post.title}
                        width="100%"
                      />
                    </div>
                  )}
                  {post.description && (
                    <p className="text-justify px-3">{post.description}</p>
                  )}
                </div>
              </div>
            </div>
            <div className="mt-3 w-100">
              <hr />
              <h5>Comments: </h5>
              <div className="m-auto">
                {user && (
                  <div className="py-2">
                    <CommentsForm
                      id={this.props.match.params.id}
                      createPost={this.createCommentHandler}
                    />
                  </div>
                )}
                {comments &&
                  comments.map(el => (
                    <Comment
                      key={el._id}
                      user={el.user.username}
                      text={el.text}
                      datetime={el.datetime}
                    />
                  ))}
              </div>
            </div>
          </>
        )}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    post: state.posts.post,
    comments: state.comm.comments,
    user: state.users.user,
    loading: state.posts.loading,
    error: state.posts.error
  };
};

const mapDispatchToProps = dispatch => {
  return {
    fetchPost: id => dispatch(fetchPost(id)),
    fetchComments: query => dispatch(fetchComments(query)),
    createComment: (data, query) => dispatch(createComment(data, query))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(PostPage);
