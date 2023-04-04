import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom'
import CartMessage from '../../components/cartMessage/CartMessage';
import Loader from '../../components/loader/Loader';
import { addToCart, setCartMessageOff, setCartMessageOn } from '../../redux/cartSlice';
import { fetchAsyncProductSingle } from '../../redux/productSlice';
import { formatPrice } from '../../utils/formatPrice';
import { STATUS } from '../../utils/status';
import './productSingle.scss'

const ProductSingle = () => {
  const {id} = useParams();
  const dispatch = useDispatch();
  const {productSingle: product, productSingleStatus: status} = useSelector(state => state.product);
  const {isCartMessageOn: cartMessageStatus} = useSelector(state => state.cart);

  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    dispatch(fetchAsyncProductSingle(id));
  },[]);

  useEffect(() => {
    if(cartMessageStatus){
      setTimeout(() => {
        dispatch(setCartMessageOff())
      }, 2000);
    }
  },[cartMessageStatus]);

  let discountPrice = (product?.price) - (product?.price * (product?.discountPercentage / 100));
  if (status === STATUS.LOADING){
    return <Loader/>
  };

  const increaseQty = () => {
    setQuantity(prev => {
      let tempQty = prev + 1;
      if(tempQty > product?.stock) tempQty = product?.stock;
      return tempQty
    })
  };

  const decreaseQty = () => {
    setQuantity(prev => {
      let tempQty = prev - 1;
      if(tempQty < 1) tempQty = 1;
      return tempQty;
    })
  };

  const addToCartHandler = (product) => {
    let totalPrice = quantity * discountPrice;
    dispatch(addToCart({...product, quantity, totalPrice, discountPrice  }))
    dispatch(setCartMessageOn())
  }

  return (
    <main className="py-5 bg-whitesmoke">
      <div className="product-single">
        <div className="container">
          <div className="product-single-content grid bg-white">
            <div className="product-single-l">
              <div className="product-img">
                <div className="product-img-zoom">
                  <img src={product ? (product.images ? product.images[0] : '') : '' } alt="" className="img-cover" />
                </div>
                <div className="product-img-thumb flex align-center my-2">
                  <div className="thumb-item">
                    <img src={product ? (product.images ? product.images[1] : '') : '' } alt="" className="img-cover" />
                  </div>
                  <div className="thumb-item">
                    <img src={product ? (product.images ? product.images[2] : '') : '' } alt="" className="img-cover" />
                  </div>
                  <div className="thumb-item">
                    <img src={product ? (product.images ? product.images[3] : '') : '' } alt="" className="img-cover" />
                  </div>
                  <div className="thumb-item">
                    <img src={product ? (product.images ? product.images[4] : '') : '' } alt="" className="img-cover" />
                  </div>
                </div>
              </div>
            </div>
            <div className="product-single-r">
              <div className="product-details">
                <div className="title fs-20 fw-5">{product?.title}</div>
                <p className="para fw-3 fs-15">{product?.description}</p>
                <div className="info flex align-center flex-wrap fs-14">
                  <div className="rating">
                    <span className="text-orange fw-5">Rating: </span>
                    <span className="mx-1">{product?.rating}</span>
                  </div>
                  <div className="vert-line"></div>
                  <div className="brand">
                    <span className="text-orange fw-5">Brand: </span>
                    <span className="mx-1">{product?.brand}</span>
                  </div>
                  <div className="vert-line"></div>
                  <div className="brand">
                      <span className="text-orange fw-5">Category: </span>
                      <span className="mx-1 text-capitalize">
                        {product?.category ? product.category.replace('-', ' ') : ''}
                      </span>
                  </div>
                </div>

                <div className="price">
                  <div className="flex align-center">
                    <div className="old-price text-gray">{formatPrice(product?.price)}</div>
                    <span className="fs-14 mx-2 text-dark">Inclusive of all texes</span>
                  </div>

                  <div className="flex align-center my-1">
                    <div className="new-price fw-5 fs-24 text-orange">{formatPrice(discountPrice)}</div>
                    <div className="discount bg-orange fs-13 fw-6 text-white">{product?.discountPercentage}% OFF</div>
                  </div>
                </div>

                <div className="qty flex align-center my-4">
                  <div className="qty-text">Quantity:</div>
                  <div className="qty-change flex align-center mx-3">
                    <button className="qty-decrease flex align-center justify-center" onClick={() => decreaseQty()}>
                      <i className="fas fa-minus"></i>
                    </button>
                    <div className="qty-value flex align-center justify-center">{quantity}</div>
                    <button className="qty-increase flex align-center justify-center" onClick={() => increaseQty()}>
                      <i className="fas fa-plus"></i>
                    </button>
                  </div>
                  {
                    product?.stock === 0 ? 
                    <div className='qty-error text-uppercase bg-danger text-white fs-12 ls-1 mx-2 fw5'>
                      Out of stock
                    </div> : ''
                  }
                </div>

                <div className="btns">
                  <button onClick={() => addToCartHandler(product)} className="add-to-cart-btn btn">
                    <i className="fas fa-shopping-cart"></i>
                    <span className="btn-text mx-2">Add To Cart</span>
                  </button>
                  <button className="buy-now btn mx-2"><span className="btn-text">Buy Now</span></button>
                </div>

              </div>
            </div>
          </div>
        </div>
      </div>
      {
        cartMessageStatus && <CartMessage/>
      }
    </main>
  )
}

export default ProductSingle