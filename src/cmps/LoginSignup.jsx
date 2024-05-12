import { useState } from "react"
import { userService } from "../services/user.service"

export function LoginSignup({isSignUp, setIsSignUp, onLogin}) {
    const [credentials, setCredentials] = useState(userService.getEmptyCredentials())

    function handleChange({ target }) {
        const { name: field, value } = target
        setCredentials(prevCreds => ({ ...prevCreds, [field]: value }))
    }

    function handleSubmit(ev) {
        ev.preventDefault()
        onLogin(credentials)
    }


    return (
        <>
            <section className="loginsignup-form">
            <h1>{isSignUp ? 'Sign Up' : 'Login'}</h1>
                <form className="flex column" onSubmit={handleSubmit}>
                    <div className="flex column form-input-container">
                        <div>Email Address</div>
                        <div>
                            <input 
                                type="text" 
                                name="username"
                                onChange={handleChange}
                                value={credentials.username}
                                required
                                placeholder="Username@gmail.com"
                                 />
                        </div>
                    </div>

                    <div className="flex column form-input-container">
                        <div>Password</div>
                        <input
                        type="password" 
                        name="password"
                        onChange={handleChange}
                        value={credentials.password}
                        required
                        placeholder="············"
                         />
                    </div>

                    {isSignUp && <div className="flex column form-input-container">
                        <div>Full Name</div>
                        <input
                            type="text"
                            name="fullname"
                            value={credentials.fullname}
                            onChange={handleChange}
                            required
                            placeholder="Israel Israeli"
                             />
                    </div>}

                    {!isSignUp && <button className="login-btn">Login</button>}
                    {isSignUp && <button className="login-btn">Sign Up</button>}
                    
                    <footer className="flex space-between">
                        <button onClick={(ev) => {
                            ev.preventDefault()
                            setIsSignUp(!isSignUp)}}>{isSignUp ? 'Login' : 'Sign Up'}</button>
                        <button>Forgot Password?</button>
                    </footer>
                </form>
            </section>
        </>
    )
}