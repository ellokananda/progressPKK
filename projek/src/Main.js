import React,{Component} from "react";
import {Switch, Route} from "react-router-dom";

// load navbar
import Navbar from "./component/Navbar";
// load halaman
import Bimbel from "./page/Bimbel";
import Pendaftar from "./page/Pendaftar";
import Login from "./page/Login";
import Logina from "./page/Logina";
import Loginp from "./page/Loginp";

class Main extends Component {
  render = () => {
    return (
      <Switch>
        <Route path="/login" component={Login} />
        <Route path="/logina" component={Logina} />
        <Route path="/loginp" component={Loginp} />
        <Route path="/bimbel">
          <Navbar />
          <Bimbel />
        </Route>
        <Route path="/pendaftar">
          <Navbar />
          <Pendaftar />
        </Route>
      </Switch>
    );
  }
}
export default Main;
