import React from 'react'
import AddUser from './componets/AddUser'
import Catalog from './componets/Catalog'

const App = () => {
  return (
    <div className='max-w-6xl mx-auto p-6'>
      <h1 className='text-3xl font-bold mb-6'>Crud</h1>

      <AddUser/>
      <Catalog/>
    </div>
  )
}

export default App
