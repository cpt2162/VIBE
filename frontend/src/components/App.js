import React, { Component, Fragment } from "react";
import { render } from "react-dom";
import ReactDOM from 'react-dom';
import { HashRouter as Router, Route, Switch, Redirect } from "react-router-dom"
import styles from '../../static/css/Index.module.css';
import Header from './layout/Header';
import Dashboard from './posts/Dashboard';
import Alerts from './layout/Alerts';
import Login from './accounts/Login';
import Register from './accounts/Register';
import PrivateRoute from "./common/PrivateRoute"
import { Provider } from 'react-redux';
import store from '../store';
import { Provider as AlertProvider } from 'react-alert';
import { loadUser } from '../actions/auth';
import AlertTemplate from 'react-alert-template-basic';


// Alert Options
const alertOptions = {
    timeout: 3000,
    position: 'top center'
};

class App extends Component {
    componentDidMount() {
        store.dispatch(loadUser());
    }

    render() {
      return (
        <Provider store={store}>
        <AlertProvider template={AlertTemplate} {...alertOptions}>
          <Router>
          <Fragment>
            <Header />
            <Alerts />
            <div>
                <Switch>
                <PrivateRoute exact path="/" component={Dashboard} />
                <Route exact path="/register" component={Register} />
                <Route exact path="/login" component={Login} />
                </Switch>
            </div>
          </Fragment>
          </Router>
        </AlertProvider>
        </Provider>
      );
//        <<Container>
//          <Row>
//            <Col>
//              <Login/>
//            </Col>
//          </Row>
//          <Row>
//            <Col>
//              <Posts
//                posts = {this.state.posts}
//                resetState = {this.resetState}
//              />
//            </Col>
//          </Row>
//          <Row>
//            <Col>
//              <CreateModal
//                resetState = {this.resetState}
//              />
//            </Col>
//          </Row>
//        </Container>

    }
}
ReactDOM.render(<App />, document.getElementById('app'));
//export default Home;

//ReactDOM.render(
//  <Home />,
//  document.getElementById('app')
//);