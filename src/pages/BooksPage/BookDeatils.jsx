/* eslint-disable react/jsx-key */
/* eslint-disable react/jsx-no-undef */
/* eslint-disable react/no-unescaped-entities */
import { useLoaderData } from "react-router-dom";
import book from '../../images/books-img/book-staring-saying-read-me-eevdk8dxt36nkymw.gif'
import { useUserData } from "../../Hooks/Hooks";
import { useToasts } from "react-toast-notifications";
import { useState } from "react";
import { TbDeviceIpadHorizontalStar, TbUserStar } from "react-icons/tb";
import { BsStar } from "react-icons/bs";
import './BooksPage.css'
import { useQuery } from "react-query";
import { MdOutlineRateReview } from "react-icons/md";
// import { SlCalender } from "react-icons/sl";
const BookDeatils = () => {
  const userData = useUserData()
  const signleData = useLoaderData()
  const { addToast } = useToasts();


  const [rating, setRating] = useState(0);
  const [error, setError] = useState('');
  const { data: review = [], refetch } = useQuery({
    queryKey: ['review'],
    queryFn: async () => {
      const res = await fetch(`http://localhost:5000/api/reviews/${signleData?.data?._id}`);
      const data = await res.json();
      return data;
    }
  });
  // console.log(signleData?.data?._id)
  const handleRatingClick = (value) => {
    setRating(value === rating ? 0 : value);
  };

  const renderRatingStars = () => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      const starClass = i <= rating ? 'text-yellow-500' : 'text-gray-300';
      stars.push(
        <span
          key={i}
          onClick={() => handleRatingClick(i)}
          className={`text-5xl font-extrabold cursor-pointer ${starClass}`}
        >
          ★
        </span>
      );
    }
    return stars;
  };
  const handleSubmit = async (event) => {
    event.preventDefault();
    const form = event.target
    const reviewValue = (event.currentTarget.querySelector(
      'textarea[name="textArea"]'
    ))?.value;

    if (rating === 0 || !reviewValue.trim()) {
      setError('Rating and review are required.');
      return;
    }

    if (userData) {
      const reviewData = {
        customer_name: userData?.user?.userName,
        email: userData?.user?.userName,
        u_id: signleData?.data?._id,
        review: reviewValue,
        rating: rating,
        book_title: signleData?.data?.title,
        book_catrgory: signleData?.data?.category
      }
      const response = await fetch('http://localhost:5000/api/add-review', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(reviewData)
      });
      const review = await response.json();
      console.log(review)
      if (review?.result?.acknowledged === true) {
        addToast('Review added successfully', { appearance: 'success' })
        form.reset();
        setRating(0);
        setError('');
        refetch()
      }

    }
    else {
      //   navigate('/login')
    }

  }

  const { data: lendBooks = [], } = useQuery({
    queryKey: ['lendBooks'],
    queryFn: async () => {
      const res = await fetch(`http://localhost:5000/api/lend-books/Fetch`);
      const data = await res.json();
      return data;
    }
  });
  const filterLendBook = lendBooks?.data?.filter(lend => lend?.email === userData?.user?.email && lend?.book_id === signleData?.data?._id)
  console.log(filterLendBook&&filterLendBook)

  const handleLendBooksSubmit = async () => {
    const lendDate = new Date().toISOString().split('T')[0];
    const lendData = {
      lendDate,
      userName: userData?.user?.userName,
      email: userData?.user?.email,
      book_title: signleData?.data?.title,
      book_author: signleData?.data?.author,
      book_genre: signleData?.data?.genre,
      book_id: signleData?.data?._id,
      request: ""
    }
    const response = await fetch('http://localhost:5000/api/lend-books', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(lendData)
    });
    const responseData = await response.json();
    if (responseData?.result?.acknowledged === true) {
      addToast('lend request send to admin...', { appearance: 'success' })
      location.reload();
    } else {
      addToast('lend request send fail', { appearance: 'error' })
    }
  }


  return (
    <div>
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
           <div className="flex items-center gap-2">
            {filterLendBook && filterLendBook[0]?.book_id === signleData?.data?._id ?
            <button disabled className="w-40 p-2 bg-blue-400 rounded-lg">{`${filterLendBook&&filterLendBook[0]?.request === "" ? "pending request..." : "Lend accepted"}`}
            </button>:
            <button onClick={() => handleLendBooksSubmit()} className="p-2 bg-blue-400 rounded-lg w-36">Lend this books
            </button>}
            {filterLendBook&&filterLendBook[0]?.returnDate &&<h1>Return Date: {filterLendBook&&filterLendBook[0]?.returnDate}</h1>}
            </div> 
            
          </div>
        </div>
      </div>


      {/* review section*/}
      <div className="flex justify-center mt-10 mb-10">
        <div className="w-1/2">
          <div className='mt-2 shadow-xl rounded-2xl'>
            <div className='p-2 text-white bg-teal-400 rounded-tl-2xl rounded-tr-2xl'>
              <div className='flex justify-center text-5xl'><h1><TbUserStar /></h1></div>
              <div className='flex justify-center text-lg'><h1>Add Review</h1></div>
            </div>

            <div className='p-2'>
              <div className='flex items-center justify-center mt-2 font-bold gap-x-2'><p className='text-lg text-yellow-500 animate-bounce'><BsStar />
              </p><p>What's your rating ?</p></div>
              <div className='flex justify-center mt-2 font-bold border-b-4 animate-pulse'>
                {renderRatingStars()}
              </div>
              <form onSubmit={handleSubmit}>
                <div className='mt-5'>
                  {/* <label className="textArea"> <span className="text-lg label-text">Write Here:</span></label> */}
                  <textarea
                    className="w-full pt-3 h-28 input input-bordered rounded-3xl"
                    placeholder="Write your valuable Feedback here..."
                    name='textArea'
                  />
                </div>
                <div className="flex justify-center mt-2 mb-5 text-center">
                  <div>
                    <button className=' btn-flip speed' type="submit" data-front="Submit Review ＋" data-back="Click to add ≣"></button> <br />
                    {error && <small className='' style={{ color: 'red' }}>{error}</small>}
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
      <div className="flex justify-center">
        {
          review?.data?.length === 0 ?

            <div className='flex justify-center mt-10 mb-10'>
              <span className=" no-found-review">No reviews Found ☹</span>
            </div>
            :

            <div className='mt-10 rounded-2xl'>
              {
                review?.data?.map((review) =>
                  <div className='mb-10 border min-h-40 rounded-2xl w-[600px]'>
                    <div className='justify-between bg-teal-400 border-b-2 lg:flex rounded-tl-2xl rounded-tr-2xl '>
                      <div className='flex items-center p-2 gap-x-2'>
                        <div className="avatar">
                          <div className="w-10 rounded-full ">
                            <img src={review.image} />
                          </div>
                        </div>
                        <small className='text-white'>{review.customer_name}</small>
                      </div>
                      {/* <div className='flex items-center gap-3 pr-3 mb-2 ml-5 text-sm text-white lg:mb-0 lg:ml-0 lg:text-md'>
                        <span className=' animate-bounce'><SlCalender /></span> {typeof review?.createdAt === 'string' && review?.createdAt.slice(0, 10)}
                      </div> */}
                    </div>
                    <div className='p-2 border-b-2'>
                      <p className='text-2xl text-blue-700'><MdOutlineRateReview /></p>
                      <h1 className='pl-2 mb-3'><span className='font-bold'>❝</span> {review.review} <span className='font-bold'>❞</span></h1>
                    </div>
                    <div className='items-center justify-between lg:flex'>
                      <div className='flex p-4 mb-2 border-b-2 gap-x-1 lg:border-b-0 lg:mb-0'>
                        <p className='flex items-center font-bold gap-x-1'><TbDeviceIpadHorizontalStar />Rating:</p>
                        <div>
                          {Array.from({ length: review.rating }, (_, index) => (
                            <span key={index} className="text-yellow-500 animate-pulse">
                              ★
                            </span>
                          ))}
                          {Array.from({ length: 5 - review.rating }, (_, index) => (
                            <span key={index} className="text-gray-300">
                              ★
                            </span>
                          ))}
                        </div>
                        <div>
                          <h1>'{review.rating}.0' out of '5.0'</h1>
                        </div>
                      </div>
                      <div>
                      </div>
                    </div>
                  </div>)
              }
            </div>
        }
      </div>
    </div>

  );
};

export default BookDeatils;