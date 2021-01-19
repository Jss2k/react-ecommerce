import React from 'react'
import Button from './../../forms/Button'

const Product = ({ 
  productThumbnail,
  productName,
  productPrice
 }) => {
  if (!productThumbnail || !productName ||
    typeof productPrice === 'undefined') return null

    const configAddToCardBtn = {
      type: 'button'
    }

  return (
    <div className="products__card card">
      <div className="card__thumb">
        <img src={productThumbnail} alt={productName} />
      </div>

      <div className="card__body">
        <ul>
          <li>
            <span className="card__name">
              {productName}
            </span>
          </li>
          <li>
            <span className="card__price">
              ${productPrice}
            </span>
          </li>
          <li>
            <Button {...configAddToCardBtn}>
              Add to card
            </Button>
          </li>
        </ul>
      </div>
    </div>
  )
}

export default Product
