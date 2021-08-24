import React, { Component, Fragment } from 'react';
import NewPostForm from './NewPostForm';
import Posts from './posts';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

class Dashboard extends Component {

    static propTypes = {
        isAuthenticated: PropTypes.bool
    };

    render() {
//        if(!this.props.isAuthenticated){
//            return <Redirect to="/login" />;
//        }
        return (
            <Fragment>
                <NewPostForm />
                <hr />
                <Posts />
            </Fragment>
        )
    }
}

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated
});
export default connect(mapStateToProps)(Dashboard);