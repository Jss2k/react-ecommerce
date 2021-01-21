import React from 'react'
import { Link, useHistory } from 'react-router-dom'
import Button from './../../forms/Button'
import { useDispatch } from 'react-redux'
import { addProduct } from './../../../redux/Cart/cart.actions'

const Product = (product) => {
  const dispatch = useDispatch()
  const history = useHistory()
  const {
    documentID,
    productThumbnail,
    productName,
    productPrice
  } = product

  if (!documentID || !productThumbnail || !productName ||
    typeof productPrice === 'undefined') return null

    const configAddToCardBtn = {
      type: 'button'
    }

  const handleAddToCart = (product) => {
    if (!product) return;
     dispatch(
      addProduct(product)
    )
    history.push('/cart')
  }

  return (
    <div className="products__card card">
      <div className="card__thumb">
        <Link to={`/product/${documentID}`} >
          <img src={productThumbnail} alt={productName} />
        </Link>
      </div>

      <div className="card__body">
        <ul>
          <li>
            <span className="card__name">
              <Link to={`/product/${documentID}`}>
                {productName}
              </Link>
            </span>
          </li>
          <li>
            <span className="card__price">
              ${productPrice}
            </span>
          </li>
          <li>
            <Button {...configAddToCardBtn} onClick={() => handleAddToCart(product)}>
              Add to card
            </Button>
          </li>
        </ul>
      </div>
    </div>
  )
}

export default Product
