import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import supabase from "../config/config";

const SignUp = ({ token }) => {
    const navigate = useNavigate()

    const [fullName, setFullName] = useState('')
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

        const { data, error } = await supabase.auth.signUp({
            email: email,
            password: password,
            options: {
                data: {
                    full_name: fullName,
                }
            }
        })

        if (error) {
            setFormError('An error occured')
        }
        if (data) {
            alert('Confirm your email then login')
            navigate('/login')
        }
    }
    


    return (
        <div>
            <form onSubmit={handleSubmit}>
                <h3>Sign-up page</h3>
                <br/>
                <label htmlFor='fullName'> FullName: </label>
                <input
                    required
                    type='text'
                    name="fullName"
                    id="fullName"
                    placeholder="fullName"
                    onChange={(e) => setFullName(e.target.value)}
                />

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

                <button>Sign up now</button>
                {formError && <p className="error">{formError}</p>}
                <br/>
                <p>Already have an account ? <Link to='/login'>Login</Link></p>
            </form>
        </div>
    )
}

export default SignUp