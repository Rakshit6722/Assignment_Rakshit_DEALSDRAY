import React from 'react'
import Form from '../components/common/Form'
import { useParams } from 'react-router-dom'

const EditEmployee = () => {
  
  return (
    <div>
        <p className='p-2 bg-yellow-300'>Employee Edit</p>
        <Form/>
    </div>
  )
}

export default EditEmployee