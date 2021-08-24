import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { addPost } from '../../actions/posts';
import axios from 'axios';
import styles from '../../../static/css/NewPost.module.css';

axios.defaults.xsrfCookieName = 'csrftoken';
axios.defaults.xsrfHeaderName = 'X-CSRFToken';

class NewPostForm extends Component {
    state = {
       caption: "",
       title: "",
       artist: "",
       photo: "",
    };


    static propTypes = {
      addPost: PropTypes.func.isRequired
    };
//  constructor(props) {
//      super(props);
//      this.handleChange = this.handleChange.bind(this);
//      this.handleImageChange = this.handleImageChange.bind(this);
//      this.savePost = this.savePost.bind(this);
//
//      this.state = {
//       caption: "",
//       title: "",
//       artist: "",
//       photo: null
//      };
//  }

  onChange = e => this.setState({
      [e.target.id]: e.target.value });

  handleImageChange = e => this.setState({
      photo: e.target.files[0] });

  onSubmit = e => {
    e.preventDefault();
    const { title, artist, caption, photo } = this.state;
/*    const post = { title, artist, caption, photo };*/
    let formData = new FormData();
    formData.append("title", title);
    formData.append("artist", artist);
    formData.append("caption", caption);
    formData.append("photo", photo);
    this.props.addPost(formData);
    this.setState({
        title: "",
        artist: "",
        caption: "",
        photo: "",
    });
  };
//  savePost() {
//    var post = {
//        title: this.state.title,
//        artist: this.state.artist,
//        caption: this.state.caption,
//        photo: this.state.photo
//    };
//    console.log(this.state);
//    PostService.create(post)
//        .then(res => {
//          this.setState({
//            caption: res.data.caption,
//            title: res.data.title,
//            artist: res.data.artist,
//            photo: res.data.photo,
//          });
//          console.log(res.data);
//        })
//        .catch(err => {
//            console.log(err)
//        });
//  }

  render() {
    const { title, artist, caption, photo } = this.state;
    return (
      <div className={styles.form}>
        <h2 className={styles.newpost} >New Post</h2>
        <form onSubmit={this.onSubmit} encType="multipart/form-data">
          <div className={styles.inputGroup1}>
            <label className={styles.inputLabel}>Title</label>
            <input type="text"  id='title' className={styles.input} value={title} onChange={this.onChange}/>
          </div>
          <div className={styles.inputGroup2}>
            <label className={styles.inputLabel}>Artist</label>
            <input type="text" id='artist' className={styles.input} value={artist} onChange={this.onChange}/>
          </div>
          <div className={styles.inputGroup3}>
            <label className={styles.inputLabel}>Caption</label>
            <textarea id='caption' className={styles.input} value={caption} onChange={this.onChange}/>
          </div>
          <div className={styles.inputGroup4}>
            <label className={styles.inputLabel}>Cover Art</label>
            <input type="file"
                   id="photo"
                   accept="image/png, image/jpeg, image/jpg"
                   onChange={this.handleImageChange} className={styles.fileinput}/>
          </div>
          <div>
            <button type="submit" className={styles.postB} > Post </button>
          </div>
        </form>
      </div>
    );
  }
}

export default connect(null, { addPost })(NewPostForm);//import React, { Component } from "react";
//import { Button, Form, FormGroup, Input, Label } from "reactstrap";
//import axios from "axios";
//import styles from '../../static/css/NewPost.module.css';
//
//axios.defaults.xsrfCookieName = 'csrftoken';
//axios.defaults.xsrfHeaderName = 'X-CSRFToken';
//
//class NewPostForm extends React.Component {
//    state = {
//        caption: "",
//        title: "",
//        artist: "",
//        photo: "",
//    };
//
//    componentDidMount() {
//        if (this.props.post) {
//            const { pk, caption, title, artist, photo } = this.props.post;
//            this.setState({ pk, caption, title, artist, photo });
//        }
//    };
//
//    onChange = e => {
//        this.setState({ [e.target.name]: e.target.value });
//    };
//
//
//    createPost = e => {
//        e.preventDefault();
//        console.log(this.state);
//        axios.post("http://127.0.0.1:8000/posts/", this.state).then(() => {
//            this.props.resetState();
//            this.props.toggle();
//            console.log()
//        });
//
//    };
//
//    defaultIfEmpty = value => {
//        return value === "" ? "" : value;
//    };

//    render() {
//      return (
//        <Form onSubmit={this.createPost}>
//            <FormGroup>
//              <Label for="title" className={styles.inputLabel}>Title</Label>
//              <Input
//                type="text"
//                name="title"
//                onChange={this.onChange}
//                value={this.defaultIfEmpty(this.state.title)}
//                className={styles.input}
//              />
//            </FormGroup>
//            <FormGroup>
//              <Label for="artist" className={styles.inputLabel}>Artist</Label>
//              <Input
//                type="text"
//                name="artist"
//                onChange={this.onChange}
//                value={this.defaultIfEmpty(this.state.artist)}
//                className={styles.input}
//              />
//            </FormGroup>
//            <FormGroup>
//              <Label for="photo" className={styles.inputLabel}>Cover Art</Label>
//              <Input
//                type="file"
//                name="photo"
//                onChange={this.onChange}
//                value={this.defaultIfEmpty(this.state.photo)}
//              />
//            </FormGroup>
//            <FormGroup>
//              <Label for="caption" className={styles.inputLabel}>Caption</Label>
//              <Input
//                type="text"
//                name="caption"
//                onChange={this.onChange}
//                value={this.defaultIfEmpty(this.state.caption)}
//                className={styles.input}
//              />
//            </FormGroup>
//            <Button className={styles.postB} type="submit">Post</Button>
//          </Form>
//      );
//    }
//}
//
//export default NewPostForm;