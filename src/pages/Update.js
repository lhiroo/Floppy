import { useParams, useNavigate } from "react-router-dom"
import { useState, useEffect } from 'react'
import supabase from "../config/config"

const Update = () => {
  const { id } = useParams()
  const navigate = useNavigate()

  const [title, setTitle] = useState('')
  const [method, setMethod] = useState('')
  const [rating, setRating] = useState('')
  const [formError, setFormError] = useState(null)

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!title || !method || !rating) {
      setFormError('Fill in all the fields')
      return
    }

    const { error } = await supabase.from('Smoothies').update([{title, method, rating}]).eq('id', id).single()

    if (error) {
      setFormError('An error occured')
      return
    }

      setFormError(null)
      navigate('/')

  }

  useEffect(() => {
    const fetchSmoothie = async () => {
      const { data, error } = await supabase.from('Smoothies').select().eq('id', id).single()

      if(error) {
        navigate('/', {replace: true})
      }
      if(data) {
        setTitle(data.title)
        setMethod(data.method)
        setRating(data.rating)
      }
    }

    fetchSmoothie()

  }, [id, navigate])

  return (
    <div className="page update">
      <form onSubmit={(e) => handleSubmit(e) }>
        <label htmlFor="title">Title:</label>
        <input 
          type="text" 
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <label htmlFor="method">Content:</label>
        <textarea 
          id="method"
          value={method}
          onChange={(e) => setMethod(e.target.value)}
        />

        <label htmlFor="rating">Rating:</label>
        <input 
          type="number"
          id="rating"
          value={rating}
          onChange={(e) => setRating(e.target.value)}
        />

        <button>Update Floppy</button>

        {formError && <p className="error">{formError}</p>}
      </form>
    </div>
  )
}

export default Update