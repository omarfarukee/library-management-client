import duneBanner from "../images/banner-img/il_fullxfull.4402044357_nb5l.jpg"
import duneBook from "../images/banner-img/81EybmCc+SL-removebg-preview.png"
import lota3 from "../images/banner-img/lota3.png"
import './Home.css'
import bbb from "../images/banner-img/bbb.png"

const Banner3 = () => {
    return (
        <div className="relative h-[600px]"> {/* Add relative position here */}
            <img src={lota3} className="absolute z-10 animate__animated animate__fadeIn" alt="" />
            <img src={bbb} className="absolute top-0 right-0 z-10 w-40 animate__animated animate__fadeIn" alt="" />
        <div className="flex items-center h-full justify-evenly">
            <div className="">
                <img className="w-96 duneBanner animate__animated animate__backInRight" src={duneBanner} alt="" />
            </div>
            <div className="w-1/4 p-3 duneBanner animate__animated animate__backInRight">
                <h1>Lorem ipsum dolor sit amet consectetur adipisicing elit. Itaque magni facere molestiae eum! Accusantium consequatur voluptates nesciunt dolorem odit, minus tenetur quas perspiciatis eaque impedit, accusamus, eum deleniti porro adipisci.</h1>
            </div>
            <div className="duneBook">
                <img className="w-96 duneBanner animate__animated animate__backInRight" src={duneBook} alt="" />
            </div>
        </div>
        </div>
    )
};


export default Banner3;