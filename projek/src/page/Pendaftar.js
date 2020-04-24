import React, {Component} from "react";
// melakukan request http
import axios from "axios";
// memberi informasi dalam bentuk text
import $ from "jquery";
import Modal from "../component/Modal";
// menghubungkan dengan halaman Modal
import Toast from "../component/Toast";
// menghubungkan dengan halaman Toast



class Pendaftar extends Component {
  constructor() {
  // fungsi yg pertama kali dijalankan
    super();
    this.state = {
      // inisiasi state ( menyiapkan tempat data yang dibutuhkan )
      // isi data nya di state aja nak
      pendaftar: [
        {id_pendaftar: "008", nama_pendaftar: "Milea", nis: "77364", nomors: "0875286381", status: "Lunas"}
      ],
      id_pendaftar: "",
      nama_pendaftar: "",
      nis: "",
      nomors: "",
      status: "",
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
    $("#modal_pendaftar").modal("show");
    // mengosongkan data pada form
    this.setState({
      action: "insert",
      id_pendaftar: "",
      nama_pendaftar: "",
      nis: "",
      nomors: "",
      status: ""

    });
  }

  Edit = (item) => { // fungsi untuk mengedit data
    //membuka modal
    $("#modal_pendaftar").modal("show");
    // mengisikan data pada form
    this.setState({
      action: "update",
      id_pendaftar: item.id_pendaftar,
      nama_pendaftar: item.nama_pendaftar,
      nis: item.nis,
      nomors: item.nomors,
      status: item.status
    });
  }

  get_pendaftar = () => {
  // memanggil API untuk mendapatkan data dari database
    $("#loading").toast("show");
    //menampilkan proses loading
    let url = "http://localhost/projek_ukk/public/pendaftar";
    // menampilkan file untuk dijalankan
    axios.get(url) // untuk mengirim data
    .then(response => {
      this.setState({pendaftar: response.data.pendaftar});
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
        let url = "http://localhost/projek_ukk/public/pendaftar/drop/"+id;
        // memanggil file untuk dijalankan
        axios.delete(url) // untuk mengirim data
        .then(response => {
          $("#loading").toast("hide");
          // untuk menyembunyikan proses loading
          this.setState({message: response.data.message});
          // jika berhasil mengahapus
          $("#message").toast("show");
          this.get_pendaftar();
        })
        .catch(error => {
          console.log(error);
        });
      }
    }

  componentDidMount = () => { // untuk mengeksekusi fungsi get
    this.get_pendaftar();
  }


  Save = (event) => { // fungsi untuk menyimpan data
    event.preventDefault();
    //menampilkan proses loading
    $("#loading").toast("show");
    //menutup form modal
    $("#modal_pendaftar").modal("hide");
    let url = "http://localhost/projek_ukk/public/pendaftar/save";
    // memanggil file untuk dijalankan
    let form = new FormData();
    form.append("action", this.state.action);
    form.append("id_pendaftar", this.state.id_pendaftar);
    form.append("nama_pendaftar", this.state.nama_pendaftar);
    form.append("nis", this.state.nis);
    form.append("nomors", this.state.nomors);
    form.append("status", this.state.status);
    // membungkus data yang akan dikirim melalui API

    axios.post(url, form) // untuk mengirim data
    .then(response => {
      $("#loading").toast("hide");
      // menyembunyikan proses loading
      this.setState({message: response.data.message});
      // jika berhasil menyimpan
      $("#message").toast("show");
      this.get_pendaftar();
    })
    .catch(error => {
      console.log(error);
    });
  }

  search = (event) => { // fungsi untuk mencari data
    if (event.keyCode === 13) {
      $("#loading").toast("show");
      // untuk menampilkan proses loading
      let url = "http://localhost/projek_ukk/public/pendaftar";
      // memanggil file untuk dijalankan
      let form = new FormData();
      form.append("find", this.state.find);
      // memasukkan item ke dalam form
      axios.post(url, form) // untuk mengirim data
      .then(response => {
        $("#loading").toast("hide");
        // menyembunyikan proses loading
        this.setState({pendaftar: response.data.pendaftar});
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
                  <h4 className="text-white">Data Pendaftar</h4>
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
                    <th>Nama Pendaftar</th>
                    <th>NIS</th>
                    <th>Telepon</th>
                    <th>Status</th>
                    <th>Option</th>
                  </tr>
                </thead>
                <tbody>
                  { this.state.pendaftar.map((item) => {
                    // untuk menampilkan data yg ada pada array
                    return(
                      <tr key={item.id_pendaftar}>
                        <td>{item.nama_pendaftar}</td>
                        <td>{item.nis}</td>
                        <td>{item.nomors}</td>
                        <td className="m-2 btn btn-sm btn-dark">{item.status}</td>
                        <td>
                          <button className="m-1 btn btn-sm btn-info" onClick={() => this.Edit(item)}>
                            <span className="fa fa-edit"></span>
                          </button>
                          <button className="m-1 btn btn-sm btn-danger"
                            onClick={() => this.Drop(item.id_pendaftar)}>
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
                  <input type="text" className="form-control" name="id_pendaftar" value={this.state.id_pendaftar}
                    onChange={this.bind} required />
                  Nama
                  <input type="text" className="form-control" name="nama_pendaftar"
                    value={this.state.nama_pendaftar} onChange={this.bind} required />
                  NIS
                  <input type="text" className="form-control" name="nis"
                    value={this.state.nis} onChange={this.bind} required />
                  Telepon
                  <input type="text" className="form-control" name="nomors" value={this.state.nomors}
                    onChange={this.bind} required />
                  Status
                  <input type="text" className="form-control" name="status" value={this.state.status}
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
export default Pendaftar;
