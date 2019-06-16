import React, { Component } from "react";
import api from "../services/api";

import "./New.css";

class New extends Component {
  state = {
    image: null,
    author: "",
    place: "",
    description: "",
    hashtags: ""
  };

  handleSubmit = async event => {
    // Block the HTML default event to change the page
    // after a submit form event
    event.preventDefault();

    const data = new FormData(); // Like Multipart-form-url for send files

    data.append("image", this.state.image);
    data.append("author", this.state.author);
    data.append("place", this.state.place);
    data.append("description", this.state.description);
    data.append("hashtags", this.state.hashtags);

    await api.post("posts", data);

    // Send the user to the / url after form submit
    this.props.history.push("/");
  };

  handleImageChange = event => {
    this.setState({ image: event.target.files[0] });
  };

  handleChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  render() {
    return (
      <form id="new-post" onSubmit={this.handleSubmit}>
        <input type="file" onChange={this.handleImageChange} />

        <input
          type="text"
          name="author"
          placeholder="Autor do Post"
          onChange={this.handleChange}
          value={this.state.author}
        />
        <input
          type="text"
          name="place"
          placeholder="Local do Post"
          onChange={this.handleChange}
          value={this.state.place}
        />
        <input
          type="text"
          name="description"
          placeholder="Descrição do Post"
          onChange={this.handleChange}
          value={this.state.description}
        />
        <input
          type="text"
          name="hashtags"
          placeholder="Hashtags do Post"
          onChange={this.handleChange}
          value={this.state.hashtags}
        />
        <button type="submit">Enviar</button>
      </form>
    );
  }
}

export default New;
