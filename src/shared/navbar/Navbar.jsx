
import { useState, useEffect } from "react";
import { NavLink} from "react-router-dom";
import { FaHome } from "react-icons/fa";
import logo from "../../images/logo/pngwing.com (8).png"
const Navbar = () => {


  // console.log(userData)
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const offset = window.scrollY;
      if (offset > 100) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div
      className={`fixed w-full z-50 bg-transparent transition-all duration-300 ${scrolled ? "bg-transparent backdrop-blur-lg shadow-md" : ""
        }`}
    >
      <div className="flex justify-between p-2 border ">
        <div className="relative h-12 overflow-hidden text-2xl leading-6 text-black uppercase cursor-pointer group">
          <NavLink to="/">
            <img
              src={logo}
              className="w-14 group-hover:-translate-y-[120%] inline-block p-1 transition duration-500 ease-out"
              alt=""
            />
          </NavLink>
          <NavLink to="/">
            <img
              src={logo}
              className="w-14 absolute left-0 rotate-12 inline-block translate-y-[120%] p-1 transition duration-500 ease-out group-hover:-translate-y-0 group-hover:rotate-0"
              alt=""
            />
          </NavLink>
        </div>
        <div className="flex gap-5 ">
          <div
           className="relative h-10 overflow-hidden text-lg font-bold leading-6 text-black uppercase cursor-pointer group">
            <NavLink className={({ isActive }) =>
              isActive
              ? 'text-blue-500'
              : 'text-black'
            } to="/home">
              <span className="group-hover:-translate-y-[120%] inline-block p-1 transition duration-500 ease-out">
                <p className="flex items-center gap-1">HOME<FaHome /></p>
              </span>
            </NavLink>
            <NavLink className={({ isActive }) =>
              isActive
              ? 'text-blue-500'
              : 'text-black'
            } to="/home">
              <span className="absolute left-0 rotate-12 inline-block translate-y-[120%] p-1 transition duration-500 ease-out group-hover:-translate-y-0 group-hover:rotate-0">
              <p className="flex items-center gap-1">HOME<FaHome /></p>
              </span>
            </NavLink>
          </div>
        </div>
        <div className="" >
          <div>
           <NavLink to="/SignUp"><h1 className="text-lg font-bold">Sign up</h1></NavLink> 
           
          </div>
        </div>

      </div>
    </div>
  );
};

export default Navbar;