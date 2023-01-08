import './App.css'
import { Routes, Route } from "react-router-dom"
import Shop from "./pages/Shop"
import ShopCategory from "./pages/ShopCategory"
import Home from "./pages/Home"
import Navbar from "./navbar/Navbar"

function App() {
  return (
    <div className="App">
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/home" element={<Home />} />
        <Route path="/shop" element={<Shop />} />
        <Route path="/shopCategory" element={<ShopCategory />} />
      </Routes>
    </div>
  );
}

export default App;
