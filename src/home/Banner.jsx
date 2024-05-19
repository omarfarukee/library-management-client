import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import logos from '../images/logo/pngwing.com (8).png'
const Banner = () => {
    return (
        <section className=''>
    <Swiper
    pagination={{
      clickable: true,
    }}
    autoplay={{
        delay: 5000,
        disableOnInteraction: false,
      }}
    modules={[Autoplay, Pagination]}
    className="mySwiper"
  >
    <SwiperSlide>
        <div className='relative h-screen border'>
            <div className='object-cover object-left w-full duration-300 bg-transparent h-80 md:h-full'>
                <div className='flex justify-center animate__animated animate__backInDown'>
                      <img className='w-72' src={logos} alt="" />
                </div>
                  
            </div> 
        </div>
    </SwiperSlide>
    <SwiperSlide>
        <div className='relative h-screen'>
            <div className='object-cover object-left w-full duration-300 bg-transparent h-80 md:h-full 2xl:h-[600px]'>
                 <div className="absolute inset-0 block bg-white md:hidden bg-opacity-80"></div>
            <div className='ml-10 absolute top-20 md:top-1/4 lg:top-1/3 right-10 md:right-[10%] max-w-6xl flex justify-center animate__animated animate__backInDown'>
              <div className='mb-3 w-fit lg:mb-5'>
                  <p className='mx-1 text-sm font-semibold tracking-wide md:text-base lg:text-lg xl:text-xl md:tracking-widest'>THE BIGGEST SELECTION OF QUALITY DEVICES</p>
                  <p className='border-[3px] md:border-[5px] -mt-2 md:-mt-3 border-yellow-300'></p>
              </div>
              <h2 className='mb-3 text-2xl font-semibold tracking-widest text-blue-900 duration-300 md:-ml-8 lg:-ml-12 xl:-ml-16 sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl lg:mb-5 xl:mb-8'>QUALITY ELECTRONICS</h2>
              <p className='mb-5 text-base tracking-wider duration-300 md:text-lg lg:text-xl xl:text-2xl 2xl:text-3xl lg:mb-8 xl:mb-10'>SMART TECH GADGETS THAT WILL ASTOUND YOU!.</p>
              <button className='px-3 py-2 text-base text-white duration-300 bg-blue-900 rounded-lg shadow-xl md:px-5 md:py-3 md:text-lg hover:bg-blue-700'>
                Shop Now
              </button>
            </div>
            </div>
           
        </div>
    </SwiperSlide>
    <SwiperSlide>
        <div className='relative h-screen'>
            <div className='object-cover object-left w-full duration-300 bg-transparent h-80 md:h-full 2xl:h-[600px]'>
                 <div className="absolute inset-0 block bg-white md:hidden bg-opacity-80"></div>
            <div className='ml-10 absolute top-20 md:top-1/4 lg:top-1/3 right-10 md:right-[10%] max-w-6xl'>
              <div className='mb-3 w-fit lg:mb-5'>
                  <p className='mx-1 text-sm font-semibold tracking-wide md:text-base lg:text-lg xl:text-xl md:tracking-widest'>THE BIGGEST SELECTION OF QUALITY DEVICES</p>
                  <p className='border-[3px] md:border-[5px] -mt-2 md:-mt-3 border-yellow-300'></p>
              </div>
              <h2 className='mb-3 text-2xl font-semibold tracking-widest text-blue-900 duration-300 md:-ml-8 lg:-ml-12 xl:-ml-16 sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl lg:mb-5 xl:mb-8'>QUALITY ELECTRONICS</h2>
              <p className='mb-5 text-base tracking-wider duration-300 md:text-lg lg:text-xl xl:text-2xl 2xl:text-3xl lg:mb-8 xl:mb-10'>SMART TECH GADGETS THAT WILL ASTOUND YOU!.</p>
              <button className='px-3 py-2 text-base text-white duration-300 bg-blue-900 rounded-lg shadow-xl md:px-5 md:py-3 md:text-lg hover:bg-blue-700'>
                Shop Now
              </button>
            </div>
            </div>
           
        </div>
    </SwiperSlide>
    
  </Swiper>
    </section>
  );
};

export default Banner;