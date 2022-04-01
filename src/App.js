import { BrowserRouter, Routes, Route } from "react-router-dom";

import ProvinceList from './components/ProvinceList'
import ProvinceAdd from './components/ProvinceAdd'
import ProvinceEdit from './components/ProvinceEdit'

const App = () => {

  return (
    <BrowserRouter>
      <div className="container mt-5">
        <div className="row">
          <div className="col-12">
            <Routes>
              <Route path="/" element={<ProvinceList />} />
              <Route path="add" element={<ProvinceAdd />} />
              <Route path="edit/:id" element={<ProvinceEdit />} />
            </Routes>
          </div>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
