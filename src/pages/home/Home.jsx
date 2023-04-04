import './home.scss'
import Headerslider from '../../components/headerSlider/Headerslider'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'
import { fetchAsyncProducts } from '../../redux/productSlice'
import { STATUS } from '../../utils/status'
import Loader from '../../components/loader/Loader'
import ProductsList from '../../components/productsList/ProductsList'

const Home = () => {
  const dispatch = useDispatch();
  const {products, productsStatus} = useSelector(state => state.product);
  const {categories} = useSelector(state => state.category);
  
  useEffect(() => {
    dispatch(fetchAsyncProducts(50))
  },[]);

  //randomize the products list
  const randomProducts = [...products].sort(() => Math.random() - 0.5);

  const catProductsOne = products.filter(item => item.category === categories[0])
  const catProductsTwo = products.filter(item => item.category === categories[1])
  const catProductsThree = products.filter(item => item.category === categories[2])
  const catProductsFour = products.filter(item => item.category === categories[3])

  return (
    <main>
      <div className="slider-wrapper">
        <Headerslider/>
      </div>
      <div className="main-content bg-whitesmoke">
        <div className="container">
          <div className="categories py-5">

              {/* all category */}
            <div className="categories-item">
              <div className="title-md">
                <h3>See our products</h3>
              </div>
              {productsStatus === STATUS.LOADING ? <Loader/> : <ProductsList products={randomProducts}/>}
            </div>

              {/* single category */}
            <div className="categories-item">
              <div className="title-md">
                <h3>{categories[0]}</h3>
              </div>
              {productsStatus === STATUS.LOADING ? <Loader/> : <ProductsList products={catProductsOne}/>}
            </div>

            <div className="categories-item">
              <div className="title-md">
                <h3>{categories[1]}</h3>
              </div>
              {productsStatus === STATUS.LOADING ? <Loader/> : <ProductsList products={catProductsTwo}/>}
            </div>

            <div className="categories-item">
              <div className="title-md">
                <h3>{categories[2]}</h3>
              </div>
              {productsStatus === STATUS.LOADING ? <Loader/> : <ProductsList products={catProductsThree}/>}
            </div>

            <div className="categories-item">
              <div className="title-md">
                <h3>{categories[3]}</h3>
              </div>
              {productsStatus === STATUS.LOADING ? <Loader/> : <ProductsList products={catProductsFour}/>}
            </div>

          </div>
        </div>
      </div>
    </main>
  )
}

export default Home