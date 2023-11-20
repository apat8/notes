import { Button } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useLogoutMutation } from "../slices/usersApiSlice";
import { logout } from "../slices/authSlice";

const MainScreen = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    
    const [ logoutMutation ] = useLogoutMutation();

    const logoutHandler =  async () => {
        try {
            await logoutMutation().unwrap();
            dispatch(logout());
            navigate('/login');
        } catch (err) {
            console.log(err);
        }
    }

    return(
        <>
            <h1>MainScreen</h1>
            <Button onClick={logoutHandler}>Logout</Button>
        </>
    )
}

export default MainScreen;