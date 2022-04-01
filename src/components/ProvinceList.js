import React, { useState, useEffect } from 'react'
import { Link } from "react-router-dom";
import swal from 'sweetalert';
import axios from "axios";

const ProvinceList = () => {

  const URL = 'http://127.0.0.1:8000/';

  const [cari, setCari] = useState('');
  const [province, setProvince] = useState([]);
  const [paginate, setPaginate] = useState([]);

  useEffect(() => {
    getProvince()
  }, []);
 
  const getProvince = async () => {
    const response = await axios.get(`${URL}api/province`);
    setProvince(response.data.data);
    setPaginate(response.data.pagination)
  }

  const changePaginate = async (url) => {
    if (url != null) {
      const response = await axios.get(url);
      setProvince(response.data.data);
      setPaginate(response.data.pagination);
    }
  }

  const searchProvince = async (e) => {
    e.preventDefault();
    const response = await axios.get(`${URL}api/province/search/${cari}`);
    if (response.data.success) {
      setProvince(response.data.data);
      setPaginate(response.data.pagination)
    }else{
      getProvince();
      swal("Warning!", "Data tidak ditemukan!", "warning");
    }
  }
 
  const deleteProvince = async (id) => {
    await axios.delete(`${URL}api/province/${id}`);
    getProvince();
    swal("Success!", "Berhasil hapus!", "success");
  }

  return(
    <div className="card border-0 shadow-sm">
      <div className="card-header bg-white">
        <h4 className="mt-2 mb-2">Daftar Provinsi</h4>
      </div>
      <div className="card-body">
        <Link to="/add" className="btn btn-primary mb-3">Tambah</Link>
        <form onSubmit={searchProvince} className="mb-2">
          <input type="text" className="form-control" value={cari} onChange={(e) => setCari(e.target.value)} placeholder="Pencarian..."/>
          <button className="btn btn-dark">Cari</button>
        </form>

        {province.length > 0
          ?
          <>
          <table className="table table-striped table-bordered">
            <thead>
              <tr>
                <th>Key</th>
                <th>Value</th>
                <th width="20%">Image</th>
                <th>Action &raquo;</th>
              </tr>
            </thead>
            <tbody>
              { province.map((province, index) => (
              <tr key={province.id}>
                <td>{province.key}</td>
                <td>{province.value}</td>
                <td><img src={URL+'images/'+province.file} alt={province.key} className="w-100" /></td>
                <td>
                  <Link to={'edit/'+province.id} className="btn btn-sm btn-warning mb-1">Edit</Link>
                  <br/>
                  <button onClick={() => deleteProvince(province.id)} className="btn btn-sm btn-danger">Delete</button>
                </td>
              </tr>
              )) }
              
            </tbody>
          </table>
          <nav aria-label="Pagination">
              <ul className="pagination">
              { paginate.map((paginate, index) => (
                <li key={paginate.label} className={paginate.active ? 'page-item active' : ''}>
                  <button className="page-link" onClick={() => changePaginate(paginate.url)}>{paginate.label}</button>
                </li>
              )) }
              </ul>
          </nav>
          </>
          : 
          <div className="alert alert-info">Data tidak tersedia.</div>
        }
      </div>
    </div>
  )
}

export default ProvinceList;