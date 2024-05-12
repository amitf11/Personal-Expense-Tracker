import { useState } from 'react';
import { userService } from "../services/user.service";

export const useLoggedInUser = () => {
    const [loggedInUserData, setLoggedInUserData] = useState(userService.getLoggedinUser());

    return [loggedInUserData, setLoggedInUserData];
};