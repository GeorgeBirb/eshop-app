import { Link } from 'react-router-dom'

import '../App.css'

function Navbar ()  {
  return (
    <div className="nav-bar-container-light">
      <ul className="middle-items">
        <li className="list-item">
          <Link to="/home" className="link-light">
            Home
          </Link>
        </li>
        <li className="list-item">
          <Link to="/shop" className="link-light">
            Shops
          </Link>
        </li>
        <li className="list-item">
          <Link to="/shopCategory" className="link-light">
            ShopCategory
          </Link>
        </li>
      </ul>
    </div>
    );
  }

export default Navbar