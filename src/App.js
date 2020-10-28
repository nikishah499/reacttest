import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import Home from './screens/Home';
import Login from './screens/Login';
import Register from './screens/Register';
import Categories from './screens/Categories';
import Favorites from './screens/Favorites';
import Profile from './screens/Profile';
import Menubar from './screens/Menubar';

const App = props => {
  const PublicRoute = ({ component: Component, ...rest }) => (
    <Route {...rest} render={(routeProps) => (
      !props.user
        ? <Component {...routeProps} />
        : <Redirect to='/' />
    )} />
  );
  const PrivateRoute = ({ component: Component, ...rest }) => (
    <Route {...rest} render={(routeProps) => (
      props.user
        ? <Menubar><Component {...routeProps} /></Menubar>
        : <Redirect to='/login' />
    )} />
  );
  return (
    <div>
      <Switch>
        <PrivateRoute exact path='/' component={Home}/>
        <PrivateRoute exact path='/categories' component={Categories}/>
        <PrivateRoute exact path='/favorites' component={Favorites}/>
        <PrivateRoute exact path='/profile' component={Profile}/>
        <PublicRoute exact path='/login' component={Login}/>
        <PublicRoute exact path='/register' component={Register}/>
      </Switch>
    </div>
  );
};

const mapStateToProps = state => ({
  user: state.authReducer.user
});

export default connect(mapStateToProps, null)(App);
