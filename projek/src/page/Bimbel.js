import React, {Component} from "react";
// melakukan request http
import axios from "axios";
// memberi informasi dalam bentuk text
import $ from "jquery";
import Modal from "../component/Modal";
// menghubungkan dengan halaman Modal
import Toast from "../component/Toast";
// menghubungkan dengan halaman Toast



class Bimbel extends Component {
  constructor() {
  // fungsi yg pertama kali dijalankan
    super();
    this.state = {
      // inisiasi state ( menyiapkan tempat data yang dibutuhkan )
      // isi data nya di state aja nak
      bimbel: [
        {id_bimbel: "001", nama_bimbel: "Elli Community", alamat_bimbel: "Jakarta", nomor: "09828", deskripsi:"ini deskripsi", biaya: 12000}
      ],
      id_bimbel: "",
      nama_bimbel: "",
      gambar: "",
      alamat_bimbel: "",
      nomor: "",
      deskripsi:"",
      biaya: "",
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
    $("#modal_bimbel").modal("show");
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
    $("#modal_bimbel").modal("show");
    // mengisikan data pada form
    this.setState({
      action: "update",
      id_bimbel: item.id_bimbel,
      nama_bimbel: item.nama_bimbel,
      gambar: item.gambar,
      alamat_bimbel: item.alamat_bimbel,
      nomor: item.nomor,
      deskripsi: item.deskripsi,
      biaya: item.biaya
    });
  }

  get_bimbel = () => {
  // memanggil API untuk mendapatkan data dari database
    $("#loading").toast("show");
    //menampilkan proses loading
    let url = "http://localhost/projek_ukk/public/bimbel";
    // menampilkan file untuk dijalankan
    axios.get(url) // untuk mengirim data
    .then(response => {
      this.setState({bimbel: response.data.bimbel});
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
        let url = "http://localhost/projek_ukk/public/bimbel/drop/"+id;
        // memanggil file untuk dijalankan
        axios.delete(url) // untuk mengirim data
        .then(response => {
          $("#loading").toast("hide");
          // untuk menyembunyikan proses loading
          this.setState({message: response.data.message});
          // jika berhasil mengahapus
          $("#message").toast("show");
          this.get_bimbel();
        })
        .catch(error => {
          console.log(error);
        });
      }
    }

  componentDidMount = () => { // untuk mengeksekusi fungsi get
    this.get_bimbel();
  }


  Save = (event) => { // fungsi untuk menyimpan data
    event.preventDefault();
    //menampilkan proses loading
    $("#loading").toast("show");
    //menutup form modal
    $("#modal_bimbel").modal("hide");
    let url = "http://localhost/projek_ukk/public/bimbel/save";
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
      this.get_bimbel();
    })
    .catch(error => {
      console.log(error);
    });
  }

  search = (event) => { // fungsi untuk mencari data
    if (event.keyCode === 13) {
      $("#loading").toast("show");
      // untuk menampilkan proses loading
      let url = "http://localhost/projek_ukk/public/bimbel";
      // memanggil file untuk dijalankan
      let form = new FormData();
      form.append("find", this.state.find);
      // memasukkan item ke dalam form
      axios.post(url, form) // untuk mengirim data
      .then(response => {
        $("#loading").toast("hide");
        // menyembunyikan proses loading
        this.setState({bimbel: response.data.bimbel});
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
                  { this.state.bimbel.map((item) => {
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
                            <span className="fa fa-edit"></span>
                          </button>
                          <button className="m-1 btn btn-sm btn-danger"
                            onClick={() => this.Drop(item.id_bimbel)}>
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
              <Modal id="modal_bimbel" title="Form Tambah" bg_header="info" text_header="white">
                <form onSubmit={this.Save}>
                  ID Bimbel
                  <input type="text" className="form-control" name="id_bimbel" value={this.state.id_bimbel}
                    onChange={this.bind} required />
                  Nama Bimbel
                  <input type="text" className="form-control" name="nama_bimbel"
                    value={this.state.nama_bimbel} onChange={this.bind} required />
                  Gambar
                  <div className="custom-file">
                    <input type="file" className="custom-file-input" name="gambar"
                      onChange={this.bind}/>
                    <label class="custom-file-label" for="customFile">Cari Gambar</label>
                  </div>
                  Alamat
                  <input type="text" className="form-control" name="alamat_bimbel"
                    value={this.state.alamat_bimbel} onChange={this.bind} required />
                  Telepon
                  <input type="text" className="form-control" name="nomor" value={this.state.nomor}
                    onChange={this.bind} required />
                  <div class="form-group">
                    <label for="exampleFormControlTextarea1">Deskripsi</label>
                    <textarea className="form-control" value={this.state.deskripsi} onChange={this.bind}
                     rows="3"></textarea>
                  </div>
                  Biaya
                  <input type="number" className="form-control" name="biaya" value={this.state.biaya}
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
export default Bimbel;
