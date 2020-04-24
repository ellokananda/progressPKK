import React, {Component} from 'react';
import {Link} from "react-router-dom";
class Navbar extends Component {
  Logout = () => {
    localStorage.removeItem("Token");
    window.location = "/login";
  }
  render() {
    return(
      <div className="navbar navbar-expand-lg bg-dark navbar-dark">
      <img src="graduation.png" align="left" width="30" height="30" />
      <a className="navbar-brand">GetCo</a>
        <button type="button" className="navbar-toggler navbar-toggler-right" data-toggle="collapse" data-target="#menu">
          <span className="navbar navbar-toggler-icon"></span>
        </button>
        <div className="navbar-collapse collapse" id="menu">
          <ul className="navbar-nav">
          <li className="navbar-item">
            <Link className="nav-link" to="/bimbel">Data Bimbel</Link>
          </li>
          <li className="navbar-item">
            <Link className="nav-link" to="/admin">Admin</Link>
          </li>
          <li className="navbar-item">
            <Link className="nav-link" to="/pendaftar">Pendaftar</Link>
          </li>
          <li className="navbar-item">
              <Link className="nav-link" to="" onClick={this.Logout}>
              Logout
              </Link>
            </li>
          <h4 class="text-light">Halo,Admin!</h4>
          </ul>
        </div>
      </div>
    );
  }
}
export default Navbar;
