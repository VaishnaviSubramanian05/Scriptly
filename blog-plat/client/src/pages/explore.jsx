import { Search } from "lucide-react";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

function Explore() {

  const [blogs, setBlogs] = useState([]);

  const [search, setSearch] = useState("");

  const [currentPage, setCurrentPage] = useState(1);





  useEffect(() => {

    fetch("http://localhost:5000/blogs")

      .then((res) => res.json())

      .then((data) => setBlogs(data))

      .catch((err) => console.log(err));

  }, []);





  const filteredBlogs = blogs.filter((blog) =>

    blog.title
      .toLowerCase()
      .includes(search.toLowerCase())

  );





  const blogsPerPage = 6;

  const lastIndex = currentPage * blogsPerPage;

  const firstIndex = lastIndex - blogsPerPage;

  const currentBlogs = filteredBlogs.slice(
    firstIndex,
    lastIndex
  );





  const totalPages = Math.ceil(
    filteredBlogs.length / blogsPerPage
  );





  return (

    <div className="max-w-7xl mx-auto px-6 py-14">




      {/* TOP */}

      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6 mb-12">

        <div>

          <h1 className="text-5xl font-bold tracking-tight">
            Explore Stories
          </h1>

          <p className="text-gray-500 mt-3">
            Discover ideas and stories.
          </p>

        </div>





        {/* SEARCH */}

        <div className="flex items-center gap-3 border border-gray-300 px-4 py-3 rounded-full w-full md:w-[350px]">

          <Search size={18} className="text-gray-500" />

          <input
            type="text"
            placeholder="Search stories..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full outline-none"
          />

        </div>

      </div>





      {/* BLOGS */}

      <div className="grid md:grid-cols-3 gap-8">

        {currentBlogs.map((blog) => (

          <Link
            to={`/story/${blog._id}`}
            key={blog._id}
            className="bg-white border border-gray-200 rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition duration-300 block"
          >

            <img
              src={blog.image}
              alt=""
              className="h-56 w-full object-cover"
            />





            <div className="p-6">

              <p className="text-sm text-gray-500 mb-3">
                {blog.category}
              </p>

              <h2 className="text-xl font-bold mb-3">
                {blog.title}
              </h2>

              <p className="text-gray-600 text-sm leading-6">
                {blog.desc}
              </p>

              <button className="mt-6 text-sm font-semibold">
                Read More →
              </button>

            </div>

          </Link>

        ))}

      </div>





      {/* PAGINATION */}

      <div className="flex justify-center gap-4 mt-16">

        {[...Array(totalPages)].map((_, index) => (

          <button
            key={index}
            onClick={() => setCurrentPage(index + 1)}
            className={`px-4 py-2 rounded-xl border ${
              currentPage === index + 1
                ? "bg-black text-white"
                : ""
            }`}
          >
            {index + 1}
          </button>

        ))}

      </div>

    </div>

  );

}

export default Explore;