import React, { Component } from "react";
import api from "../services/api";
import "./Feed.css";
import io from "socket.io-client";

import more from "../assets/more.svg";
import like from "../assets/like.svg";
import comment from "../assets/comment.svg";
import send from "../assets/send.svg";

class Feed extends Component {
  // When we need to store data in our components, we use the state variable
  // to create our variables that'll be necessary - like feed var
  state = {
    feed: []
  };
  // Every class has some components, including the used below
  async componentDidMount() {
    this.registerToSocket();

    const response = await api.get("posts"); // The baseURL is used plus posts

    this.setState({
      feed: response.data.posts
    });
  }

  registerToSocket = () => {
    const socket = io("http://localhost:3333"); // Connect to the backend API

    // Expect for the label defined at the backend when a post is created
    socket.on("New post created", newPost => {
      this.setState({ feed: [newPost, ...this.state.feed] });
    });

    // Expect for the label defined at the backend when a like is created
    socket.on("New like created", newLike => {
      this.setState({
        feed: this.state.feed.map(post =>
          post._id === newLike._id ? newLike : post
        )
      });
    });
  };

  handleLike = id => {
    api.post(`/posts/${id}/like`);
  };

  render() {
    return (
      <section id="post-list">
        {this.state.feed.map(post => (
          <article key={post._id}>
            <header>
              <div className="user-info">
                <span>{post.author}</span>
                <span className="place">{post.place}</span>
              </div>
              <img src={more} alt="Mais" />
            </header>

            <img src={`http://localhost:3333/files/${post.image}`} altr="" />

            <footer>
              <div className="actions">
                <button type="button" onClick={() => this.handleLike(post._id)}>
                  <img src={like} alt="" />
                </button>
                <img src={comment} alt="" />
                <img src={send} alt="" />
              </div>

              <strong>{post.likes} curtidas</strong>

              <p>
                {post.description}
                <span>{post.hashtags}</span>
              </p>
            </footer>
          </article>
        ))}
      </section>
    );
  }
}

export default Feed;
