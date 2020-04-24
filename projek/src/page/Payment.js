import React, {Component} from "react";
// melakukan request http
import axios from "axios";
// memberi informasi dalam bentuk text
import $ from "jquery";
import Modal from "../component/Modal";
// menghubungkan dengan halaman Modal
import Toast from "../component/Toast";
// menghubungkan dengan halaman Toast



class Payment extends Component {
  constructor() {
  // fungsi yg pertama kali dijalankan
    super();
    this.state = {
      // inisiasi state ( menyiapkan tempat data yang dibutuhkan )
      // isi data nya di state aja nak
      payment: [
        {id_bayar: "001", nama_pendaftar: "Seri", nis: 96530, nama_bimbel: "Eden course", alamat_bimbel: "jakarta", status: "Lunas"}
      ],
      id_bayar: "",
      nama_pendaftar: "",
      nis: "",
      nama_bimbel: "",
      alamat_bimbel: "",
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
    $("#modal_payment").modal("show");
    // mengosongkan data pada form
    this.setState({
      action: "insert",
      id_bayar: "",
      nama_pendaftar: "",
      nis: "",
      nama_bimbel:"",
      alamat_bimbel: "",
      status: ""

    });
  }

  Edit = (item) => { // fungsi untuk mengedit data
    //membuka modal
    $("#modal_payment").modal("show");
    // mengisikan data pada form
    this.setState({
      action: "update",
      id_bayar: item.id_bayar,
      nama_pendaftar: item.nama_pendaftar,
      nis: item.nis,
      nama_bimbel: item.nama_bimbel,
      alamat_bimbel: item.alamat_bimbel,
      status: item.status
    });
  }

  get_payment = () => {
  // memanggil API untuk mendapatkan data dari database
    $("#loading").toast("show");
    //menampilkan proses loading
    let url = "http://localhost/projek_ukk/public/payment";
    // menampilkan file untuk dijalankan
    axios.get(url) // untuk mengirim data
    .then(response => {
      this.setState({payment: response.data.payment});
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
        let url = "http://localhost/projek_ukk/public/payment/drop/"+id;
        // memanggil file untuk dijalankan
        axios.delete(url) // untuk mengirim data
        .then(response => {
          $("#loading").toast("hide");
          // untuk menyembunyikan proses loading
          this.setState({message: response.data.message});
          // jika berhasil mengahapus
          $("#message").toast("show");
          this.get_payment();
        })
        .catch(error => {
          console.log(error);
        });
      }
    }

  componentDidMount = () => { // untuk mengeksekusi fungsi get
    this.get_payment();
  }


  Save = (event) => { // fungsi untuk menyimpan data
    event.preventDefault();
    //menampilkan proses loading
    $("#loading").toast("show");
    //menutup form modal
    $("#modal_payment").modal("hide");
    let url = "http://localhost/projek_ukk/public/payment/save";
    // memanggil file untuk dijalankan
    let form = new FormData();
    form.append("action", this.state.action);
    form.append("id_bayar", this.state.id_bayar);
    form.append("nama_pendaftar", this.state.nama_pendaftar);
    form.append("nis", this.state.nis);
    form.append("nama_bimbel", this.state.nama_bimbel);
    form.append("alamat_bimbel", this.state.alamat_bimbel);
    form.append("status", this.state.status);
    // membungkus data yang akan dikirim melalui API

    axios.post(url, form) // untuk mengirim data
    .then(response => {
      $("#loading").toast("hide");
      // menyembunyikan proses loading
      this.setState({message: response.data.message});
      // jika berhasil menyimpan
      $("#message").toast("show");
      this.get_payment();
    })
    .catch(error => {
      console.log(error);
    });
  }

  search = (event) => { // fungsi untuk mencari data
    if (event.keyCode === 13) {
      $("#loading").toast("show");
      // untuk menampilkan proses loading
      let url = "http://localhost/projek_ukk/public/payment";
      // memanggil file untuk dijalankan
      let form = new FormData();
      form.append("find", this.state.find);
      // memasukkan item ke dalam form
      axios.post(url, form) // untuk mengirim data
      .then(response => {
        $("#loading").toast("hide");
        // menyembunyikan proses loading
        this.setState({payment: response.data.payment});
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
                  <h4 className="text-white">Pembayaran</h4>
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

              <table className="table">
                <thead>
                  <tr>
                    <th>Nama</th>
                    <th>NIS</th>
                    <th>Bimbel</th>
                    <th>Alamat Bimbel</th>
                    <th>Status</th>
                    <th>Option</th>
                  </tr>
                </thead>
                <tbody>
                  { this.state.payment.map((item) => {
                    // untuk menampilkan data yg ada pada array
                    return(
                      <tr key={item.id_bayar}>
                        <td>{item.nama_pendaftar}</td>
                        <td>{item.nis}</td>
                        <td>{item.nama_bimbel}</td>
                        <td>{item.alamat_bimbel}</td>
                        <td>{item.status}</td>
                        <td>
                          <button className="m-1 btn btn-sm btn-info" onClick={() => this.Edit(item)}>
                            <span className="fa fa-edit"></span>
                          </button>
                          <button className="m-1 btn btn-sm btn-danger"
                            onClick={() => this.Drop(item.id_bayar)}>
                            <span className="fa fa-trash"></span>
                          </button>
                          <button className="m-1 btn btn-sm btn-info" onClick={() => this.Edit(item)}>
                            <span className="fa fa-file"> Bukti Bayar</span>
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>



              {/* form modal siswa*/}
              <Modal id="modal_payment" title="Form Edit" bg_header="info" text_header="white">
                <form onSubmit={this.Save}>
                  ID Bayar
                  <input type="text" className="form-control" name="id_bayar" value={this.state.id_bayar}
                    onChange={this.bind} required />
                  Nama
                  <input type="text" className="form-control" name="nama_pendaftar"
                    value={this.state.nama_pendaftar} onChange={this.bind} required />
                  NIS
                  <input type="text" className="form-control" name="nis"
                    value={this.state.nis} onChange={this.bind} required />
                  Bimbel
                  <input type="text" className="form-control" name="nama_bimbel"
                    value={this.state.nama_bimbel} onChange={this.bind} required />
                  Alamat Bimbel
                  <input type="text" className="form-control" name="alamat_bimbel"
                    value={this.state.alamat_bimbel} onChange={this.bind} required />
                  Status
                    <select name="kategori_status" className="form-control"
                      value={this.state.kategori_status} onChange={this.bind} required>
                        <option value="cash">Lunas</option>
                        <option value="transfer">Belum Lunas</option>
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
export default Payment;
