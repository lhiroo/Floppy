import supabase from "../config/config"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import SmoothieCard from "../components/SmoothieCard"

const Home = ({ token, setToken }) => {
  const navigate = useNavigate()
  const [fetchError, setFetchError] = useState(null)
  const [smoothies, setSmoothies] = useState(null)
  const [orderBy, setOrderBy] = useState('created_at')
  const [logoutError, setLogoutError] = useState(null)

  useEffect(() => {
    if (!token) {
      navigate("/login");
    }
  }, [token, navigate]);

  useEffect(() => {
    const fetchSmoothies = async () => {
      const { data, error } = await supabase
        .from('Smoothies')
        .select()
        .order(orderBy, { ascending: orderBy === 'title' })

      if (error) {
        setFetchError('Could not fetch')
        setSmoothies(null)
        console.log(error)
      }
      if (data) {
        setSmoothies(data)
        setFetchError(null)
      }
    }
    fetchSmoothies()
  }, [orderBy])

  const handleDelete = (id) => {
    setSmoothies(prevSmoothies => {
      return prevSmoothies.filter(smoothie => smoothie.id !== id)
    })
  }

  const logout = async () => {
    const { error } = await supabase.auth.signOut()
    if (error) {
      setLogoutError('An error occured')
      return;
    }
    setToken(null)
    navigate('/login')
  }

  return (
    <div className="page home">
      <h3>Hello {token ? token.user.user_metadata.full_name : ""}</h3>
      {fetchError && <p>{fetchError}</p>}
      {smoothies && (
        <div className='smoothies'>
          <div className='order-by'>
            <p>Order by: </p>
            <button onClick={() => setOrderBy('created_at')}>created_at</button>
            <button onClick={() => setOrderBy('title')}>title</button>
            <button onClick={() => setOrderBy('rating')}>rating</button>
          </div>
          <div className="smoothie-grid">
            {smoothies.map(smoothie => (
              <SmoothieCard key={smoothie.id} smoothie={smoothie} onDelete={handleDelete} />
            ))}
          </div>
        </div>
      )}
      <br/>
      <button className='logout-btn' onClick={logout}>Log Out</button>
      {logoutError && <p className="error">{logoutError}</p>}
    </div>
  )
}

export default Home