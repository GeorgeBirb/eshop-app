import './App.css'
import { Routes, Route } from "react-router-dom"
import Shop from "./pages/Shop"
import ShopCategory from "./pages/ShopCategory"
import Home from "./pages/Home"
import About from "./pages/About"
import Location from "./pages/Location"


function App() {
  return (
      <div className="App">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/home" element={<Home />} />
          <Route path="/location" element={<Location />} />
          <Route path="/about" element={<About />} />
          <Route path="/shop" element={<Shop />} />
          <Route path="/shopCategory" element={<ShopCategory />} />
        </Routes>
      </div>
  );
}

export default App;
