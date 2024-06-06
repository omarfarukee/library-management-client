/* eslint-disable react/no-unknown-property */
/* eslint-disable react/jsx-key */
import { NavLink, useLoaderData } from "react-router-dom";
import './BooksPage.css'
import { useState } from "react";
import mystery from "../../images/category/mystry.jpg"
import scienceFinction from "../../images/category/scienceFiction.jpg"
import finction from "../../images/category/fiction.jpg"
import sorry from "../../images/sorry/output-onlinegiftools (22).gif"
const BooksPage = () => {
	const data = useLoaderData();
    const [searchQuery, setSearchQuery] = useState('');

    // Filter books based on search query
    const filteredBooks = data?.data?.filter(book => {
        const { title, author } = book;
        const normalizedQuery = searchQuery.toLowerCase();
        return title.toLowerCase().includes(normalizedQuery) || author.toLowerCase().includes(normalizedQuery);
    });
	return (
		<div className="pt-20">
			<div id="search" className="animate__animated animate__fadeInLeft">
				<svg viewBox="0 0 420 60" xmlns="http://www.w3.org/2000/svg">
					<rect class="bar" />

					<g class="magnifier">
						<circle class="glass" />
						<line class="handle" x1="32" y1="32" x2="44" y2="44"></line>
					</g>

					<g class="sparks">
						<circle class="spark" />
						<circle class="spark" />
						<circle class="spark" />
					</g>

					<g class="burst pattern-one">
						<circle class="particle circle" />
						<path class="particle triangle" />
						<circle class="particle circle" />
						<path class="particle plus" />
						<rect class="particle rect" />
						<path class="particle triangle" />
					</g>
					<g class="burst pattern-two">
						<path class="particle plus" />
						<circle class="particle circle" />
						<path class="particle triangle" />
						<rect class="particle rect" />
						<circle class="particle circle" />
						<path class="particle plus" />
					</g>
					<g class="burst pattern-three">
						<circle class="particle circle" />
						<rect class="particle rect" />
						<path class="particle plus" />
						<path class="particle triangle" />
						<rect class="particle rect" />
						<path class="particle plus" />
					</g>
				</svg>
				<input
				className=""
                    type="search"
                    name="q"
                    aria-label="Search for inspiration"
                    placeholder="Search book ..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                />
			</div>

			<div className="flex justify-center p-5">
				
            <div className="grid grid-cols-1 gap-10 mt-10 sm:grid-cols-2 lg:grid-cols-4 animate__animated animate__bounceInUp">
                {filteredBooks.length === 0 ? (
					<div className="flex justify-center w-full border"><span><img src={sorry} alt="" /><p>Book not found</p></span></div>
                    
                ) : (
					
                    filteredBooks.map((book) => (
                        <NavLink to={`/book/${book._id}`} key={book._id} className="relative block shadow-xl h-[400px] group">
                            {/* Book image */}
                            {book?.category === "Mystery" && (
                                <img
                                    src={mystery}
                                    alt=""
                                    className="object-cover w-full h-full transition-opacity duration-300 ease-in-out opacity-75 "
                                />
                            )}
                            {book?.category === "Science Fiction" && (
                                <img
                                    src={scienceFinction}
                                    alt=""
                                    className="object-cover w-full h-full transition-opacity duration-300 ease-in-out opacity-75 "
                                />
                            )}
                            {book?.category === "Fiction" && (
                                <img
                                    src={finction}
                                    alt=""
                                    className="object-cover w-full h-full transition-opacity duration-300 ease-in-out opacity-75 "
                                />
                            )}
                            {/* Overlay with title and author */}
                            <div className="absolute inset-0 flex flex-col items-center justify-center transition-opacity duration-300 ease-in-out ">
                                <small className={book?.category === "Fiction" ?"p-2 font-bold text-black bg-transparent rounded-md backdrop-blur-lg"
								:"p-2 font-bold text-gray-300 bg-transparent rounded-md backdrop-blur-lg"}>
                                    {book.title}
                                </small>
                                <h1 className={book?.category === "Fiction" ?"p-2 font-bold text-black bg-transparent rounded-md backdrop-blur-lg"
								:"p-2 font-bold text-gray-300 bg-transparent rounded-md backdrop-blur-lg"}>
                                    Author: {book.author}
                                </h1>
                            </div>
                        </NavLink>
                    ))
                )}
            </div>
        </div>

		</div>
	);
};

export default BooksPage;