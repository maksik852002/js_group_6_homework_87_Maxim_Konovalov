import React, { Component } from "react";
import { connect } from "react-redux";
import { fetchPosts } from "../../store/actions/postsActions";
import Spinner from "../../components/UI/Spinner/Spinner";
import Post from "../../components/Post/Post";

class Blog extends Component {
  componentDidMount() {
    this.props.fetchPosts();
  }

  render() {
    const { posts, loading } = this.props;
    return (
      <>
        {loading ? (
          <Spinner />
        ) : (
          posts &&
          posts.map(el => (
            <Post
              key={el._id}
              id={el._id}
              title={el.title}
              image={el.image}
              datetime={el.datetime}
              user={el.user.username}
            />
          ))
        )}
      </>
    );
  }
}

const mapStateToProps = state => {
  return {
    posts: state.posts.posts,
    loading: state.posts.loading,
    show: state.posts.show,
    error: state.posts.error
  };
};

const mapDispatchToProps = dispatch => {
  return {
    fetchPosts: () => dispatch(fetchPosts())
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Blog);
