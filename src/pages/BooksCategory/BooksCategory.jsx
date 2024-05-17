/* eslint-disable react/jsx-key */
import { useQuery } from "react-query";
import { FaBookBookmark } from "react-icons/fa6";
import { NavLink } from "react-router-dom";

const AllBook = () => {

    const { data: allCategory = [] } = useQuery({
        queryKey: ['allCategory'],
        queryFn: async () => {
            const res = await fetch(`http://localhost:5000/api/all-catalogue/Fetch`);
            const data = await res.json();
            return data;
        }
    });

    // console.log(allCategory)
    return (
        <div className="flex justify-center pt-20 ">
        <div className="grid grid-cols-3 ">
            {
                allCategory?.data?.map(
                    category => 
                        <div key={category?._id} className="flex items-center justify-center h-40 mb-2 border shadow-2xl ml-14 w-60 rounded-xl">
                           <div className="">
                            <FaBookBookmark className="text-5xl text-center" />
                           <NavLink to={`/bookPage/${encodeURIComponent(category?.category)}`}><h1 className="text-2xl italic font-bold">{category?.category}</h1></NavLink> 
                            </div> 
                        </div>

                    )
            }
        </div>
    </div>
    );
};

export default AllBook;