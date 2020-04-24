import React,{Component} from "react";
// melakukan request http
import axios from "axios";
// memberi informasi dalam bentuk text
import Toast from "../component/Toast";
import $ from "jquery";


class Register extends Component {

  constructor() { // fungsi yang pertama kali di jalankan
    super();
    this.state = { // inisiasi state ( menyiapkan tempat data yang dibutuhkan )
      username: "",
      password: "",
      message: ""
    }
  }



  render(){ // menampilkan elemen pada halaman web
    return(
      <div className="container" style={{width: "35%"}}>
        <div className="card my-5">
          <div className="card-header bg-primary">
            <h5 className="text-white text-center">Register Siswa</h5>
          </div>
          <div className="card-body bg-info">
            <Toast id="message" autohide="false" title="informasi">
            {this.state.message}
            </Toast>
            <form onSubmit={this.Register}>
            <span>
              <label class="text-light"><i className="fa fa-user"></i>   Username</label>
            </span>
            <div className="input-group mb-3">
              <input type="text" className="form-control" placeholder="Enter Username" aria-label="Username" aria-describedby="basic-addon1" />
            </div>
            <span>
              <label class="text-light"><i className="fa fa-key"></i>   Password</label>
            </span>
            <div className="input-group mb-3">
              <input type="text" className="form-control" placeholder="Enter Password" aria-label="Password" aria-describedby="basic-addon1" />
            </div>
            <span>
              <label class="text-light"><i className="fa fa-envelope"></i>   Email</label>
            </span>
            <div className="input-group mb-3">
              <input type="text" className="form-control" placeholder="Enter Email" aria-label="Email" aria-describedby="basic-addon1" />
            </div>
            <div className=" d-flex justify-content-center">
              <button className="btn btn-secondary text-black" type="submit">
                <span className="fa fa-sign-in"></span> Submit
                </button>
            </div>

              </form>
            </div>
          </div>
        </div>
    );
  }
}


export default Register;
