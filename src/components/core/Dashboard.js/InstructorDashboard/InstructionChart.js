import { useState } from "react"
import { Chart, registerables } from "chart.js"
import { Pie } from "react-chartjs-2"

Chart.register(...registerables)

const InstructorChart = ({courses}) => {
    // State to keep track of the currently selected chart
    const [currChart, setCurrChart] = useState("students")

    // Function to generate random colors for the chart
    const generateRandomColors = (numColors) => {
        const colors = []
        for (let i = 0; i < numColors; i++) {
            const color = `rgb(${Math.floor(Math.random() * 256)}, ${Math.floor(
                Math.random() * 256
            )}, ${Math.floor(Math.random() * 256)})`
            colors.push(color)
        }
        return colors
    }

    // Data for the chart displaying student information
    const chartDataStudents = {
        labels: courses.map((course) => course.courseName),
        datasets: [
            {
                data: courses.map((course) => course.totalStudentsEnrolled),
                backgroundColor: generateRandomColors(courses.length),
            },
        ],
    }

    // Data for the chart displaying income information
    const chartIncomeData = {
        labels: courses.map((course) => course.courseName),
        datasets: [
            {
                data: courses.map((course) => course.totalAmountGenerated),
                backgroundColor: generateRandomColors(courses.length),
            },
        ],
    }

  // Options for the chart
  const options = {
    maintainAspectRatio: false,
  }
    return (
        <div data-aos="fade-right" data-aos-easing="ease-in-out" data-aos-duration="1000" className="w-10/12 sm:w-full h-full flex flex-col gap-3 sm:px-2">
            <p className="text-2xl font-bold py-1">Visualise</p>
            <div className="flex gap-4 sm:w-full justify-center">
                {/* Button to switch to the "students" chart */}
                <button onClick={() => setCurrChart("students")} className={`cursor-pointer p-2 rounded-xl ${currChart === "students" ? "bg-richblack-700 text-yellow-400" : "text-yellow-300"}`}>Students</button>
                {/* Button to switch to the "income" chart */}
                <button onClick={() => setCurrChart("income")} className={`cursor-pointer p-2 rounded-xl ${currChart === "income" ? "bg-richblack-700 text-yellow-400" : "text-yellow-300"}`}>Income</button>
            </div>
            <div className="">
                <Pie data={currChart === "students" ? chartDataStudents : chartIncomeData} options={options} className="h-[40vh] sm:h-[45vh] text-lg sm:text-base"/>
            </div>
        </div>
    )
}

export default InstructorChart
