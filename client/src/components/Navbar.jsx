import { Link } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { useState } from "react";

function Navbar() {

  const [menuOpen, setMenuOpen] = useState(false);





  const user = JSON.parse(
    localStorage.getItem("user")
  );





  const handleLogout = () => {

    localStorage.removeItem("token");

    localStorage.removeItem("user");

    window.location.href = "/";

  };





  return (

    <nav className="sticky top-0 z-50 bg-white border-b border-gray-200 shadow-sm">

      <div className="max-w-[1600px] mx-auto px-12 py-5 flex items-center justify-between">




        {/* LOGO */}

        <Link
          to="/"
          className="text-5xl font-bold tracking-wide"
          style={{
            fontFamily: "Playfair Display"
          }}
        >
          Scriptly
        </Link>





        {/* DESKTOP MENU */}

        <div className="hidden md:flex items-center gap-12 text-[18px] font-semibold">

          <Link
            to="/"
            className="hover:text-gray-500 transition"
          >
            Home
          </Link>





          <Link
            to="/explore"
            className="hover:text-gray-500 transition"
          >
            Explore
          </Link>





          {

            user?.role === "author" && (

              <>

                <Link
                  to="/dashboard"
                  className="hover:text-gray-500 transition"
                >
                  Dashboard
                </Link>





                <Link
                  to="/create-story"
                  className="hover:text-gray-500 transition"
                >
                  Write
                </Link>

              </>

            )

          }






          {user ? (

            <div className="flex items-center gap-5">

              <p className="text-[18px] font-semibold">
                {user.name}
              </p>





              <button
                onClick={handleLogout}
                className="bg-black text-white text-[16px] px-7 py-3 rounded-full hover:opacity-90 transition"
              >
                Logout
              </button>

            </div>

          ) : (

            <div className="flex items-center gap-5">

              <Link
                to="/login"
                className="hover:text-gray-500 transition"
              >
                Login
              </Link>





              <Link
                to="/signup"
                className="bg-black text-white text-[16px] px-7 py-3 rounded-full hover:opacity-90 transition"
              >
                Get Started
              </Link>

            </div>

          )}

        </div>





        {/* MOBILE BUTTON */}

        <button
          className="md:hidden"
          onClick={() => setMenuOpen(!menuOpen)}
        >

          {

            menuOpen ? (

              <X size={32} />

            ) : (

              <Menu size={32} />

            )

          }

        </button>

      </div>





      {/* MOBILE MENU */}

      {menuOpen && (

        <div className="md:hidden border-t border-gray-200 bg-white px-6 py-6 flex flex-col gap-6 text-lg font-medium">

          <Link
            to="/"
            onClick={() => setMenuOpen(false)}
          >
            Home
          </Link>





          <Link
            to="/explore"
            onClick={() => setMenuOpen(false)}
          >
            Explore
          </Link>





          {

            user?.role === "author" && (

              <>

                <Link
                  to="/dashboard"
                  onClick={() => setMenuOpen(false)}
                >
                  Dashboard
                </Link>





                <Link
                  to="/create-story"
                  onClick={() => setMenuOpen(false)}
                >
                  Write
                </Link>

              </>

            )

          }






          {user ? (

            <>

              <p className="font-semibold">
                {user.name}
              </p>





              <button
                onClick={handleLogout}
                className="bg-black text-white px-5 py-3 rounded-xl"
              >
                Logout
              </button>

            </>

          ) : (

            <>

              <Link
                to="/login"
                onClick={() => setMenuOpen(false)}
              >
                Login
              </Link>





              <Link
                to="/signup"
                onClick={() => setMenuOpen(false)}
                className="bg-black text-white px-5 py-3 rounded-xl text-center"
              >
                Get Started
              </Link>

            </>

          )}

        </div>

      )}

    </nav>

  );

}

export default Navbar;