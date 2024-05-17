/* eslint-disable react/jsx-key */
/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */

import { Button } from "flowbite-react";
import { useForm } from "react-hook-form";
import { useQuery } from "react-query";
import { useToasts } from "react-toast-notifications";

const UpdateBook = ({ singleData }) => {
    const { addToast } = useToasts();
    const dataBook = singleData
    const { register, handleSubmit } = useForm();
    const { refetch } = useQuery({
        queryKey: ['allCategory'],
        queryFn: async () => {
            const res = await fetch(`http://localhost:5000/api/all-catalogue/Fetch`);
            const data = await res.json();
            return data;
        }
    });
    const handleUpdateBookInfo = async (formData) => {
        const validData = {
            title: formData.title,
            genre: formData.genre,
            author: formData.author,
            stock:parseInt(formData.stock) ,
            publicationYear: parseInt(formData.publicationYear)
        };
        console.log(validData);
    
        try {
            const response = await fetch(`http://localhost:5000/api/update/book/${singleData?.data?._id}`, { 
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(validData),
            });
    
            const userValid = await response.json();
            console.log(userValid);
            if (userValid?.result?.modifiedCount === 1) {
                addToast('Information updated', { appearance: 'success' });
                refetch();
                window.location.reload();
            } else {
                addToast(`not updated`, { appearance: 'error' });
            }
    
        } catch (error) {
            console.error('Error updating information:', error);
            addToast('Failed to update information', { appearance: 'error' });
        }
    };
    
    return (
        <div>
            {dataBook?.data?._id}
            <form onSubmit={handleSubmit(handleUpdateBookInfo)}>
                <div className="flex items-center mt-5 justify-evenly">
                    <p className=" w-28">Book Title: </p>
                    <input type="text" {...register("title", {

                    })} className="w-52 input" defaultValue={dataBook?.data?.title} />
                </div>
                <div className="flex items-center mt-5 justify-evenly">
                    <p className=" w-28">Book author: </p>
                    <input type="text" {...register("author", {

                    })} className="w-52 input" defaultValue={dataBook?.data?.author} />
                </div>
                <div className="flex items-center mt-5 justify-evenly">
                    <p className=" w-28">Book genre: </p>
                    <input type="text" {...register("genre", {

                    })} className="w-52 input" defaultValue={dataBook?.data?.genre} />
                </div>
                <div className="flex items-center mt-5 justify-evenly">
                    <p className=" w-28">Pbulication year: </p>
                    <input type="number" {...register("publicationYear", {

                    })} className="w-52 input" defaultValue={dataBook?.data?.publicationYear} />
                </div>
                <div className="flex items-center mt-5 justify-evenly">
                    <p className=" w-28">Stocks: </p>
                    <input type="number" {...register("stock", {

                    })} className="w-52 input" defaultValue={dataBook?.data?.stock} />
                </div>
                <div className="flex justify-center mt-5">
                    <Button type="submit" outline gradientDuoTone="purpleToBlue" className="">
                    update
                </Button>
                </div>
                
            </form>
        </div>
    );
};

export default UpdateBook;