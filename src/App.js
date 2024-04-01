import './App.css';
//import Form from './component/Form.js'
import Form from './component/Form.js'
import HomePage from './component/HomePage.js'
import {BrowserRouter,Route, Routes} from "react-router-dom"


function App() {
  return (
    <BrowserRouter>
    <div>
      <Routes>
        <Route path="/" element={<HomePage/>} />
        <Route path="/form" element={<Form/>} />
        <Route path="/update/:id" element={<Form />} />
      </Routes>
    </div>
    </BrowserRouter>
  );
}

export default App;
