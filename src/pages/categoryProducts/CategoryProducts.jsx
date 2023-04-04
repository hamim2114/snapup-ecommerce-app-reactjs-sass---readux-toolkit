import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom'
import Loader from '../../components/loader/Loader';
import ProductsList from '../../components/productsList/ProductsList';
import { fetchAsyncCategoryProducts } from '../../redux/categorySlice';
import { STATUS } from '../../utils/status';
import './categoryProducts.scss'

const CategoryProducts = () => {
  const {category} = useParams();
  const dispatch = useDispatch();
  const {categoryProducts: products, categoryProductsStatus: status} = useSelector(state => state.category);

  useEffect(() => {
   dispatch(fetchAsyncCategoryProducts(category))
  }, [category])
  
  return (
    <div className="cat-products py-5 bg-whitesmoke">
      <div className="container">
        <div className="cat-products-content">
          <div className="title-md">
            <h3>See our <span className="text-capitalize">{category.replace('-', ' ')}</span></h3>
          </div>
          {
            status === STATUS.LOADING ? <Loader/> : <ProductsList products={products} />
          }
        </div>
      </div>
    </div>
  )
}

export default CategoryProducts