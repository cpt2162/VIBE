import React, { Component, Fragment } from "react";
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getPosts, deletePost, likePost } from '../../actions/posts';
import { render } from "react-dom";
import ReactDOM from 'react-dom';
import styles from '../../../static/css/Index.module.css';


//import axios from "axios";
//class Navbar extends omponent{
//    render() {
//        return (
//            <div>;
//                <ul id="nav">
//                  <li><a href=""
//        )
//    }
//}

class Posts extends Component {
    static propTypes = {
        posts: PropTypes.array.isRequired,
        getPosts: PropTypes.func.isRequired,
        deletePost: PropTypes.func.isRequired,
        likePost: PropTypes.func.isRequired
    }

    componentDidMount() {
        this.props.getPosts();
    }

    onLike = ( post ) => {
      const { username } = this.state.user;
      let formData = new FormData();
      formData.append("user", user);
      formData.append("post", post );
      this.props.likePost(formData, post.id, username);
    };
//    constructor(props) {
//        super(props);d
//        this.state = {
//            data: [],
//            loaded: false,
//            placeholder: "Loading"
//        };
//    }



//    componentDidMount() {
//        fetch("posts")
//          .then(response => {
//            if (response.status > 400){
//              return this.setState(() => {
//                return { placeholder : "Something went wrong!" };
//              });
//            }
//            return response.json();
//          })
//          .then(data => {
//            this.setState(() => {
//              return {
//                data,
//                loaded: true
//              };
//            });
//          });
//    }

    render() {
      const posts = this.props.posts;
      return (
        <Fragment>
        <h1>Posts Here</h1>
        <ul>
          {this.props.posts.map(post => (
          <Fragment key={post.id}>
            <div className={styles.post} key={post.id}>
              <div>
                <img className={styles.photo} src={post.photo}/>
              </div>
              <div className={styles.songtitle}> Title: {post.title} </div>
              <div className={styles.songartist}> Artist: {post.artist} </div>
              <div className={styles.caption}> {post.caption} </div>
              <div className={styles.publishinfo}> Posted on: {post.date_created} </div>
              <button className="btn btn-danger" onClick={this.props.deletePost.bind(this, post.id)}> Delete </button>
              <button className={styles.like} onClick={this.props.likePost.bind(this, post.id)}> Like </button>
            </div>
            <br />
          </Fragment>
          ))}
        </ul>
        </Fragment>
      );
    }
}
const mapStateToProps = state => ({
    posts: state.posts.posts
});
export default connect(mapStateToProps, { getPosts, deletePost, likePost })(Posts);

//ReactDOM.render(
//  <App />,
//  document.getElementById('app')
//);
//const container = document.getElementById("app");
//render(<App />, container);