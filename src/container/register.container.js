import { useState } from 'react'

const registerContainer = () => {
  const initialState = {
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
  }
  const [formData, setFormData] = useState(initialState)

  const handleChange = e => {
    const { name, value } = e.target
    setFormData(prevData => ({
      ...prevData,
      [name]: value,
    }))
  }

  const handleSubmit = e => {
    e.preventDefault()
    setFormData(initialState)
  }

  return { formData, handleChange, handleSubmit }
}

export default registerContainer
