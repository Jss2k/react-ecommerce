import { combineReducers } from 'redux'

import userReducer from './User/user.reducer'
import productsReducer from './Products/products.reducer'
import productsTypes from './Products/products.types'

export default combineReducers({
  user: userReducer,
  productsData: productsReducer
})

export const fetchProductsStart = () => ({
  type: productsTypes.FETCH_PRODUCTS_START
})

export const setProducts = products => ({
  type: productsTypes.SET_PRODUCTS,
  payload: products
})