import React from "react";
import Create from "./components/create/Create";
import SinglePost from "./components/singlePost/SinglePost";
import Update from "./components/update/Update";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import PrivateRoutes from './PrivateRoutes';

import Post from "./components/post/Post";
import Login from "./components/login/Login";
function App() {
   return (
      <>
         <BrowserRouter>
            <Switch>
               <Route exact path="/" component={Post} />
               <Route exact path="/login" component={Login} />
               <PrivateRoutes exact path="/create" component={Create} />
               <Route exact path="/:id" component={SinglePost} />
               <PrivateRoutes exact path="/update/:id" component={Update} />
            </Switch>
         </BrowserRouter>
      </>
   );
}

export default App;
