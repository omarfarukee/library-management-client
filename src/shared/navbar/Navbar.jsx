
import { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { FaHome } from "react-icons/fa";
import logo from "../../images/logo/pngwing.com (8).png"
import { useUserData } from "../../Hooks/Hooks";
import { useToasts } from "react-toast-notifications";
import { MdAdminPanelSettings } from "react-icons/md";
import { FaUserTag } from "react-icons/fa";
import { BsCart } from "react-icons/bs";
import { useQuery } from "react-query";

const Navbar = () => {
  const userData = useUserData()
  // console.log(userData?.user)
  const { addToast } = useToasts();
  const handleLogout = () => {
    sessionStorage.removeItem('userData')
    addToast('User log out', { appearance: 'success' })
    window.location.reload();

  }
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
  const { data: carts = []} = useQuery({
    queryKey: ['carts'],
    queryFn: async () => {
        const res = await fetch(`http://localhost:5000/api/cart/Fetch`);
        const data = await res.json();
        return data;
    }
});
const filterCart = carts?.data?.filter(cart => cart?.email === userData?.user?.email)
const myCartLength = filterCart?.length

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
          <div
            className="relative h-10 overflow-hidden text-lg font-bold leading-6 text-black uppercase cursor-pointer group">
            <NavLink className={({ isActive }) =>
              isActive
                ? 'text-blue-500'
                : 'text-black'
            } to="/allBooks/Category">
              <span className="group-hover:-translate-y-[120%] inline-block p-1 transition duration-500 ease-out">
                <p className="flex items-center gap-1">Books_Catelogue<FaHome /></p>
              </span>
            </NavLink>
            <NavLink className={({ isActive }) =>
              isActive
                ? 'text-blue-500'
                : 'text-black'
            } to="/allBooks/Category">
              <span className="absolute left-0 rotate-12 inline-block translate-y-[160%] p-1 transition duration-500 ease-out group-hover:-translate-y-0 group-hover:rotate-0">
                <p className="flex items-center gap-1">Books_Catelogue<FaHome /></p>
              </span>
            </NavLink>
          </div>
        </div>
        <div className="" >
          <div className="flex items-center gap-1">
            <div className="flex items-center gap-3">
             <NavLink to="/myCart"><p className="text-4xl"><BsCart /></p> <p className="absolute w-2 ml-8 font-bold bottom-11">{myCartLength}</p></NavLink> 
              {userData?.user?.role === "admin" && <NavLink to='/myProfile'><MdAdminPanelSettings className="text-4xl" />
              </NavLink>}
              {userData?.user?.role === "buyer" && <NavLink to='/myProfile'><FaUserTag className="text-4xl" />
              </NavLink>}
            </div>
            {userData?.user ? <h1 onClick={() => handleLogout()} className="text-lg font-bold cursor-pointer">Log-out</h1>
              : <NavLink to="/SignUp"><h1 className="text-lg font-bold">Sign up</h1></NavLink>}

          </div>
        </div>

      </div>
    </div>
  );
};

export default Navbar;