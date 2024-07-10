/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
//import Footer from "../components/Common/Footer"
import CourseCard from "../components/core/Catalog/Course_Card";
import CourseSlider from "../components/core/Catalog/Course_Slider";
import { apiConnector } from "../services/apiConnector";
import { categories } from "../services/apis";
import { getCatalogPageData } from "../services/operations/pageAndComponentData";
import Footer from "../components/common/Footer";

const Catalog = () => {
    const { loading } = useSelector((state) => state.profile);
    const { catalogName } = useParams();
    const [active, setActive] = useState(1);
    const [catalogPageData, setCatalogPageData] = useState(null);
    const [categoryId, setCategoryId] = useState("");
    // Fetch All Categories
    useEffect(() => {
        (async () => {
            try {
                const getCategories = async () => {
                    const result = await apiConnector("GET", categories.CATEGORIES_API);
                    //     console.log("Result of categories -> ", result);
                    const category_id = result?.data?.allCategories?.filter(
                        (ct) => ct.name.split(" ").join("-").toLowerCase() === catalogName
                    )[0]._id;
                    //     console.log("Result of ->", result);
                    //     console.log("Category_id -> ", category_id);
                    setCategoryId(category_id);
                };
                getCategories();
            } catch (error) {
                console.log("Could not fetch Categories.", error);
            }
        })();
    }, [catalogName]);

    useEffect(() => {
        //     console.log("Updated categoryId -> ", categoryId);
    }, [categoryId]);

    useEffect(() => {
        const getCategoryDetails = async () => {
            try {
                const result = await getCatalogPageData(categoryId);
                setCatalogPageData(result);
            } catch (err) {
                console.log(err);
            }
        };
        if (categoryId) {
            getCategoryDetails();
        }
    }, [categoryId]);

    if (loading || !catalogPageData) {
        return (
            <div className="grid min-h-[calc(100vh-3.5rem)] place-items-center">
                <div className="spinner"></div>
            </div>
        );
    }
    /* if (!loading && !catalogPageData.success) {
        return <Error />
    } */
    return (
        <div className="w-screen flex flex-col mt-[9vh] items-center gap-12">
            <div className="light-bg flex flex-col justify-center sm:px-4 sm:gap-4 px-40 h-[35vh] w-full gap-8">
                <p data-aos="fade-right" data-aos-easing="ease-in-out" className="text-zinc-500 italic text-base sm:w-full">
                    {`Home / Catalog / `}
                    <span className="font-semibold underline">
                        {catalogPageData?.selectedCategory?.name}
                    </span>
                </p>
                <p data-aos="fade-right" data-aos-easing="ease-in-out" className="text-4xl font-bold py-2 text-zinc-400">
                    {catalogPageData?.selectedCategory?.name}
                </p>
                <p data-aos="fade-right" data-aos-easing="ease-in-out" className="text-xl text-zinc-100 sm:text-base">
                    {catalogPageData?.selectedCategory?.description}
                </p>
            </div>
            {/* Section 1 -> Courses*/}
            <div className="w-9/12 flex flex-col sm:w-11/12" data-aos="fade-up" data-aos-easing="ease-in-out">
                <h1 className="text-white text-3xl font-bold py-2">Courses to get you started</h1>
                {/* <div className="flex gap-4 text-white text-xl">
                    <p>Most Popular</p>
                    <p>New</p>
                </div> */}
                <div className="w-full h-max">
                    <CourseSlider Courses={catalogPageData?.selectedCategory?.course} />
                </div>
            </div>
            {/* Section 2 -> top Courses*/}
            <div className="w-9/12 flex flex-col sm:w-11/12">
                <p className="text-white text-3xl font-bold py-2" data-aos="fade-up" data-aos-easing="ease-in-out">
                    Top Courses in {catalogPageData?.differentCategories?.name}
                </p>
                <div className="w-full h-max">
                    <CourseSlider Courses={catalogPageData?.differentCategories?.course} />
                </div>
            </div>
            {/* Section 3 -> Frequently bought*/}
            <div className="w-9/12 flex flex-col sm:w-11/12">
                <p className="text-white text-3xl font-bold py-2" data-aos="fade-up" data-aos-easing="ease-in-out">Frequently bought together</p>
                <div className="flex w-full flex-wrap gap-4 sm:flex-col">
                    {catalogPageData?.mostSellingCourses?.slice(0, 4).map((course, index) => (
                        <CourseCard course={course} key={index} Height={""} />
                    ))}
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default Catalog;
