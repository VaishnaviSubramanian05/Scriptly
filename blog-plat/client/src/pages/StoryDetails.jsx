import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function StoryDetails() {

  const { id } = useParams();

  const [blog, setBlog] = useState(null);

  const [likes, setLikes] = useState(0);

const [liked, setLiked] = useState(false);

  const [comment, setComment] = useState("");

const [comments, setComments] = useState([]);




  useEffect(() => {

    fetch(`http://localhost:5000/blogs/${id}`)

      .then((res) => res.json())

      .then((data) => setBlog(data))

      .catch((err) => console.log(err));

  }, [id]);

  useEffect(() => {

  fetch(
    `http://localhost:5000/comments/${id}`
  )

    .then((res) => res.json())

    .then((data) => setComments(data))

    .catch((err) => console.log(err));

}, [id]);



  if (!blog) {

    return (

      <div className="min-h-screen flex items-center justify-center text-2xl font-semibold">

        Loading...

      </div>

    );

  }





  return (

    <div className="min-h-screen bg-gray-50">

      <div className="max-w-4xl mx-auto px-6 py-12">




        {/* CATEGORY */}

        <p className="text-sm text-gray-500 mb-4">

          {blog.category}

        </p>





        {/* TITLE */}

        <h1 className="text-5xl font-bold leading-tight tracking-tight mb-6">

          {blog.title}

        </h1>





        {/* AUTHOR */}

        <div className="flex items-center gap-4 mb-10">

          <img
            src="https://i.pravatar.cc/150?img=32"
            alt=""
            className="w-12 h-12 rounded-full"
          />

          <div>

            <h3 className="font-semibold">

              {blog.author}

            </h3>

            <button
  className="mt-2 bg-black text-white px-4 py-2 rounded-xl text-sm"
>
  Follow
</button>

            <p className="text-sm text-gray-500">

              {blog.date} · {blog.readTime}

            </p>

          </div>

        </div>





        {/* IMAGE */}

        <img
          src={blog.image}
          alt=""
          className="w-full h-[450px] object-cover rounded-3xl mb-12"
        />





        {/* CONTENT */}

        <div className="bg-white border border-gray-200 rounded-3xl p-8">

          <p className="text-gray-700 leading-8 whitespace-pre-line">

            {blog.content}

          </p>
          <button
  onClick={() => {

  if (!liked) {

    setLikes(likes + 1);

    setLiked(true);

  }

}}
  className="mt-8 bg-black text-white px-6 py-3 rounded-xl"
>
  {liked ? "❤️ Liked" : "🤍 Like"} ({likes})
</button>

<div className="mt-10">

  <h2 className="text-2xl font-bold mb-4">
    Comments
  </h2>





  <textarea
    value={comment}
    onChange={(e) => setComment(e.target.value)}
    placeholder="Write comment..."
    className="w-full border rounded-2xl p-4"
  />





  <button
    onClick={async () => {

  const user = JSON.parse(
    localStorage.getItem("user")
  );





  if (!user) {

    alert(
      "Posting comments requires signup"
    );

    window.location.href = "/signup";

    return;

  }





  const res = await fetch(
    "http://localhost:5000/comments",
    {

      method: "POST",

      headers: {
        "Content-Type": "application/json",
      },

      body: JSON.stringify({

        blogId: id,
        userId: user.id,
        userName: user.name,
        text: comment,

      }),

    }
  );





  const data = await res.json();





  setComments([
    data,
    ...comments,
  ]);





  setComment("");

}}
    className="mt-4 bg-black text-white px-5 py-3 rounded-xl"
  >
    Post Comment
  </button>





  <div className="mt-6 space-y-4">

    {comments.map((item, index) => (

      <div
  key={item._id}
  className="bg-gray-100 p-4 rounded-xl"
>

  <div className="flex items-center justify-between mb-2">

    <h3 className="font-semibold">
      {item.userName}
    </h3>





    {

      JSON.parse(
        localStorage.getItem("user")
      )?.id === item.userId ||

      JSON.parse(
        localStorage.getItem("user")
      )?.name === blog.author

      ? (

        <button

          onClick={async () => {

            await fetch(
              `http://localhost:5000/comments/${item._id}`,
              {
                method: "DELETE",
              }
            );





            setComments(

              comments.filter(
                (c) => c._id !== item._id
              )

            );

          }}

          className="text-red-500 text-sm"
        >
          Delete
        </button>

      ) : null

    }

  </div>





  <p>
    {item.text}
  </p>

</div>

    ))}

  </div>

</div>

        </div>

      </div>

    </div>

  );

}

export default StoryDetails;