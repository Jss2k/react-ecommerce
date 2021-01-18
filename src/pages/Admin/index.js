import React, { useState,useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
// import { firestore } from './../../firebase/utils'
import { addProductStart, fetchProductsStart, deleteProductsStart } from './../../redux/Products/products.actions'

import Modal from './../../components/Modal'
import FormInput from './../../components/forms/FormInput'
import Button from './../../components/forms/Button'
import FormSelect from './../../components/forms/FormSelect'
import './styles.scss'

const mapState = ({ productsData }) => ({
  products: productsData.products
})

const Admin = props => {
  const { products } = useSelector(mapState)
  const dispatch = useDispatch()
  // const [products, setProducts] = useState([])
  const [hideModal, setHideModal] = useState(true)
  const [productCategory, setProductCategory] = useState('mens')
  const [productName, setProductName] = useState('')
  const [productThumbnail, setProductThumbnail]= useState('')
  const [productPrice, setProductPrice]= useState(0)
  
  useEffect(() => {
    dispatch(
    fetchProductsStart()
    )

  }, [])

  const toggleModal = () => setHideModal(!hideModal)
 
  const configModal = {
    hideModal,
    toggleModal
  }

  const resetForm = () => {
    setHideModal(true)
    setProductCategory('mens')
    setProductName('')
    setProductThumbnail('')
    setProductPrice(0)
  }

  // useEffect(() => {
  //   firestore.collection('products').get().then(snapshot => {
  //     const snapshotData = snapshot.docs.map(doc => doc.data());
  //     setProducts(snapshotData);
  //   });
  // }, []);

  const handleSubmit = e => {
  

    dispatch(
      addProductStart({
        productCategory,
        productName,
        productThumbnail,
        productPrice
      })
    )
    resetForm()
  }

  // firestore.collection('products').doc().set({
  //   productCategory,
  //   productName,
  //   productThumbnail,
  //   productPrice
  // }).then(e => {

  // });

  return (
    <div>

      <div className="callToActions">
        <ul>
          <li>
            <Button onClick={() => toggleModal()}>
              Add new product
            </Button>
          </li>
        </ul>
      </div>

      <Modal {...configModal}>
        <div className="addNewProductForm">
          <form onSubmit={handleSubmit}>
            <h2>
              Add new product
            </h2>

            <FormSelect
              label="Category"
              options={[{
                value: "mens",
                name: "Mens"
              }, {
                value: "womens",
                name: "Womens"
              }]}
              handleChange={e => setProductCategory(e.target.value)}
            />
            <FormInput
              label="name"
              type="text"
              name="productName"
              value={productName}
              placeholder="Product Name"
              handleChange={e => setProductName(e.target.value)}
            />

            <FormInput
              label="Main image URL"
              type="url"
              value={productThumbnail}
              // placeholder="Product Image URL"
              handleChange={e => setProductThumbnail(e.target.value)}
            />

            <FormInput
              label="Price"
              type="number"
              min="0.00"
              max="10000.00"
              step="0.01"
              name="productPrice"
              value={productPrice}
              placeholder="Price"
              handleChange={e => setProductPrice(e.target.value)}
            />

            <Button type="submit">
              Add product
            </Button>

          </form>
        </div>
      </Modal>
      <div className="manageProducts">
        <table border="0" cellPadding="0" cellSpacing="0">
          <tbody>
            <tr>
              <th>
                <h1>
                  Manage Products
                </h1>
              </th>
            </tr>
            <tr>
              <td>
                <table className="results" border="0" cellPadding="10" cellSpacing="0">
                  <tbody>
                    {products.map((product, index) => {
                      const {
                        productName,
                        productThumbnail,
                        productPrice,
                        documentID
                      } = product;

                      return (
                        <tr key={index}>
                          <td>
                            <img className="thumb" src={productThumbnail} alt={productName}/>
                          </td>
                          <td>
                            {productName}
                          </td>
                          <td>
                            ${productPrice}
                          </td>
                          <td>
                            <Button onClick={() => dispatch(deleteProductsStart(documentID))}>
                              Delete
                            </Button>
                          </td>
                        </tr>
                      )
                    })}
                  </tbody>
                </table>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default Admin