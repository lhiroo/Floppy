import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import supabase from "../config/config";

const Create = ({ token }) => {
  const navigate = useNavigate()

  const [title, setTitle] = useState('')
  const [method, setMethod] = useState('')
  const [rating, setRating] = useState('')
  const [formError, setFormError] = useState(null)

  useEffect(() => {
      if (!token) {
        navigate("/login");
      }
    }, [token, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!title || !method || !rating) {
      setFormError('Fill in all the fields')
      return
    }

    const user_id = token.user.id

    const { error } = await supabase.from('Smoothies').insert([{title, method, rating, user_id}])

    if (error) {
      setFormError('An error occured')
      return
    }

      setFormError(null)
      navigate('/')

  }

  return (
    <div className="page create">
      <form onSubmit={handleSubmit}>
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

        <button>Create Floppy</button>

        {formError && <p className="error">{formError}</p>}
      </form>
    </div>
  )
}

export default Create