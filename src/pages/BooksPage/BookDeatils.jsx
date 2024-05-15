/* eslint-disable react/no-unescaped-entities */
import { useLoaderData } from "react-router-dom";
import book from '../../images/books-img/book-staring-saying-read-me-eevdk8dxt36nkymw.gif'

const BookDeatils = () => {
    const signleData = useLoaderData()
    console.log(signleData?.data)
    return (
        <div className="flex items-center justify-center pt-20">
            <div className="flex flex-col items-center w-3/5 bg-white border border-gray-200 rounded-lg shadow md:flex-row ">
                <img className="object-cover w-full rounded-t-lg md:h-auto md:w-96 md:rounded-none md:rounded-s-lg" src={book} alt="" />
                <div className="flex flex-col justify-between p-4 leading-normal">
                    <h5 className="mb-2 text-2xl font-bold tracking-tight">Titile: {signleData?.data?.title}</h5>
                    <p>Catalouge: {signleData?.data?.category}</p>
                    <p>Author: {signleData?.data?.author}</p>
                    <p>Genre: {signleData?.data?.genre}</p>
                    <p>Publication Year: {signleData?.data?.publicationYear}</p>
                    <p className="mb-3 font-normal ">Description: '{signleData?.data?.description}'</p>
                </div>
            </div>
        </div>
    );
};

export default BookDeatils;