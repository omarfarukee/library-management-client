/* eslint-disable react/no-unknown-property */
/* eslint-disable react/jsx-key */
import { useLoaderData } from "react-router-dom";
import './BooksPage.css'
const BooksPage = () => {
    const data = useLoaderData()
    console.log(data?.data?.map(books => books))
    return (
        <div className="pt-20">
<div id="search">
	<svg viewBox="0 0 420 60" xmlns="http://www.w3.org/2000/svg">
		<rect class="bar"/>
		
		<g class="magnifier">
			<circle class="glass"/>
			<line class="handle" x1="32" y1="32" x2="44" y2="44"></line>
		</g>

		<g class="sparks">
			<circle class="spark"/>
			<circle class="spark"/>
			<circle class="spark"/>
		</g>

		<g class="burst pattern-one">
			<circle class="particle circle"/>
			<path class="particle triangle"/>
			<circle class="particle circle"/>
			<path class="particle plus"/>
			<rect class="particle rect"/>
			<path class="particle triangle"/>
		</g>
		<g class="burst pattern-two">
			<path class="particle plus"/>
			<circle class="particle circle"/>
			<path class="particle triangle"/>
			<rect class="particle rect"/>
			<circle class="particle circle"/>
			<path class="particle plus"/>
		</g>
		<g class="burst pattern-three">
			<circle class="particle circle"/>
			<rect class="particle rect"/>
			<path class="particle plus"/>
			<path class="particle triangle"/>
			<rect class="particle rect"/>
			<path class="particle plus"/>
		</g>
	</svg>
	<input type="search" name="q" aria-label="Search for inspiration"/>
</div>

<div id="results">
	
</div>
            <div>
                {
                    data?.data?.map(books =>
                        <div>
                            <h1>{books?.title}</h1>
                        </div>
                    )
                }
            </div>
        </div>
    );
};

export default BooksPage;