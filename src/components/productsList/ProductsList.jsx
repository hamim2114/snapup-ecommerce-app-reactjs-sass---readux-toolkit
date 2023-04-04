import './products-list.scss'
import Product from '../product/Product';

const ProductsList = ({products}) => {
  return (
    <div className="products-list grid bg-whitesmoke my-3">
      {
        products.map(product => {
          let discountedPrice = (product.price) - (product.price) * (product.discountPercentage / 100);
          return (
            <Product key={product.id} product = {{...product, discountedPrice}} />
          )
        })
      }
    </div>
  )
}

export default ProductsList