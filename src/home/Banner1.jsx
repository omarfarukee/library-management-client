
// import duneBanner from "../images/banner-img/images.png"
// import duneBook from "../images/banner-img/bf8f3b79439115.5d93eec94fc17-removebg-preview.png"
// import green from "../images/banner-img/greenLota.png"
// import './Home.css'
// const Banner1 = () => {
//     return (
//         <div className="">
//         <img src={green} className="absolute animate__animated animate__fadeIn" alt="" />
//         <div className="flex items-center h-[600px] justify-evenly ">
//             <div className="">
//                 <img className=" w-96 duneBanner animate__animated animate__backInRight" src={duneBanner} alt="" />
//             </div>
//             <div className="w-1/4 p-3 duneBanner animate__animated animate__backInRight">
//                 <h1>Lorem ipsum dolor sit amet consectetur adipisicing elit. Itaque magni facere molestiae eum! Accusantium consequatur voluptates nesciunt dolorem odit, minus tenetur quas perspiciatis eaque impedit, accusamus, eum deleniti porro adipisci.</h1>
//             </div>
//             <div className="duneBook">
//                 <img className="w-96 duneBanner animate__animated animate__backInRight" src={duneBook} alt="" />
//             </div>
//         </div>
//     </div>
//     );
// };

// export default Banner1;
import duneBanner from "../images/banner-img/images.png"
import duneBook from "../images/banner-img/bf8f3b79439115.5d93eec94fc17-removebg-preview.png"
import green from "../images/banner-img/greenLota.png"
import aaa from "../images/banner-img/aaa.png"
import './Home.css'

const Banner1 = () => {
    return (
        <div className="relative h-[600px]">
            <img src={green} className="absolute z-10 animate__animated animate__fadeIn" alt="" /> 
            <img src={aaa} className="absolute top-0 right-0 z-10 animate__animated animate__fadeIn w-96" alt="" />
            <div className="flex items-center h-full justify-evenly">
                <div>
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
    );
};

export default Banner1;
