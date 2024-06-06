import ScrollTrigger from 'react-scroll-trigger';
import './Home3.css'
import { useState } from 'react';
import CountUp from 'react-countup';
const Home3 = () => {
    const [animationOn, setAnimationOn] = useState(false)

    return (
        <ScrollTrigger onEnter={() => {
            setAnimationOn(true);
        }}>
        <div className='section3-container'>
        <div className='flex justify-center text-emerald-400'>
                        { animationOn &&
                        <div className='w-full italic uppercase'>
                            <div className='flex items-center h-screen justify-evenly'>
                                <div className='p-5 font-bold bg-transparent w-60 rounded-xl count-border'>
                                    <div className='flex flex-col items-center'>
                                        <h1 className=''>Over student</h1>
                                        <p className='text-6xl'><CountUp start={0} end={25} duration={4} delay={0.2} />+</p>
                                        <h1>countries</h1>
                                    </div>
                                </div>
                                <div className='p-5 font-bold bg-transparent w-60 rounded-xl count-border'>
                                    <div className='flex flex-col items-center'>
                                        <h1 className=''>Top Platfrom over</h1>
                                        <p className='text-6xl'><CountUp start={0} end={13} duration={4} delay={0.2} /></p>
                                        <h1>Countries</h1>
                                    </div>
                                </div>
                                <div className='p-5 font-bold bg-transparent w-60 rounded-xl count-border'>
                                    <div className='flex flex-col items-center'>
                                        <h1 className=''>Participate</h1>
                                        <p className='text-6xl'><CountUp start={0} end={500} duration={4} delay={0.2} />K+</p>
                                        <h1>Students</h1>
                                    </div>
                                </div>
                                <div className='p-5 font-bold bg-transparent w-60 rounded-xl count-border'>
                                    <div className='flex flex-col items-center'>
                                        <h1 className=''>Participate</h1>
                                        <p className='text-6xl'><CountUp start={0} end={500} duration={4} delay={0.2} />K+</p>
                                        <h1>Students</h1>
                                    </div>
                                </div>
                               
                            </div>
                           

                        </div>}

                    </div>
        </div>
        </ScrollTrigger>
    );
};

export default Home3;