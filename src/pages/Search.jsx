import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom'
import Loader from '../components/loader/Loader';
import ProductsList from '../components/productsList/ProductsList';
import { fetchAsyncSearchProduct } from '../redux/searchSlice';
import { STATUS } from '../utils/status';

const Search = () => {
  const {searchTerm} = useParams();
  const dispatch = useDispatch();
  const {searchProducts, searchProductStatus: status} = useSelector(state => state.search);
  
  useEffect(() => {
    dispatch(fetchAsyncSearchProduct(searchTerm))
  }, [searchTerm]);

  if(searchProducts.length === 0) {
    return (
      <div className='flex align-center justify-center' style={{minHeight: '70vh'}}>
        <h4 className='text-orange'>Can't find anything</h4>
      </div>
      )
  }
  
  return (
    <div className="search-content bg-whitesmoke">
      <div className="container">
        <div className="py-5">
          <div className="title-md">
            <h3>Search results:</h3>
          </div>
          <br />
          {
            status === STATUS.LOADING ? <Loader/> : <ProductsList products = {searchProducts} />
          }
        </div>
      </div>
    </div>
  )
}

export default Search