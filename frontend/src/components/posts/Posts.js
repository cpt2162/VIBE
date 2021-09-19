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
        likePost: PropTypes.func.isRequired,
        auth: PropTypes.object.isRequired
    }

    componentDidMount() {
        this.props.getPosts();
    }

    reRender = () => {
        this.forceUpdate();
    };

    onLike = ( post ) => {
      const { user } = this.props.auth;
      const { id } = this.props.auth.user;
      const postUpdate = { queues: (post.queues + 1), liked_users: user.id};
      let likeData = new FormData();
      likeData.append("user", id);
      likeData.append("song", post.id);
      this.props.likePost(likeData, post.id, postUpdate);
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
              <div className={styles.publishinfo}> Posted by {post.owner.username} on {post.date_created} </div>
              <button className="btn btn-danger" onClick={this.props.deletePost.bind(this, post.id)}> Delete </button>
              <button className={styles.like} onClick={this.onLike.bind(this, post)}> Queue </button>
              <div className={styles.queues}> Queues: {post.queues} </div>
            </div>
            <br />
          </Fragment>
          ))}
        </ul>
        </Fragment>
      );
    }
}
const mapStateToProps = (state) => {
    return {
        posts: state.posts.posts,
        auth: state.auth
    }
}

export default connect(mapStateToProps, { getPosts, deletePost, likePost })(Posts);

//ReactDOM.render(
//  <App />,
//  document.getElementById('app')
//);
//const container = document.getElementById("app");
//render(<App />, container);