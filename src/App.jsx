import React, { useEffect } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom';
import { LoginSucces } from './components/LoginSucces';
import { useSelector, useDispatch } from 'react-redux';
import { Home } from './pages/Home';
import { Login } from './pages/Login';
import { selectUserAuth } from './store/selectors';
import { userApi } from './utils/api/user';
import { userActions } from './store/actions/user';
const App = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    const fetchAuthUser = async () => {
      try {
        const { data } = await userApi.fetchAuthUser();
        dispatch(userActions.setIsAuth(true));
        dispatch(userActions.setUserData(data));
      } catch (error) {
        console.log(error);
      }
    };
    fetchAuthUser();
  }, [dispatch]);
  const isAuth = useSelector(selectUserAuth);
  console.log(isAuth);

  return (
    <div>
      <Router>
        {isAuth ? <Redirect to="/" /> : <Redirect to="/login" />}
        <Switch>
          <Route exact path="/login" component={Login}></Route>
          <Route exact path="/login/success" component={LoginSucces}></Route>
          <Route path="/" component={Home}></Route>
        </Switch>
      </Router>
    </div>
  );
};

export default App;
