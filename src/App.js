//import logo from './logo.svg';
import './App.css';
import { Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import NavBar from './components/common/NavBar';
import Login from './pages/Login';
import SignUp from './pages/SignUp';
import Error from './pages/Error';
import ForgotPassword from './pages/ForgotPassword';
import OpenRoute from './components/core/Authorisation/OpenRoute';
import UpdatePassword from './pages/UpdatePassword';
import VerifyEmail from './pages/VerifyEmail';
import AboutUs from './pages/AboutUs';
import ContactUs from './pages/ContactUs';
import Dashboard from './pages/Dashboard';
import PrivateRoute from './components/core/Authorisation/PrivateRoute';
import MyProfile from './components/core/Dashboard.js/MyProfile';
import Settings from './components/core/Dashboard.js/Settings';
import EnrolledCourses from './components/core/Dashboard.js/EnrolledCourses';
import Cart from './components/core/Cart/index';
import { ACCOUNT_TYPE } from './utils/constants';
import { useSelector } from 'react-redux';
import EditCourse from "./components/core/Dashboard.js/EditCourse.js/index"
import Instructor from "./components/core/Dashboard.js/Instructor"
import MyCourses from "./components/core/Dashboard.js/MyCourses"
import AddCourse from './components/core/Dashboard.js/AddCourse/index'
import Catalog from './pages/Catalog';
import Intro from './components/core/Catalog/intro'
import CourseDetails from './pages/CourseDetails';
import ViewCourse from './pages/ViewCourse';
import VideoDetails from './components/core/ViewCourse/VideoDetails';
import { useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';

function App() {
    const { user } = useSelector((state) => state.profile) 

    useEffect(() => {
        AOS.init({
            duration:600,
        })
    }, [])
    return ( 
        <div className="relative flex flex-col items-center w-screen min-h-screen bg-richblack-900">
            <NavBar />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<OpenRoute> <Login /></OpenRoute>} />
                <Route path="/signup" element={<SignUp />} />
                <Route path="/about" element={<AboutUs />} />
                <Route path="/contact" element={<ContactUs />} /> 
                <Route path="/catalog" element={<Intro />} />
                <Route path="catalog/:catalogName" element={<Catalog />} />
                <Route path="courses/:courseId" element={<CourseDetails />} />
                <Route path="/dashboard" element={<PrivateRoute><Dashboard /></PrivateRoute>} />
                <Route path="/forgot-password" element={<OpenRoute> <ForgotPassword /></OpenRoute>} />
                <Route path="/update-password/:id" element={<OpenRoute> <UpdatePassword /></OpenRoute>} />
                <Route path="/verify-email" element={<OpenRoute> <VerifyEmail /></OpenRoute>} />
                {/* For all users */}
                <Route path="/dashboard/my-profile" element={<PrivateRoute><MyProfile /></PrivateRoute>} />
                <Route path="/dashboard/settings" element={<PrivateRoute><Settings /></PrivateRoute>} />
                {/* Path for Students*/}
                {
                    user?.accountType === ACCOUNT_TYPE.STUDENT && (
                        <>
                            <Route path="dashboard/enrolled-courses" element={<PrivateRoute><EnrolledCourses /></PrivateRoute>} />
                            <Route path="dashboard/cart" element={<PrivateRoute><Cart /></PrivateRoute>} />
                            
                        </>
                    )
                }
                {/* Path for Instructors*/}
                {
                    user?.accountType === ACCOUNT_TYPE.INSTRUCTOR && (
                        <>
                            <Route path="dashboard/instructor" element={<Instructor />} />
                            <Route path="dashboard/my-courses" element={<MyCourses />} />
                            <Route path="dashboard/createCourse" element={<AddCourse />} />
                            <Route path="dashboard/edit-course/:courseId" element={<EditCourse />}/>
                        </>
                    )
                }
                {/**For watching course-lectures */}
                <Route element={<PrivateRoute><ViewCourse /></PrivateRoute>}>
                    {user?.accountType === ACCOUNT_TYPE.STUDENT && (
                        <Route path="view-course/:courseId/section/:sectionId/sub-section/:subSectionId" element={<VideoDetails />} />
                    )}
                </Route>
                <Route path="*" element={<Error />} />
            </Routes>   
        </div>
    );
}

export default App;
