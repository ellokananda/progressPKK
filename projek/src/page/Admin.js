import React, {Component} from "react";
// melakukan request http
import axios from "axios";
// memberi informasi dalam bentuk text
import $ from "jquery";
import Modal from "../component/Modal";
// menghubungkan dengan halaman Modal
import Toast from "../component/Toast";
// menghubungkan dengan halaman Toast



class Admin extends Component {
  constructor() {
  // fungsi yg pertama kali dijalankan
    super();
    this.state = {
      // inisiasi state ( menyiapkan tempat data yang dibutuhkan )
      // isi data nya di state aja nak
      admin: [
        {id_admin: "008", username: "Milea", email: "burhan@gmail.com", nomora: "0875286381"}
      ],
      id_admin: "",
      username: "",
      password: "",
      email: "",
      nomora: "",
      action: "",
      find: "",
      message: ""
    }

    //jika tidak terdapat data token pada local storage
    // if(!localStorage.getItem("Token")){
    //   //direct ke halaman Login
    //   window.location = "/login";
    // }
  }

  bind =(event) => {
  // menghubungkan state dan elemen
    this.setState({[event.target.name] : event.target.value});
  }

  Add = () => { // fungsi untuk menambah data
    // membuka modal
    $("#modal_admin").modal("show");
    // mengosongkan data pada form
    this.setState({
      action: "insert",
      id_admin: "",
      username: "",
      password: "",
      email: "",
      nomora: ""

    });
  }

  Edit = (item) => { // fungsi untuk mengedit data
    //membuka modal
    $("#modal_admin").modal("show");
    // mengisikan data pada form
    this.setState({
      action: "update",
      id_admin: item.id_admin,
      username: item.username,
      password: item.password,
      email: item.email,
      nomora: item.nomora
    });
  }

  get_admin = () => {
  // memanggil API untuk mendapatkan data dari database
    $("#loading").toast("show");
    //menampilkan proses loading
    let url = "http://localhost/projek_ukk/public/admin";
    // menampilkan file untuk dijalankan
    axios.get(url) // untuk mengirim data
    .then(response => {
      this.setState({admin: response.data.admin});
      // jika berhasil mengambil data
      $("#loading").toast("hide");
      // menyembunyikan proses loading
    })
    .catch(error => { // menangkap error
      console.log(error);
    });
  }

  Drop = (id) => { // fungsi untuk menghapus data
      if (window.confirm("Apakah anda yakin ingin mengahpus data ini?")) {
      // menampilkan pesan konfirmasi
        $("#loading").toast("show");
        // menampilkan proses loading
        let url = "http://localhost/projek_ukk/public/admin/drop/"+id;
        // memanggil file untuk dijalankan
        axios.delete(url) // untuk mengirim data
        .then(response => {
          $("#loading").toast("hide");
          // untuk menyembunyikan proses loading
          this.setState({message: response.data.message});
          // jika berhasil mengahapus
          $("#message").toast("show");
          this.get_admin();
        })
        .catch(error => {
          console.log(error);
        });
      }
    }

  componentDidMount = () => { // untuk mengeksekusi fungsi get
    this.get_admin();
  }


  Save = (event) => { // fungsi untuk menyimpan data
    event.preventDefault();
    //menampilkan proses loading
    $("#loading").toast("show");
    //menutup form modal
    $("#modal_admin").modal("hide");
    let url = "http://localhost/projek_ukk/public/admin/save";
    // memanggil file untuk dijalankan
    let form = new FormData();
    form.append("action", this.state.action);
    form.append("id_admin", this.state.id_admin);
    form.append("username", this.state.username);
    form.append("password", this.state.password);
    form.append("email", this.state.email);
    form.append("nomora", this.state.nomora);
    // membungkus data yang akan dikirim melalui API

    axios.post(url, form) // untuk mengirim data
    .then(response => {
      $("#loading").toast("hide");
      // menyembunyikan proses loading
      this.setState({message: response.data.message});
      // jika berhasil menyimpan
      $("#message").toast("show");
      this.get_admin();
    })
    .catch(error => {
      console.log(error);
    });
  }

  search = (event) => { // fungsi untuk mencari data
    if (event.keyCode === 13) {
      $("#loading").toast("show");
      // untuk menampilkan proses loading
      let url = "http://localhost/projek_ukk/public/admin";
      // memanggil file untuk dijalankan
      let form = new FormData();
      form.append("find", this.state.find);
      // memasukkan item ke dalam form
      axios.post(url, form) // untuk mengirim data
      .then(response => {
        $("#loading").toast("hide");
        // menyembunyikan proses loading
        this.setState({admin: response.data.admin});
        //jika proses berhasil
      })
      .catch(error => {
        console.log(error);
      });
    }
  }

  render(){
  // menampilkan elemen pada halaman web
      return(
        <div className="container">
          <div className="card mt-2">
            {/* header card */}
            <div className="card-header bg-secondary">
              <div className="row">
                <div className="col-sm-8">
                  <h4 className="text-white">Data Admin</h4>
                </div>
                <div className="col-sm-4">
                  <input type="text" className="form-control" name="find"
                    onChange={this.bind} value={this.state.find} onKeyUp={this.search}
                    placeholder="Pencarian..." />
                </div>
              </div>
            </div>
            {/* content card */}
            <div className="card-body">
              <Toast id="message" autohide="true" title="Informasi">
                {this.state.message}
              </Toast>
              <Toast id="loading" autohide="false" title="Informasi">
                <span className="fa fa-spin fa-spinner"></span> Sedang Memuat
              </Toast>
              <table className="table">
                <thead>
                  <tr>
                    <th>Username</th>
                    <th>Email</th>
                    <th>Telepon</th>
                    <th>Option</th>
                  </tr>
                </thead>
                <tbody>
                  { this.state.admin.map((item) => {
                    // untuk menampilkan data yg ada pada array
                    return(
                      <tr key={item.id_admin}>
                        <td>{item.username}</td>
                        <td>{item.email}</td>
                        <td>{item.nomora}</td>
                        <td>
                          <button className="m-1 btn btn-sm btn-info" onClick={() => this.Edit(item)}>
                            <span className="fa fa-edit"></span>
                          </button>
                          <button className="m-1 btn btn-sm btn-danger"
                            onClick={() => this.Drop(item.id_admin)}>
                            <span className="fa fa-trash"></span>
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>

              {/* tombol tambah */}
              <button className="btn btn-light my-2" onClick={this.Add}>
                <span className="fa fa-plus"></span> Tambah Data
              </button>

              {/* form modal siswa*/}
              <Modal id="modal_pendaftar" title="Form Pendaftar" bg_header="info" text_header="white">
                <form onSubmit={this.Save}>
                  ID
                  <input type="text" className="form-control" name="id_admin" value={this.state.id_admin}
                    onChange={this.bind} required />
                  Username
                  <input type="text" className="form-control" name="username"
                    value={this.state.username} onChange={this.bind} required />
                  Password
                  <input type="password" className="form-control" name="password"
                    value={this.state.password} onChange={this.bind} required />
                  Email
                  <input type="text" className="form-control" name="status" value={this.state.email}
                    onChange={this.bind} required />
                  Telepon
                  <input type="text" className="form-control" name="nomora" value={this.state.nomora}
                    onChange={this.bind} required />
                  <button type="submit" className="btn btn-success pull-right m-2">
                    <span className="fa fa-check"></span> Simpan
                  </button>
                </form>
              </Modal>
            </div>
          </div>
        </div>
      );
    }
}
export default Admin;
