
// This will prevent non-authenticated users from accessing this route
import { useSelector } from "react-redux"
import { Navigate } from "react-router-dom"

function PrivateRoute({ children }) {
    const { token } = useSelector((state) => state.auth)
    // Extracts the token from the local storage
    if (token !== null) { //If it's present then return the children component
        return children
    } else { //otherwise redirect to login page
        return <Navigate to="/login" />
    }
}

export default PrivateRoute
