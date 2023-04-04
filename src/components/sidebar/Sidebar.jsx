import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { setSidebarOff } from '../../redux/sidebarSlice';
import './sidebar.scss';

const Sidebar = () => {
  const dispatch = useDispatch();
  const {isSidebarOn} = useSelector(state => state.sidebar);
  const {categories} = useSelector(state => state.category)
  
  return (
    <aside className={`sidebar ${isSidebarOn ? 'active' : ''}`}>
      <button className="sidebar-hide-btn" onClick={() => dispatch(setSidebarOff())}>
        <i className="fas fa-times"></i>
      </button>
      <div className="sidebar-cnt">
        <div className="cat-title fs-17 text-uppercase fw-6 ls-1h">
          All Categories
        </div>
        <ul className="cat-list">
          {
            categories.map((item, id) => (
              <li key={id} onClick={() => dispatch(setSidebarOff())}>
                <Link to={`category/${item}`} className='cat-list-link text-capitalize' >
                  {item.replace('-', '')}
                </Link>
            </li>
            ))
          }
        </ul>
      </div>
    </aside>
  )
}

export default Sidebar