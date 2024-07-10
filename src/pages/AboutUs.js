import HighLightText from '../components/core/Homepage/HighLightText'
import AboutUs1 from '../assets/Images/aboutus1.avif';
import AboutUs2 from '../assets/Images/aboutus2.avif';
import AboutUs3 from '../assets/Images/aboutus3.avif';
import Founding from '../assets/Images/FoundingStory.avif';
import './pages.css'
import CTAButton from '../components/core/Homepage/Buttons';
import ContactUsForm from '../components/core/ContactPage/ContactUsForm';
import Footer from '../components/common/Footer';


const AboutUs = () => {
    return (
        <div className='flex flex-col w-screen min-h-screen items-center sm:mt-8'>
            <div className='relative w-full mb-64 sm:mb-48 h-[66vh] bg-richblack-800 light-bg flex justify-center items-center flex-col overflow-visible'>
                <div className='w-7/12 sm:w-full overflow-hidden' data-aos="zoom-out-down" data-aos-easing="ease-in-out">
                    <h1 className='text-4xl text-white p-3 font-bold'>Driving Innovation in Online Education for a <HighLightText text="Brighter Future"/></h1>
                    <p className='text-zinc-500 flex items-center p-1 justify-center sm:px-4'>Knowledge Bridge is at the forefront of driving innovation in online education. We're passionate about creating a brighter future by offering cutting-edge courses, leveraging emerging technologies, and nurturing a vibrant learning community.</p>
                </div>
                <div className='flex absolute w-full justify-center items-center top-[73%] sm:top-[91%] gap-8 sm:gap-3 px-32 sm:px-2'>
                    <div className='w-[33%]' data-aos="zoom-in-right" data-aos-easing="ease-in-out" data-aos-duration="1000"><img src={AboutUs1} alt=''className='rounded-3xl' /></div>
                    <div className='w-[33%]' data-aos="zoom-in-right" data-aos-easing="ease-in-out" data-aos-duration="1600"><img src={AboutUs2} alt=''className='rounded-3xl'/></div>
                    <div className='w-[33%]' data-aos="zoom-in-right" data-aos-easing="ease-in-out" data-aos-duration="2200"><img src={AboutUs3} alt=''className='rounded-3xl'/></div>
                </div>
            </div>
            <div className='w-9/12 sm:w-11/12 sm:p-0 p-2 mb-20'>
                <h3 className='text-3xl sm:text-2xl text-white'>We are passionate about revolutionizing the way we learn. 
                    Our innovative platform combines <HighLightText text="technology" />, <span className='bg-gradient-to-r from-[#f093fb] to-[#f5576c] text-transparent bg-clip-text font-bold'>expertise</span>, and <span className='bg-gradient-to-r from-[#f093fb] to-[#f5576c] text-transparent bg-clip-text font-bold'>community</span> to create an unparalleled <HighLightText text="educational experience" />.
                </h3>
            </div>
            <div className='flex w-9/12 justify-between items-center sm:w-full sm:flex-col-reverse'>
                <div className='w-[50%] sm:w-[100%] flex justify-center flex-col p-6 gap-8'>
                    <h1 className='p-2 bg-gradient-to-r from-[#f093fb] to-[#f5576c] text-transparent bg-clip-text font-bold text-4xl' data-aos="fade-up" data-aos-easing="ease-in-out">Our Founding Story</h1>
                    <div className='flex flex-col gap-4'>
                        <p className='text-zinc-500 font-medium'>Our e-learning platform was born out of a shared vision and passion for transforming education. It all began with a group of educators, technologists, and lifelong learners who recognized the need for accessible, flexible, and high-quality learning opportunities in a rapidly evolving digital world.</p>
                        <p className='text-zinc-500 font-medium'>As experienced educators ourselves, we witnessed firsthand the limitations and challenges of traditional education systems. We believed that education should not be confined to the walls of a classroom or restricted by geographical boundaries. We envisioned a platform that could bridge these gaps and empower individuals from all walks of life to unlock their full potential.</p>
                    </div>
                </div>
                <div className='w-[50%] sm:w-[100%] p-12 sm:p-4' data-aos="fade-up" data-aos-easing="ease-in-out"><img src={Founding} alt='' className='rounded-3xl'/></div>
            </div>
            <div className='flex w-9/12 justify-between items-center gap-32 p-4 mt-24 sm:mt-4 sm:flex-col sm:gap-12 sm:w-full'>
                <div className='flex justify-center items-center flex-col gap-6 sm:gap-3' data-aos="fade-up" data-aos-easing="ease-in-out">
                    <h1 className='p-2 font-bold text-4xl bg-gradient-to-r from-[#f093fb] to-[#f5576c] text-transparent bg-clip-text'>Our Vision</h1>
                    <p className=' text-zinc-500 font-medium justify-center flex items-center p-2'>With this vision in mind, we set out on a journey to create an e-learning platform that would revolutionize the way people learn. Our team of dedicated experts worked tirelessly to develop a robust and intuitive platform that combines cutting-edge technology with engaging content, fostering a dynamic and interactive learning experience.</p>
                </div>
                <div className='flex justify-center items-center flex-col gap-6' data-aos="fade-up" data-aos-easing="ease-in-out">
                    <h1 className='p-2 font-bold text-4xl'><HighLightText text="Our Mission" /></h1>
                    <p className='p-2 text-zinc-500 font-medium'>Our mission goes beyond just delivering courses online. We wanted to create a vibrant community of learners, where individuals can connect, collaborate, and learn from one another. We believe that knowledge thrives in an environment of sharing and dialogue, and we foster this spirit of collaboration through forums, live sessions, and networking opportunities.</p>
                </div>
            </div>
            <div className='w-screen light-bg2 mt-40 flex justify-evenly py-16 sm:py-8'  data-aos="zoom-in" data-aos-easing="ease-in-out">
                <div className='flex items-center flex-col sm:w-[25%]'>
                    <h4 className='text-white text-4xl sm:text-2xl font-bold p-2'>5K</h4> 
                    <p className='text-zinc-400 text-center text-xl sm:text-base font-semibold sm:flex-wrap flex'>Active Students</p>
                </div>
                <div className='flex items-center flex-col'>
                    <h4 className='text-white text-4xl sm:text-2xl font-bold p-2'>10 +</h4> 
                    <p className='text-zinc-400 text-xl sm:text-base font-semibold'>Mentors</p>
                </div>
                <div className='flex items-center flex-col'>
                    <h4 className='text-white text-4xl sm:text-2xl font-bold p-2'>200 +</h4> 
                    <p className='text-zinc-400 text-xl sm:text-base font-semibold'>Courses</p>
                </div>
                <div className='flex items-center flex-col'>
                    <h4 className='text-white text-4xl sm:text-2xl font-bold p-2'>50 +</h4> 
                    <p className='text-zinc-400 text-xl sm:text-base font-semibold'>Awards</p>
                </div>
            </div>
            <div className='w-10/12 flex flex-col h-[90vh] mt-40 sm:h-max sm:w-full'>
                <div className='flex h-[50%] sm:flex-col sm:h-max sm:items-center sm:justify-center'>
                    <div className='w-[50%] sm:w-11/12 sm:rounded-xl flex flex-col p-3 gap-1 sm:mb-4' data-aos="zoom-in" data-aos-easing="ease-in-out">
                        <h1 className='text-white font-bold text-4xl sm:text-3xl p-4 sm:p-1'>World-class learning for <HighLightText text='Anyone'/>, from <HighLightText text='Anywhere' /></h1>
                        <p className='text-lg font-semibold text-zinc-500 sm:text-base'>Knowledge Bridge partners with more than 275+ leading universities and companies to bring flexible, affordable, job-relevant online learning to individuals and organizations worldwide.</p>
                        <div className='w-[25%] sm:w-[40%]'><CTAButton className='w-' active={true} linkto={"/signup"}>Learn more</CTAButton></div>
                    </div>
                    <div className='w-[25%]  sm:w-11/12 sm:rounded-xl flex-col flex justify-center p-4 gap-8 sm:gap-2 bg-richblack-600' data-aos="zoom-in" data-aos-easing="ease-in-out">
                        <h3 className='text-white text-xl sm:text-lg'>Curriculum Based on Industry Needs</h3>
                        <p className='text-zinc-400 sm:text-sm'>Save time and money! The Belajar curriculum is made to be easier to understand and in line with industry needs.</p>
                    </div>
                    <div className='w-[25%]  sm:w-11/12 sm:rounded-xl bg-richblack-800 flex-col flex justify-center p-4 gap-8 sm:gap-2' data-aos="zoom-in" data-aos-easing="ease-in-out">
                        <h3 className='text-white text-xl sm:text-lg'>Curriculum Based on Industry Needs</h3>
                        <p className='text-zinc-400 sm:text-sm'>Save time and money! The Belajar curriculum is made to be easier to understand and in line with industry needs.</p>
                    </div>
                </div>
                <div className='flex h-[50%] sm:flex-col sm:items-center sm:justify-center'>
                    <div className='w-[25%] sm:opacity-0'></div>
                    <div className='w-[25%]  sm:w-11/12 sm:rounded-xl flex-col flex justify-center p-4 gap-8 sm:gap-2 bg-richblack-600' data-aos="zoom-in" data-aos-easing="ease-in-out">
                        <h3 className='text-white text-xl sm:text-lg'>Certification</h3>
                        <p className='text-zinc-400 sm:text-sm'>Knowledge Bridge partners with more than 275+ leading universities and companies to bring.</p>
                    </div>
                    <div className='w-[25%]  sm:w-11/12 sm:rounded-xl  bg-richblack-800 flex-col flex justify-center p-4 gap-8 sm:gap-2' data-aos="zoom-in" data-aos-easing="ease-in-out">
                        <h3 className='text-white text-xl sm:text-lg '>Curriculum Based on Industry Needs</h3>
                        <p className='text-zinc-400 sm:text-sm'>Save time and money! The Belajar curriculum is made to be easier to understand and in line with industry needs.</p>
                    </div>
                    <div className='w-[25%]  sm:w-11/12 sm:rounded-xl  flex-col flex justify-center p-4 gap-8 sm:gap-2 bg-richblack-600' data-aos="zoom-in" data-aos-easing="ease-in-out">
                        <h3 className='text-white text-xl sm:text-lg'>Ready to work</h3>
                        <p className='text-zinc-400 sm:text-sm'>Knowledge Bridge partners with more than 275+ leading universities and companies to bring</p>
                    </div>
                </div>
            </div>
            {/*Contact-us Form*/}
            <ContactUsForm heading={"Get in Touch"} description={"We'd love to here for you. Please fill out this form."}  data-aos="zoom-in" data-aos-easing="ease-in-out"/>
            <Footer />
        </div>
    )
}

export default AboutUs
