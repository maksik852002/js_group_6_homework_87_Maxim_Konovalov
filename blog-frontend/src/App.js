import React from "react";
import { Route, Switch } from "react-router-dom";
import Layout from "./components/Layout/Layout";
import Blog from "./containers/Blog/Blog";
import AddPost from "./containers/AddPost/AddPost";
import PostPage from "./containers/PostPage/PostPage";
import RegisterLoginForm from "./containers/RegisterLoginForm/RegisterLoginForm";

const App = () => (
  <Layout>
    <Switch>
      <Route path="/" exact component={Blog} />
      <Route path="/login" component={ RegisterLoginForm } />
      <Route path="/register" component={RegisterLoginForm} />
      <Route path="/posts/:id" component={PostPage} />
      <Route path="/posts" component={Blog} />
      <Route path="/post-add" component={AddPost} />
      <Route render={() => <h1>Not found</h1>} />
    </Switch>
  </Layout>
);

export default App;
