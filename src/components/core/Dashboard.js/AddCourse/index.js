import Sidebar from "../Sidebar";
import RenderSteps from "./RenderSteps";

const AddCourse = () => {
    return (
        <div>
            <Sidebar />
            <div className="mt-[13vh]   w-8/12 ml-72 flex  gap-6">
                <div className="w-7/12">
                    <h1 className="text-2xl font-bold text-white p-2">Add Course</h1>
                    <div>
                        <RenderSteps />
                    </div>
                </div>
                {/* Course Upload Tips */}
                <div className="w-5/12">
                    <div className="flex items-start bg-zinc-500 flex-col rounded-2xl p-2 gap-3">
                        <p className="text-xl font-medium">⚡ Course Upload Tips</p>
                        <ul className="text-richblack-900">
                            <li>{">>"} Set the Course Price option or make it free.</li>
                            <li>{">>"} Standard size for the course thumbnail is 1024x576.</li>
                            <li>{">>"} Video section controls the course overview video.</li>
                            <li>{">>"} Course Builder is where you create & organize a course.</li>
                            <li>
                                {">>"} Add Topics in the Course Builder section to create
                                lessons,quizzes, and assignments.
                            </li>
                            <li>
                                {">>"} Information from the Additional Data section shows up on
                                thecourse single page.
                            </li>
                            <li>{">>"} Make Announcements to notify any important</li>
                            <li>{">>"} Notes to all enrolled students at once.</li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AddCourse;
