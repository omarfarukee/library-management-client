import duneBanner from "../images/banner-img/mockup.png"
import duneBook from "../images/banner-img/book+cover-removebg-preview.png"
import green2 from "../images/banner-img/lota2.png"
import greenLast from "../images/banner-img/lotalast.png"
import './Home.css'

const Banner2 = () => {
    return (
        <div className="relative h-[600px]"> {/* Add relative position here */}
            <img src={green2} className="absolute z-10 animate__animated animate__fadeIn w-96" alt="" />
            <img src={greenLast} className="absolute top-0 right-0 z-10 animate__animated animate__fadeIn w-96" alt="" />
        <div className="flex items-center h-full justify-evenly">
            
            <div className="">
                <img className="w-[500px] duneBanner animate__animated animate__backInRight" src={duneBanner} alt="" />
            </div>
            <div className="w-1/4 p-3 duneBanner animate__animated animate__backInRight">
                <h1>Lorem ipsum dolor sit amet consectetur adipisicing elit. Itaque magni facere molestiae eum! Accusantium consequatur voluptates nesciunt dolorem odit, minus tenetur quas perspiciatis eaque impedit, accusamus, eum deleniti porro adipisci.</h1>
            </div>
            <div className="duneBook">
                <img className="w-96 duneBanner animate__animated animate__backInRight" src={duneBook} alt="" />
            </div>
        </div>
        </div>
    );
};

export default Banner2;