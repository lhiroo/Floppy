import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import supabase from "../config/config";

const Login = ({ token, setToken }) => {
    const navigate = useNavigate()

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [formError, setFormError] = useState(null)

    useEffect(() => {
        if (token) {
          navigate("/");
        }
      }, [token, navigate]);

    const handleSubmit = async (e) => {
        e.preventDefault()

        const { data, error } = await supabase.auth.signInWithPassword({
            email: email,
            password: password,
        })

        if (error) {
            console.log(error)
            setFormError('An error occured')
        }
        if (data) {
            const { data, error } = await supabase.auth.getClaims()
            if (data) {
                if (localStorage.getItem('sb-lfloccrnumfnzezfgitu-auth-token')) {
                    let data = JSON.parse(localStorage.getItem('sb-lfloccrnumfnzezfgitu-auth-token'))
                    setToken(data)
                    navigate('/')
                }
            }
            if (error) {
                alert(error)
            }
            
        }
    }
    


    return (
        <div>
            <form onSubmit={handleSubmit}>
                <h3>Login page</h3>
                <br/>
                <label htmlFor='email'> E-mail: </label>
                <input
                    required
                    type='text'
                    name="email"
                    id="email"
                    placeholder="Your email"
                    onChange={(e) => setEmail(e.target.value)}
                />

                <label htmlFor='password'> Password: </label>
                <input
                    required
                    type='password'
                    name="password"
                    id="password"
                    placeholder="Password"
                    onChange={(e) => setPassword(e.target.value)}
                />

                <button>Login now</button>
                {formError && <p className="error">{formError}</p>}
                <br/>
                <p>Haven't created an account yet ? <Link to='/signUp'>Sign up</Link></p>
            </form>
        </div>
    )
}

export default Login