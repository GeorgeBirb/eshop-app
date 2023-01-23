import { Link } from 'react-router-dom'
import UserService from "../services/UserService";
import '../App.css'

function Navbar() {

  return (

    <div className="nav-bar-container-light">
      <div className='alignLeft'>
        <h2>Welcome!!</h2>
      </div>
      <div>
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
          <li className="list-item">
            <Link to="/about" className="link-light">
              About
            </Link>
          </li>
        </ul>
      </div>
      <div className='alignRight'>
        <button className="buttonLogout" onClick={() => UserService.doLogout()}>
          <h2>Logout</h2>
         </button>
      </div>
    </div>
  );
}

export default Navbar