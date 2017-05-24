import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { AuthRoute, Link } from '../util/route_util';

import GreetingContainer from './greeting/greeting_container';
// import SignUpFormContainer from './session_form/sign_up_form_container';
// import SignInFormContainer from './session_form/sign_in_form_container';
import HomeContainer from './home/home_container';
import PantryIndexContainer from './pantry_items/pantry_index_container';
import ModalContainer from './modal/modal_container';

const App = () => {
  console.log('in app');
  return (
    <div id="wrapper">
      <div id="header">
          <div>
          <GreetingContainer />
          </div>
      </div>
    <div id="content">

      <Switch>
        <AuthRoute exact path='/' component={ HomeContainer }/>
        <AuthRoute path='/signin' component={ ModalContainer } />
        <AuthRoute path='/signup' component={ ModalContainer } />
      </Switch>
    </div>
  </div>);
}

export default App;

// protected route pushes you to login in not logged in
// <AuthRoute path='/signin' component={ SignInFormContainer } />
// <AuthRoute path='/signup' component={ SignUpFormContainer } />
