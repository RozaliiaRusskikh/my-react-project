import React, { useState } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import Header from "./components/Header";
import Posts from "./components/Posts";
import Post from "./components/Post";
import NotFound from "./components/NotFound";
import PostForm from "./components/PostForm";
import Message from "./components/Message";

import "./App.css";

const App = (props) => {
  const [posts, setPosts] = useState([]);
  const [message, setMessage] = useState(null);

  const setFlashMessage = (message) => {
    setMessage(message);
    setTimeout(() => {
      setMessage(null);
    }, 2000);
  };

  const addNewPost = (post) => {
    post.id = posts.length + 1;
    post.slug = encodeURIComponent(
      post.title.toLowerCase().split(" ").join("-")
    );
    setPosts([...posts, post]);
    setFlashMessage("saved");
  };

  return (
    <Router>
      <div className="App">
        <Header />
        {message && <Message type={message} />}
        <Switch>
          <Route exact path="/" render={() => <Posts posts={posts} />} />
          <Route
            path="/post/:postSlug"
            render={(props) => {
              const post = posts.find(
                (post) => post.slug === props.match.params.postSlug
              );
              if (post) return <Post post={post} />;
              else return <NotFound />;
            }}
          />
          <Route
            exact
            path="/new"
            render={() => <PostForm addNewPost={addNewPost} />}
          />
          <Route
            path="/edit/:post-slug"
            render={(props) => {
              const post = posts.find(
                (post) => post.slug === props.match.params.postSlug
              );
              if (post) {
                return <PostForm post={post} />;
              } else {
                return <Redirect to="/" />;
              }
            }}
          />
          <Route component={NotFound} />
        </Switch>
      </div>
    </Router>
  );
};

export default App;
