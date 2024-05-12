import { useState } from "react";
import { LoginSignup } from "../cmps/LoginSignup";
import { ExpenseIndex } from "../cmps/ExpenseIndex";
import { userService } from "../services/user.service";
import { AppHeader } from "../cmps/AppHeader";

export function HomePage() {
    const [isSignUp, setIsSignUp] = useState(false)
    const [loggedInUser, setloggedInUser] = useState(userService.getLoggedinUser())

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
        <>
            {(loggedInUser) ?
                <>
                    <header>
                        <AppHeader
                            loggedInUser={loggedInUser}
                            onLogout={onLogout}
                        />
                    </header>
                    <section className="homepage">
                        <ExpenseIndex />
                    </section>
                </>
                : <LoginSignup
                    onLogin={onLogin}
                    isSignUp={isSignUp}
                    setIsSignUp={setIsSignUp} />}
        </>
    )
}