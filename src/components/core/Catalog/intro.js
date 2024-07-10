/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import { apiConnector } from "../../../services/apiConnector";
import { categories } from "../../../services/apis";
import { Link } from "react-router-dom";
import HighLightText from "../Homepage/HighLightText";

const Intro = () => {
    const [subLinks, setSubLinks] = useState([]);
    const [loading, setLoading] = useState();

    const fetchSubLinks = async () => {
        setLoading(true);
        try {
            const result = await apiConnector("GET", categories.CATEGORIES_API);
            //     console.log("Printing SubLinks result : ", result);
            setSubLinks(result.data.allCategories);
        } catch (err) {
            console.log(err.message);
        }
        setLoading(false);
    };
    useEffect(() => {
        fetchSubLinks();
    }, []);
    return (
        <div className="w-screen flex flex-col mt-[7vh] items-center">
            <div className="light-bg flex flex-col items-center justify-center px-40 h-[92vh] w-full gap-12">
                <h1 className="text-5xl p-3 font-bold bg-gradient-to-r from-[#f093fb] to-[#f5576c] text-transparent bg-clip-text">
                    Categories
                </h1>
                <div className="code-section h-max w-max p-4 flex flex-col gap-4" data-aos="zoom-in-up" data-aos-easing="ease-in-out" data-aos-duration="1200">
                    {subLinks?.map((subLink, i) => (
                        <Link data-aos="zoom-in-right" data-aos-easing="ease-in" data-aos-duration="1000"
                            key={i}
                            to={`/catalog/${subLink.name.split(" ").join("-").toLowerCase()}`}
                            className="text-white text-2xl p-2 px-20 cursor-pointer hover:text-zinc-500"
                        >
                            {``} <HighLightText text={`${subLink.name}`} />
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Intro;
