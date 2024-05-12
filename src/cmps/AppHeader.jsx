import LogoutIcon from '@mui/icons-material/Logout';
import { userService } from "../services/user.service";

export function AppHeader({ onLogout, loggedInUser }) {

    return (
        <header>
            <section className="flex align-center space-between header-container">
                <h3 className="logo">LOGO</h3>
                {loggedInUser && <div className="flex align-center user-details">
                    <h4>Hello, {loggedInUser.fullname}</h4>
                    <LogoutIcon
                        sx={{ cursor: 'pointer' }}
                        onClick={() => onLogout()} />
                </div>}
            </section>
        </header>
    )
}