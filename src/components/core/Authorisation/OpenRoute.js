import { useSelector } from "react-redux"
import { Navigate } from "react-router-dom"

function OpenRoute({ children }) {
    const { token } = useSelector((state) => state.auth)
    //Only allow un-registered users to get here.
    if (token === null) {
        return children
    } else {
        return <Navigate to="/dashboard/my-profile" />
    }
}

export default OpenRoute