import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

function Home() {

  const user = JSON.parse(
    localStorage.getItem("user")
  );





  const [blogs, setBlogs] = useState([]);





  useEffect(() => {

    fetch("https://scriptly-f836.onrender.com/blogs")

      .then((res) => res.json())

      .then((data) => setBlogs(data))

      .catch((err) => console.log(err));

  }, []);





  return (

    <div>

      {/* HERO SECTION */}

      <section className="max-w-7xl mx-auto px-6 py-20">

        <div className="max-w-3xl">

          <h1 className="text-6xl font-bold leading-tight tracking-tight">

            Discover stories,
            thinking,
            and ideas.

          </h1>





          <p className="mt-6 text-lg text-gray-600 leading-8">

            Scriptly is a modern publishing platform where
            writers share ideas, stories, and knowledge with the world.

          </p>





          <div className="mt-8 flex gap-4">

            <Link
              to="/explore"
              className="bg-black text-white px-8 py-4 rounded-full text-lg font-medium"
            >
              Start Reading
            </Link>





            {

              user?.role !== "author" && (

                <Link
                  to="/signup"
                  className="border border-gray-300 px-8 py-4 rounded-full text-lg font-medium"
                >
                  Become Author
                </Link>

              )

            }

          </div>

        </div>

      </section>





      {/* TRENDING STORIES */}

      <section className="max-w-7xl mx-auto px-6 pb-20">

        <h2 className="text-2xl font-bold mb-10">
          Trending Stories
        </h2>





        <div className="grid md:grid-cols-3 gap-8">

          {[...blogs]

            .sort(
              (a, b) =>
                (b.commentsCount || 0) -
                (a.commentsCount || 0)
            )

            .slice(0, 3)

            .map((blog) => (

              <Link
                to={`/story/${blog._id}`}
                key={blog._id}
                className="bg-white border border-gray-200 rounded-2xl overflow-hidden hover:shadow-xl transition"
              >

                <img
                  src={
                    blog.image ||
                    "https://images.unsplash.com/photo-1499750310107-5fef28a66643?q=80&w=1200&auto=format&fit=crop"
                  }
                  alt=""
                  className="h-52 w-full object-cover"
                />





                <div className="p-6">

                  <p className="text-sm text-gray-500 mb-3">
                    {blog.category}
                  </p>

                  <h3 className="text-xl font-bold mb-3">
                    {blog.title}
                  </h3>

                  <p className="text-gray-600 text-sm leading-6">
                    {blog.desc}
                  </p>

                </div>

              </Link>

            ))}

        </div>

      </section>





      {/* FOOTER */}

      <footer className="max-w-7xl mx-auto px-6 py-10 flex flex-col md:flex-row items-center justify-between text-sm text-gray-500">

        <p>
          © 2026 Scriptly. All rights reserved.
        </p>





        <div className="flex gap-6 mt-4 md:mt-0">

          <p>About</p>

          <p>Contact</p>

          <p>Privacy</p>

        </div>

      </footer>

    </div>

  );

}

export default Home;