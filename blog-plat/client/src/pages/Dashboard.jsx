import { useEffect, useState } from "react";
import { Link, Navigate } from "react-router-dom";

function Dashboard() {

  const user = JSON.parse(
    localStorage.getItem("user")
  );





  if (!user || user.role !== "author") {

    return <Navigate to="/login" />;

  }





  const [blogs, setBlogs] = useState([]);





  const drafts = JSON.parse(
    localStorage.getItem("drafts")
  ) || [];





  const totalPosts = blogs.length;

  const totalDrafts = drafts.length;

  const [totalComments, setTotalComments] = useState(0);





  useEffect(() => {

    fetch("http://localhost:5000/blogs")

      .then((res) => res.json())

      .then((data) => {

        const filteredBlogs = data.filter(

          (blog) => blog.author === user.name

        );

        setBlogs(filteredBlogs);

        const total = filteredBlogs.reduce(

  (acc, blog) =>

    acc + (blog.commentsCount || 0),

  0

);





setTotalComments(total);

      })

      .catch((err) => console.log(err));

  }, []);





  return (

    <div className="min-h-screen bg-gray-50">

      <div className="max-w-7xl mx-auto px-6 py-12">




        {/* TOP */}

        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6 mb-12">

          <div>

            <h1 className="text-5xl font-bold">
              Welcome, {user.name}
            </h1>

            <p className="text-gray-500 mt-3">
              Manage your stories and track your content.
            </p>

          </div>





          <Link
            to="/create-story"
            className="bg-black text-white px-6 py-4 rounded-2xl font-medium"
          >
            + Create Story
          </Link>

        </div>





        {/* STATS */}

        <div className="grid md:grid-cols-3 gap-6 mb-12">

          <div className="bg-white rounded-3xl p-8 border">

            <h3 className="text-gray-500 mb-3">
              Total Posts
            </h3>

            <h1 className="text-5xl font-bold">
              {totalPosts}
            </h1>

          </div>





          <div className="bg-white rounded-3xl p-8 border">

            <h3 className="text-gray-500 mb-3">
              Saved Drafts
            </h3>

            <h1 className="text-5xl font-bold">
              {totalDrafts}
            </h1>

          </div>





          <div className="bg-white rounded-3xl p-8 border">

            <h3 className="text-gray-500 mb-3">
              Total Comments
            </h3>

            <h1 className="text-5xl font-bold">
              {totalComments}
            </h1>

          </div>

        </div>





        {/* PUBLISHED STORIES */}

        <h2 className="text-3xl font-bold mb-6">

          Published Stories

        </h2>





        <div className="grid md:grid-cols-3 gap-8">

          {blogs.map((blog) => (

            <div
              key={blog._id}
              className="bg-white rounded-3xl overflow-hidden border hover:shadow-xl transition"
            >

              <img
                src={blog.image}
                alt=""
                className="h-56 w-full object-cover"
              />





              <div className="p-6">

                <p className="text-sm text-gray-500 mb-2">
                  {blog.category}
                </p>

                <h2 className="text-2xl font-bold mb-3">
                  {blog.title}
                </h2>

                <p className="text-gray-600 text-sm leading-6">
                  {blog.desc}
                </p>





                <div className="flex gap-3 mt-6">

  <Link
    to={`/story/${blog._id}`}
    className="bg-black text-white px-4 py-2 rounded-xl text-sm"
  >
    View
  </Link>





  





  <button

  onClick={async () => {

    await fetch(

      `http://localhost:5000/blogs/${blog._id}`,

      {
        method: "DELETE",
      }

    );





    setBlogs(

      blogs.filter(
        (b) => b._id !== blog._id
      )

    );

  }}

  className="border border-red-500 text-red-500 px-4 py-2 rounded-xl text-sm"

>

  Delete

</button>

</div>

              </div>

            </div>

          ))}

        </div>





        {/* DRAFTS */}

        <h2 className="text-3xl font-bold mt-16 mb-6">

          Drafts

        </h2>





        {

          drafts.length === 0 ? (

            <div className="bg-white border rounded-3xl p-10 text-center text-gray-500">

              No drafts found

            </div>

          ) : (

            <div className="grid md:grid-cols-3 gap-8">

              {drafts.map((draft, index) => (

                <div
                  key={index}
                  className="bg-white border rounded-3xl overflow-hidden"
                >

                  <img
                    src={draft.image}
                    alt=""
                    className="h-56 w-full object-cover"
                  />





                  <div className="p-6">

                    <p className="text-sm text-gray-500 mb-2">
                      Draft
                    </p>

                    <h2 className="text-2xl font-bold mb-3">
                      {draft.title}
                    </h2>

                    <p className="text-gray-600 text-sm leading-6">
                      {draft.desc}
                    </p>





                    <button

                      onClick={() => {

                        localStorage.setItem(
                          "editDraft",
                          JSON.stringify(draft)
                        );

                        window.location.href = "/create-story";

                      }}

                      className="mt-6 bg-black text-white px-5 py-3 rounded-xl text-sm"

                    >

                      Edit

                    </button>

                  </div>

                </div>

              ))}

            </div>

          )

        }

      </div>

    </div>

  );

}

export default Dashboard;