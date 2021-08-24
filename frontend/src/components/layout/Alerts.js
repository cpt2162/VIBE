import React, { Component, Fragment } from 'react';
import { withAlert } from 'react-alert';
import { connect } from 'react-redux';
import PropTypes from "prop-types";

export class Alerts extends Component {
  static propTypes = {
    error: PropTypes.object.isRequired,
    message: PropTypes.object.isRequired
  };
    componentDidUpdate(prevProps) {
        const { error, alert, message } = this.props;
        if(error != prevProps.error){
          if(error.msg.photo) alert.error(`Cover Art: ${error.msg.photo.join()}`);
          if(error.msg.caption) alert.error(`Caption: ${error.msg.caption.join()}`);
          if(error.msg.title) alert.error(`Title: ${error.msg.title.join()}`);
          if(error.msg.artist) alert.error(`Artist: ${error.msg.artist.join()}`);
          if(error.msg.non_field_errors) alert.error(error.msg.non_field_errors.join());
          if(error.msg.username) alert.error(error.msg.username.join());
        }
        if(message != prevProps.message) {
            if(message.deletePost) alert.success(message.deletePost);
            if(message.addPost) alert.success(message.addPost);
            if(message.passwordNotMatch) alert.error(message.passwordNotMatch);
        }
    }
    render() {
        return <Fragment />;
    }
}

const mapStateToProps = state => ({
    error: state.errors,
    message: state.messages
});

export default connect(mapStateToProps)(withAlert()(Alerts));