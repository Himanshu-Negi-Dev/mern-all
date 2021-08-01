import React, { useEffect } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Navbar from "./components/Navbar";
import Login from "./components/Login";
import Signup from "./components/Signup";
import Todos from "./components/Todos";
import { Provider } from "react-redux";
import store from "./store";
import { load_user } from "./actions/auth";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const App = () => {
  useEffect(() => {
    store.dispatch(load_user());
  }, []);
  return (
    <>
      <Provider store={store}>
        <Router>
          <Navbar />
          <ToastContainer />
          <Switch>
            <Route exact path="/" component={Todos} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/signup" component={Signup} />
          </Switch>
        </Router>
      </Provider>
    </>
  );
};

export default App;
