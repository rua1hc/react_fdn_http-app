import React, { Component } from "react";

import http from "./services/httpService";
import config from "./config.json";

import { ToastContainer } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";
import "./App.css";

// const apiEndpoint = "https://jsonplaceholder.typicode.com/posts";

class App extends Component {
    state = {
        posts: [],
    };

    async componentDidMount() {
        const { data: posts } = await http.get(config.apiEndpoint);
        this.setState({ posts });
    }

    handleAdd = async () => {
        const obj = { title: "a", body: "b" };
        const { data: post } = await http.post(config.apiEndpoint, obj);

        console.log(post);
        const posts = [post, ...this.state.posts];
        this.setState({ posts });
    };

    handleUpdate = async (post) => {
        post.title = "Updated put()!";
        const { data } = await http.put(
            config.apiEndpoint + "/" + post.id,
            post
        );
        console.log(data);

        // await http.patch(config.apiEndpoint + "/" + post.id, { title: post.title });

        let posts = [...this.state.posts];
        const index = posts.indexOf(post);
        posts[index] = { ...post };
        this.setState({ posts });
    };

    handleDelete = async (post) => {
        let originalPosts = this.state.posts;

        const posts = this.state.posts.filter((p) => p.id !== post.id);
        this.setState({ posts });

        try {
            await http.delete("s" + config.apiEndpoint + "/" + post.id);
        } catch (ex) {
            // EXPECTED ERROR: 400 bad request, 404 not found
            // - Display specific error message

            // UnExpected (network dowm, server down, db down, bug)
            // - display generic and friendly error message
            if (ex.response && ex.response.status === 404)
                alert("This post has already been deleted.");

            this.setState({ posts: originalPosts });
        }

        // console.log("Delete", post);
    };

    render() {
        return (
            <React.Fragment>
                <ToastContainer />
                <button className="btn btn-primary" onClick={this.handleAdd}>
                    Add
                </button>
                <table className="table">
                    <thead>
                        <tr>
                            <th>Title</th>
                            <th>Update</th>
                            <th>Delete</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.posts.map((post) => (
                            <tr key={post.id}>
                                <td>{post.title}</td>
                                <td>
                                    <button
                                        className="btn btn-info btn-sm"
                                        onClick={() => this.handleUpdate(post)}
                                    >
                                        Update
                                    </button>
                                </td>
                                <td>
                                    <button
                                        className="btn btn-danger btn-sm"
                                        onClick={() => this.handleDelete(post)}
                                    >
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </React.Fragment>
        );
    }
}

export default App;
