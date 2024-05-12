import { useState } from "react";
import { LoginSignup } from "../cmps/LoginSignup";
import { ExpenseIndex } from "../cmps/ExpenseIndex";
import { userService } from "../services/user.service";
import { useLoggedInUser } from "../custom hooks/loggedinUser";

export function HomePage() {
    const [isSignUp, setIsSignUp] = useState(false)
    const [loggedInUser, setloggedInUser] = useLoggedInUser()

    function onLogin(credentials) {
        isSignUp ? _signup(credentials) : _login(credentials)
    }

    function onLogout() {
        userService.logout()
            .then(setloggedInUser(null))
    }

    function _login(credentials) {
        userService.login(credentials)
            .then(setloggedInUser)
    }

    function _signup(credentials) {
        userService.signup(credentials)
            .then(setloggedInUser)
    }

    return (
        <section className="homepage">
            {(loggedInUser) ?
                <>
                    <h1>Hello {loggedInUser.fullname}</h1>
                    <button onClick={() => onLogout()}>Log Out</button>
                    <ExpenseIndex />
                </>
                : <LoginSignup
                    onLogin={onLogin}
                    isSignUp={isSignUp}
                    setIsSignUp={setIsSignUp} />}
        </section>
    )
}