import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import  { getProduct } from "./componnent/ProductSlice"

const App = () => {
  let { data, loading, error} = useSelector(state=>state.data)
  let dispatch = useDispatch()
  useEffect(()=> {
    dispatch(getProduct())
  })
  return (
    <div>
      {data.map((product) => {
        <div key={product.id}>
          <img src={product.image} alt={product.name} />
          <h2>{product.name}</h2>
          <p>{product.email}</p>
          <p>{product.phone}</p>
          <p>{product.status? "Active" : "Inactive"}</p>
        </div>
      }) }
    </div>
  )
}

export default App
