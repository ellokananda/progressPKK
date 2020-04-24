import React, {Component} from "react";
// melakukan request http
import axios from "axios";
// memberi informasi dalam bentuk text
import $ from "jquery";
import Modal from "../component/Modal";
// menghubungkan dengan halaman Modal
import Toast from "../component/Toast";
// menghubungkan dengan halaman Toast



class Bimbels extends Component {
  constructor() {
  // fungsi yg pertama kali dijalankan
    super();
    this.state = {
      // inisiasi state ( menyiapkan tempat data yang dibutuhkan )
      // isi data nya di state aja nak
      bimbels: [
        {id_bimbel: "001", nama_bimbel: "Elli Community",gambar:"", alamat_bimbel: "Jakarta", nomor: "09828", deskripsi:"ini deskripsi", biaya: 12000}
      ],
      id_bimbel: "",
      id_daftar: "",
      nama_bimbel: "",
      gambar: "",
      alamat_bimbel: "",
      nomor: "",
      deskripsi: "",
      biaya: "",
      nama_pendaftar: "",
      nis: "",
      bayar: "",
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
    $("#modal_bimbels").modal("show");
    // mengosongkan data pada form
    this.setState({
      action: "insert",
      id_bimbel: "",
      nama_bimbel: "",
      gambar: "",
      alamat_bimbel: "",
      nomor: "",
      deskripsi: "",
      biaya: ""

    });
  }

  Edit = (item) => { // fungsi untuk mengedit data
    //membuka modal
    $("#modal_bimbels").modal("show");
    // mengisikan data pada form
    this.setState({
      action: "update",
      id_bimbel: item.id_bimbel,
      nama_bimbel: item.nama_bimbel,
      gambar : item.gambar,
      alamat_bimbel: item.alamat_bimbel,
      nomor: item.nomor,
      deskripsi: item.deskripsi,
      biaya: item.biaya
    });
  }

  get_bimbels = () => {
  // memanggil API untuk mendapatkan data dari database
    $("#loading").toast("show");
    //menampilkan proses loading
    let url = "http://localhost/projek_ukk/public/bimbels";
    // menampilkan file untuk dijalankan
    axios.get(url) // untuk mengirim data
    .then(response => {
      this.setState({bimbels: response.data.bimbels});
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
        let url = "http://localhost/projek_ukk/public/bimbels/drop/"+id;
        // memanggil file untuk dijalankan
        axios.delete(url) // untuk mengirim data
        .then(response => {
          $("#loading").toast("hide");
          // untuk menyembunyikan proses loading
          this.setState({message: response.data.message});
          // jika berhasil mengahapus
          $("#message").toast("show");
          this.get_bimbels();
        })
        .catch(error => {
          console.log(error);
        });
      }
    }

  componentDidMount = () => { // untuk mengeksekusi fungsi get
    this.get_bimbels();
  }


  Save = (event) => { // fungsi untuk menyimpan data
    event.preventDefault();
    //menampilkan proses loading
    $("#loading").toast("show");
    //menutup form modal
    $("#modal_bimbels").modal("hide");
    let url = "http://localhost/projek_ukk/public/bimbels/save";
    // memanggil file untuk dijalankan
    let form = new FormData();
    form.append("action", this.state.action);
    form.append("id_bimbel", this.state.id_bimbel);
    form.append("nama_bimbel", this.state.nama_bimbel);
    form.append("gambar", this.state.gambar);
    form.append("alamat_bimbel", this.state.alamat_bimbel);
    form.append("nomor", this.state.nomor);
    form.append("deskripsi", this.state.deskripsi);
    form.append("biaya", this.state.biaya);
    // membungkus data yang akan dikirim melalui API

    axios.post(url, form) // untuk mengirim data
    .then(response => {
      $("#loading").toast("hide");
      // menyembunyikan proses loading
      this.setState({message: response.data.message});
      // jika berhasil menyimpan
      $("#message").toast("show");
      this.get_bimbels();
    })
    .catch(error => {
      console.log(error);
    });
  }

  search = (event) => { // fungsi untuk mencari data
    if (event.keyCode === 13) {
      $("#loading").toast("show");
      // untuk menampilkan proses loading
      let url = "http://localhost/projek_ukk/public/bimbels";
      // memanggil file untuk dijalankan
      let form = new FormData();
      form.append("find", this.state.find);
      // memasukkan item ke dalam form
      axios.post(url, form) // untuk mengirim data
      .then(response => {
        $("#loading").toast("hide");
        // menyembunyikan proses loading
        this.setState({bimbels: response.data.bimbels});
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
                  <h4 className="text-white">Data Bimbel</h4>
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
                    <th>Nama Bimbel</th>
                    <th>Gambar</th>
                    <th>Alamat Bimbel</th>
                    <th>Telepon</th>
                    <th>Deskripsi</th>
                    <th>Biaya</th>
                    <th>Option</th>
                  </tr>
                </thead>
                <tbody>
                  { this.state.bimbels.map((item) => {
                    // untuk menampilkan data yg ada pada array
                    return(
                      <tr key={item.id_bimbel}>
                        <td>{item.nama_bimbel}</td>
                        <td>{item.gambar}</td>
                        <td>{item.alamat_bimbel}</td>
                        <td>{item.nomor}</td>
                        <td>{item.deskripsi}</td>
                        <td className="m-2 btn btn-sm btn-dark">{item.biaya}</td>
                        <td>
                          <button className="m-1 btn btn-sm btn-info" onClick={() => this.Edit(item)}>
                            <span className="fa fa-sign-in"> Daftar</span>
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>



              {/* form modal siswa*/}
              <Modal id="modal_bimbels" title="Daftar" bg_header="info" text_header="white">
                <form onSubmit={this.Save}>
                  ID Daftar
                  <input type="text" className="form-control" name="id_daftar" value={this.state.id_daftar}
                    onChange={this.bind} required />
                  Nama
                  <input type="text" className="form-control" name="nama_pendaftar"
                    value={this.state.nama_pendaftar} onChange={this.bind} required />
                  NIS
                  <input type="text" className="form-control" name="nis"
                    value={this.state.nis} onChange={this.bind} required />
                  Telepon
                  <input type="text" className="form-control" name="nomor" value={this.state.nomor}
                    onChange={this.bind} required />
                  Pilih Kategori
                    <select name="kategori_pembayaran" className="form-control"
                      value={this.state.kategori_pembayaran} onChange={this.bind} required>
                        <option value="">-- Bayar via --</option>
                        <option value="cash">Cash</option>
                        <option value="transfer">Transfer</option>

                    </select>
                  <button type="submit" className="btn btn-success pull-right m-2">
                    <span className="fa fa-check"></span> OK
                  </button>
                </form>
              </Modal>
            </div>
          </div>


        </div>
      );
    }
}
export default Bimbels;
