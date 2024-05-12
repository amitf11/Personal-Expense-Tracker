export function LoginSignup() {
    return (
        <>
            <h1>Hello From Login Form</h1>
            <section className="loginsignup-form">
                <form className="flex column">
                    <div className="flex column form-input-container">
                        <div>Email Address</div>
                        <div>
                            <input type="email" placeholder="Username@gmail.com" />
                        </div>
                    </div>

                    <div className="flex column form-input-container">
                        <div>Password</div>
                        <input type="password" placeholder="············" />
                    </div>

                    <button className="login-btn">Login</button>
                    <footer className="flex space-between">
                        <button>Sign up</button>
                        <button>Forgot Password?</button>
                    </footer>
                </form>
            </section>
        </>
    )
}