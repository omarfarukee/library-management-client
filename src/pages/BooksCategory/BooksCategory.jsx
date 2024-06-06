import { useQuery } from "react-query";
import { NavLink } from "react-router-dom";
import scienceFiction from "../../images/category/scienceFiction.jpg";
import mystery from "../../images/category/mystry.jpg";
import fiction from "../../images/category/fiction.jpg";
import Marquee from "react-fast-marquee";
import "./BookCategory.css"
const AllBook = () => {
    const { data: allCategory = [] } = useQuery({
        queryKey: ['allCategory'],
        queryFn: async () => {
            const res = await fetch(`http://localhost:5000/api/all-catalogue/Fetch`);
            const data = await res.json();
            return data;
        }
    });

    console.log(allCategory?.length);

    return (
        <div className="mb-40">
             <div className="flex justify-center mb-20 pt-28">
                        <div className='chose-topic animate__animated animate__backInUp'>
                            <h1 className="uppercase">Choose_Category</h1>
                            <h1 className="uppercase">Choose_Category</h1>
                        </div>

                    </div>
        <div className="flex justify-center animate__animated animate__backInDown">
            <div>
                {!allCategory?.data && <><p>loading...</p></>}
            </div>
            <Marquee pauseOnHover>
            <div className="flex gap-32">
                {allCategory?.data?.map((category) => (
                    <NavLink
                        key={category?._id}
                        to={`/bookPage/${encodeURIComponent(category?.category)}`}
                        className="relative flex items-center justify-center overflow-hidden rounded-xl group"
                    >
                        <div className="relative w-full h-[500px]">
                            {category?.category === "Science Fiction" && (
                                <img
                                    src={scienceFiction}
                                    alt=""
                                    className="object-cover w-full h-full transition-opacity duration-300 ease-in-out group-hover:opacity-75"
                                />
                            )}
                            {category?.category === "Mystery" && (
                                <img
                                    src={mystery}
                                    alt=""
                                    className="object-cover w-full h-full transition-opacity duration-300 ease-in-out group-hover:opacity-75"
                                />
                            )}
                            {category?.category === "Fiction" && (
                                <img
                                    src={fiction}
                                    alt=""
                                    className="object-cover w-full h-full transition-opacity duration-300 ease-in-out group-hover:opacity-75"
                                />
                            )}
                            <div className="absolute inset-0 flex items-center justify-center transition-opacity duration-300 ease-in-out opacity-0 group-hover:opacity-100">
                                <h1 className="text-4xl italic font-bold text-black">{category?.category}</h1>
                            </div>
                        </div>
                    </NavLink>
                ))}
            </div>
            </Marquee>
        </div>
        </div>
    );
};

export default AllBook;
