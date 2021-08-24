import React, { Component, Fragment } from "react";
import App from "./NewPostForm"
import {Button, Modal, ModalHeader, ModalBody} from "reactstrap";
import styles from '../../static/css/NewPost.module.css';

class CreateModal extends Component {
    state = {
      modal: false
    };

    toggle = () => {
      this.setState(previous => ({
        modal: !previous.modal
      }));
    };

    render() {
      const create = this.props.create;

      var button = <Button onClick={this.toggle}
                           className={styles.share}
                   >Share</Button>

      return (
       <Fragment>
         {button}
         <Modal isOpen={this.state.modal} toggle={this.toggle} className={styles.form}>
           <ModalHeader toggle={this.toggle} className={styles.header} charCode="close">New Post</ModalHeader>
           <ModalBody>
             <App
                resetState={this.props.resetState}
                toggle={this.toggle}
                post={this.props.post}
             />
           </ModalBody>
         </Modal>
       </Fragment>
     );
    }
}

export default CreateModal;