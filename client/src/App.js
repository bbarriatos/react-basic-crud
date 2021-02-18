import './App.css';
import React, { useEffect } from 'react';
import { Switch, Route } from 'react-router-dom';
import { Wrapper } from './elements/texts';
import PrivateRoute from './components/routes/privateRoute';
import LogIn from './components/login';
import SignUp from './components/signup';

import AddTask from './components/tasks/addTask';
import Dashboard from './components/tasks/dashboard';
import UpdateTask from './components/tasks/updateTask';
import Header from './components/header';

// Authentication
import setAuthToken from './utils/setAuthToken';
import { loadUser } from './actions/auth';

// Redux
import { Provider } from 'react-redux';
import store from './store';

if (localStorage.token) {
  setAuthToken(localStorage.token);
}

const App = () => {
  useEffect(() => {
    store.dispatch(loadUser());
  }, []);

  return (
    <Provider store={store}>
      <Header></Header>
      <Wrapper>
        <Switch>
          <PrivateRoute
            exact
            path="/addTask"
            component={AddTask}
          ></PrivateRoute>
          <PrivateRoute
            exact
            path="/updateTask/:id"
            component={UpdateTask}
          ></PrivateRoute>
          <PrivateRoute exact path="/home" component={Dashboard}></PrivateRoute>
          <Route exact path="/signup" component={SignUp}></Route>
          <Route exact path="/" component={LogIn}></Route>
        </Switch>
      </Wrapper>
    </Provider>
  );
};

export default App;
