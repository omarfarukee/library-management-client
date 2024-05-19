import { useState, useEffect } from "react";
import Banner1 from "./Banner1";
import Banner2 from "./Banner2";
import Banner3 from "./Banner3";

const Home = () => {
    const [banner1, setBanner1] = useState(true);
    const [banner2, setBanner2] = useState(false);
    const [banner3, setBanner3] = useState(false);
    const [currentBanner, setCurrentBanner] = useState(1);

    const toggleBanner1 = () => {
        setBanner1(true);
        setBanner2(false);
        setBanner3(false);
        setCurrentBanner(1);
    };

    const toggleBanner2 = () => {
        setBanner2(true);
        setBanner1(false);
        setBanner3(false);
        setCurrentBanner(2);
    };

    const toggleBanner3 = () => {
        setBanner3(true);
        setBanner1(false);
        setBanner2(false);
        setCurrentBanner(3);
    };

    useEffect(() => {
        const interval = setInterval(() => {
            if (currentBanner === 1) {
                toggleBanner2();
            } else if (currentBanner === 2) {
                toggleBanner3();
            } else {
                toggleBanner1();
            }
        }, 5000);

        return () => clearInterval(interval);
    }, [currentBanner]);

    return (
        <div className="">
            {banner1 && <div><Banner1 /></div>}
            {banner2 && <div><Banner2 /></div>}
            {banner3 && <div><Banner3 /></div>}

            <div className="flex justify-center gap-2">
                <div>
                    <button onClick={toggleBanner1} className="p-3 shadow-xl rounded-3xl">1</button>
                </div>
                <div>
                    <button onClick={toggleBanner2} className="p-3 shadow-xl rounded-3xl">2</button>
                </div>
                <div>
                    <button onClick={toggleBanner3} className="p-3 shadow-xl rounded-3xl">3</button>
                </div>
            </div>
        </div>
    );
};

export default Home;
