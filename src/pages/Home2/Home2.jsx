// import img1 from "../../images/home2Image/img1.jpg";
// import img2 from "../../images/home2Image/img2.jpg";
// import img3 from "../../images/home2Image/img3.jpg";
// import img4 from "../../images/home2Image/img4.jpg";
// import img5 from "../../images/home2Image/img5.jpg";
// import img6 from "../../images/home2Image/img6.jpg";
// import img7 from "../../images/home2Image/img7.jpg";
// import img8 from "../../images/home2Image/img8.jpg";
// import './Home2.css'
// const Home2 = () => {
//     return (
//         <div className="h-[650px]">
//             <div className="w-full columns-1 sm:columns-2 lg:columns-4">
//                 <div className="border h-[414px] mb-3">
//                     <img src={img1} alt="" className="w-full h-full opacity" />
//                 </div>
//                 <div  className=" border h-[224px]">
//                    <img src={img6} alt="" className="w-full h-full opacity-75" /> 
//                 </div>
//                 <div  className="border h-[224px]  mb-3">
//                     <img src={img8} alt="" className="w-full h-full" />
//                 </div>
//                 <div  className="border  h-[414px]">
//                      <img src={img3} alt="" className="w-full h-full" />
//                 </div>
//                <div  className="border h-[414px] mb-3">
//                  <img src={img5} alt="" className="w-full h-full" />
//                </div>
//                <div  className=" border h-[224px]">
//                 <img src={img2} alt="" className="w-full h-full" />
//                </div>
//                 <div  className="border h-[224px]  mb-3">
//                     <img src={img4} alt="" className="w-full h-full" />
//                 </div>
//                 <div className="border  h-[414px] ">
//                     <img src={img7} alt="" className="w-full h-full" />
//                 </div>

//             </div>


//         </div>
//     );
// };

// export default Home2;
import img1 from "../../images/home2Image/img1.jpg";
import img2 from "../../images/home2Image/img2.jpg";
import img3 from "../../images/home2Image/img3.jpg";
import img4 from "../../images/home2Image/img4.jpg";
import img5 from "../../images/home2Image/img5.jpg";
import img6 from "../../images/home2Image/img6.jpg";
import img7 from "../../images/home2Image/img7.jpg";
import img8 from "../../images/home2Image/img8.jpg";
import './Home2.css';

const Home2 = () => {
    const images = [
        { src: img1, title: "Title 1 dk ldaj jdasklfnm" },
        { src: img6, title: "Title 2" },
        { src: img8, title: "Title 3" },
        { src: img3, title: "Title 4" },
        { src: img5, title: "Title 5" },
        { src: img2, title: "Title 6" },
        { src: img4, title: "Title 7" },
        { src: img7, title: "Title 8" },
    ];

    return (
        <div className="h-[650px] p-2">
            <div className="w-full gap-3 columns-1 sm:columns-2 lg:columns-4">
                {images.map((image, index) => (
                    <div
                        key={index}
                        className={`relative overflow-hidden mb-3 shadow-lg  rounded-2xl ${index % 4 === 1 || index % 4 === 2 ? 'h-[224px]' : 'h-[414px]'}`}
                    >
                        <div className="relative w-full h-full group">
                            <img
                                src={image.src}
                                alt=""
                                className="object-cover w-full h-full transition-transform duration-300 ease-in-out transform group-hover:scale-105 group-hover:opacity-60"
                            />
                            <div className="absolute inset-0 flex items-center justify-center transition-opacity duration-300 ease-in-out opacity-0 group-hover:opacity-100">
                                <h2 className="text-xl font-semibold text-white">{image.title}</h2>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Home2;
