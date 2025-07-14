import { useLocation, matchPath } from "react-router-dom";

export default function RouteMatch(path) {
    const location = useLocation();
    // Helper function to check whetehr URL pathname matches a given route
    return matchPath(location.pathname, path ); 
}