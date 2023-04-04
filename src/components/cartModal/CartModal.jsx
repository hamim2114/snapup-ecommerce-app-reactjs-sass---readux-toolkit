import './cartModal.scss';
import { formatPrice } from '../../utils/formatPrice';
import { Link } from 'react-router-dom';

const CartModal = ({ carts }) => {
   return (
      <div className='cart-modal'>
         <div className='cart-modal-title fs-15 fw-5 text-center'>
            Recently Added Products
         </div>
         {carts.length > 0 ? (
          <div>
            <div className='cart-modal-list grid'>
               {carts.map((item) => (
                  <div key={item.id} className='cart-modal-item grid align-center py-2'>
                    <div className="cart-modal-item-img">
                      <img src={item?.thumbnail} alt="" className="img-cover" />
                    </div>
                    <div className="cart-modal-item-title fs-13 text-capitalize">{item?.title}</div>
                    <div className="cart-modal-item-price text-orange fs-14 fw-6">{formatPrice(item?.discountPrice)}</div>
                  </div>
               ))}
            </div>
            <Link to='/cart'>
              <div className="view-cart-btn bg-orange fs-15 text-center">view my shopping cart</div>
            </Link>
            </div>
         ) : (
            <div className='flex flex-column align-center justify-center cart-modal-empty'>
               <img src='shopping_cart.png' alt='' />
               <h6 className='text-dark fw-4'>No Products</h6>
            </div>
         )}
      </div>
   );
};

export default CartModal;
