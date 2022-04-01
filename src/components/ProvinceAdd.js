import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import swal from 'sweetalert';
import axios from "axios";

const ProvinceAdd = () => {

  const URL = 'http://127.0.0.1:8000/';

  const [key, setKey] = useState('');
  const [value, setValue] = useState('');
  const [saveImage, setSaveImage] = useState('');
  const navigate = useNavigate();

  const handleUploadChange = (e) => {
    let uploaded = e.target.files[0];
    setSaveImage(uploaded);
  }
 
  const saveProvince = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("key", key);
    formData.append("value", value);
    formData.append("file", saveImage);
    
    await axios.post(`${URL}api/province`, formData)
    .then((response) => {
      if(response.data.success){
        navigate('/');
        swal("Success!", "Berhasil tambah!", "success");
      }else{
        swal("Warning!", "Inputan wajib diisi!", "warning");
      }
    })
  }

  return(
    <div className="card border-0 shadow-sm">
      <div className="card-header bg-white">
        <h4 className="mt-2 mb-2">Add Provinsi</h4>
      </div>
      <div className="card-body">
        <Link to="/" className="btn btn-primary mb-3">Kembali</Link>
        <form onSubmit={saveProvince}>
          <div className="mb-3 row">
            <label htmlFor="key" className="col-sm-2 col-form-label">Key</label>
            <div className="col-sm-10">
              <input type="text" id="key" className="form-control" value={key} onChange={(e) => setKey(e.target.value)} />
            </div>
          </div>
          <div className="mb-3 row">
            <label htmlFor="value" className="col-sm-2 col-form-label">Value</label>
            <div className="col-sm-10">
              <input type="text" id="value" className="form-control" value={value} onChange={(e) => setValue(e.target.value)} />
            </div>
          </div>
          <div className="mb-3 row">
            <label htmlFor="image" className="col-sm-2 col-form-label">Image</label>
            <div className="col-sm-10">
              <input type="file" id="image" className="form-control" onChange={handleUploadChange} accept="image/*"/>
            </div>
          </div>
          <div className="mb-3 row">
            <div className="col-sm-10 offset-sm-2">
              <button className="btn btn-dark">Simpan</button>
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}

export default ProvinceAdd;