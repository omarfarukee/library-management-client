import { useQuery } from "react-query";
import { NavLink } from "react-router-dom";
import scienceFiction from "../../images/category/scienceFiction.jpg";
import mystery from "../../images/category/mystry.jpg";
import fiction from "../../images/category/fiction.jpg";

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
        <div className="flex justify-center pt-28 animate__animated animate__backInDown">
            <div>
                {!allCategory?.data && <><p>loading...</p></>}
            </div>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
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
        </div>
    );
};

export default AllBook;
