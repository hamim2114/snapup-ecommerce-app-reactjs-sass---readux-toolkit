import './Navbar.scss';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setSidebarOn } from '../../redux/sidebarSlice';
import { useEffect, useState } from 'react';
import { fetchAsyncCategories } from '../../redux/categorySlice';
import CartModal from '../cartModal/CartModal';

const Navbar = () => {
  const dispatch = useDispatch();
  const {categories} = useSelector(state => state.category);
  const {carts} = useSelector(state => state.cart);
  const [search, setSearch] = useState('')
console.log(search)
  useEffect(() => {
    dispatch(fetchAsyncCategories())
  },[]);

  const handleSearch = (e) => {
    setSearch(e)
  }

  return (
      <nav className='navbar'>
      <div className='navbar-cnt flex align-center'>
        <div className='brand-and-toggler flex align-center'>
          <button onClick={() => dispatch(setSidebarOn())} type = "button" className='sidebar-show-btn text-white'>
            <i className='fas fa-bars'></i>
          </button>
          <Link to = "/" className='navbar-brand flex align-center'>
            <span className='navbar-brand-ico'>
              <i className='fa-solid fa-bag-shopping'></i>
            </span>
            <span className='navbar-brand-txt mx-2'>
              <span className='fw-7'>Snap</span>Up.
            </span>
          </Link>
        </div>

        <div className='navbar-collapse w-100'>
          <div className='navbar-search bg-white'>
            <div className='flex align-center'>
              <input type = "text" className='form-control fs-14' onChange={(e) => handleSearch(e.target.value)} placeholder='Search your preferred items here'/>
              <Link to = {`search/${search}`} className='text-white search-btn flex align-center justify-center'>
                  <i className='fa-solid fa-magnifying-glass'></i>
                </Link>
            </div>
          </div>

          <ul className='navbar-nav flex align-center fs-12 fw-4 font-manrope'>
                {
                  categories.slice(0,10).map((item, id) => (
                    <li className='nav-item no-wrap' key={id}>
                      <Link to = {`category/${item}`} className='nav-link text-capitalize'>{item.replace('-', '')}</Link>
                    </li>
                  ))
                }
          </ul>
        </div>

        <div className='navbar-cart flex align-center'>
          <Link to = "/cart" className='cart-btn'>
            <i className='fa-solid fa-cart-shopping'></i>
            <div className='cart-items-value'>{carts.length}</div>
            <CartModal carts={carts}/>
          </Link>
        </div>
      </div>
    </nav>
   );
};

export default Navbar;
