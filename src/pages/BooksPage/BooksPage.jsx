/* eslint-disable react/no-unknown-property */
/* eslint-disable react/jsx-key */
import { NavLink, useLoaderData } from "react-router-dom";
import './BooksPage.css'
import books from '../../images/books-img/book-staring-saying-read-me-eevdk8dxt36nkymw.gif'
import { useState } from "react";
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
			<div id="search">
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

			<div className="flex justify-center">
			<div className="grid grid-cols-3 gap-3 mt-10">
                    {filteredBooks.length === 0 ? (
                        <p>Sorry, book not found.</p>
                    ) : (
                        filteredBooks.map(book => (
                            <div className="border shadow-xl w-80 rounded-2xl" key={book._id}>
                                {/* Book details */}
                                <img src={books} alt="" className="rounded-tl-2xl rounded-tr-2xl" />
                                <div className="p-5">
                                    <h1 className="p-1 font-bold bg-blue-100 rounded-md">Ttile: {book.title}</h1>
                                    <h1 className="p-1 mt-2 font-bold bg-blue-100 rounded-md">Author: {book.author}</h1>
                                    <span className="flex justify-center">
                                        <NavLink to={`/book/${book._id}`}>
                                            <button className="p-2 mt-4 text-white bg-blue-500 border rounded-xl">Details..</button>
                                        </NavLink>
                                    </span>
                                </div>
                            </div>
                        ))
                    )}
                </div>
            </div>

		</div>
	);
};

export default BooksPage;