import React from 'react';
import { Route, Switch } from 'react-router-dom';
import GreetingContainer from './greeting/greeting_container';
import SignUpFormContainer from './session_form/sign_up_form_container';
import SignInFormContainer from './session_form/sign_in_form_container';
import HomeContainer from './home/home_container';
import { AuthRoute, Link } from '../util/route_util';

const App = () => (
  <body>
    <div id="wrapper">
      <div id="header">
        <section className="nav-bar">
          <h1 className="greeting">myPantry</h1>
          <div>
          <GreetingContainer />
          </div>
          </section>
        </div>
      <div id="content">
        <Switch>
          <AuthRoute exact path='/' component={ HomeContainer }/>
          <AuthRoute path='/signin' component={ SignInFormContainer } />
          <AuthRoute path='/signup' component={ SignUpFormContainer } />
        </Switch>
      </div>
      <div  id="footer">
        <footer className="footer">
          <div>Image courtesy of Brooke Lark</div>
          <br />
          <div>Copyright 2017 myPantry. All rights reserved.
          </div>
        </footer>
      </div>
    </div>
  </body>
);

export default App;
