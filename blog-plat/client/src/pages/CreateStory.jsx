import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";

function CreateStory() {

  const user = JSON.parse(
  localStorage.getItem("user")
);

if (!user) {

  return <Navigate to="/login" />;

}
  

if (!user || user.role !== "author") {

  return <Navigate to="/login" />;

}

  const [formData, setFormData] = useState({

  title: "",
  category: "",
  image: "",
  desc: "",
  content: "",

});

useEffect(() => {

  const savedDraft = JSON.parse(
    localStorage.getItem("editDraft")
  );





  const editBlog = JSON.parse(
    localStorage.getItem("editBlog")
  );





  if (savedDraft) {

    setFormData(savedDraft);

  }





  if (editBlog) {

    setFormData(editBlog);

  }

}, []);





  const handleChange = (e) => {

    setFormData({

      ...formData,

      [e.target.name]: e.target.value,

    });

  };





  const handleSubmit = async (e) => {

    e.preventDefault();

    const user = JSON.parse(
  localStorage.getItem("user")
);

    try {

      const res = await fetch(
        "http://localhost:5000/create-blog",
        {

          method: "POST",

          headers: {
            "Content-Type": "application/json",
          },

          body: JSON.stringify({

  ...formData,

  author: user.name,

}),

        }
      );





      const data = await res.json();

      console.log(data);

      alert("Story published successfully");

      localStorage.removeItem("editDraft");





const drafts = JSON.parse(
  localStorage.getItem("drafts")
) || [];





const updatedDrafts = drafts.filter(
  (draft) => draft.title !== formData.title
);





localStorage.setItem(
  "drafts",
  JSON.stringify(updatedDrafts)
);



      setFormData({

        title: "",
        

      });

    }

    catch (err) {

      console.log(err);

    }

  };





  return (

    <div className="min-h-screen bg-gray-50">

      <div className="max-w-4xl mx-auto px-6 py-12">




        {/* PAGE HEADER */}

        <div className="mb-10">

          <h1 className="text-5xl font-bold tracking-tight">
            Create Story
          </h1>

          <p className="text-gray-500 mt-3">
            Share your ideas, knowledge and creativity with the world.
          </p>

        </div>





        {/* FORM */}

        <div className="bg-white border border-gray-200 rounded-3xl p-8 shadow-sm">

          <form
            className="space-y-8"
            onSubmit={handleSubmit}
          >




            {/* TITLE */}

            <div>

              <label className="block text-sm font-medium mb-3">
                Story Title
              </label>

              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                placeholder="Enter your story title..."
                className="w-full border border-gray-300 rounded-2xl px-5 py-4 outline-none text-lg"
              />

            </div>





            {/* CATEGORY */}

            <div>

              <label className="block text-sm font-medium mb-3">
                Category
              </label>

              <select
                name="category"
                value={formData.category}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-2xl px-5 py-4 outline-none"
              >

                <option value="">Select Category</option>

                <option value="Technology">Technology</option>

                <option value="Business">Business</option>

                <option value="Startup">Startup</option>

                <option value="Lifestyle">Lifestyle</option>

                <option value="Productivity">Productivity</option>

              </select>

            </div>





            {/* IMAGE */}

            <div>

              <label className="block text-sm font-medium mb-3">
                Cover Image URL
              </label>

              <input
                type="text"
                name="image"
                value={formData.image}
                onChange={handleChange}
                placeholder="Paste image URL..."
                className="w-full border border-gray-300 rounded-2xl px-5 py-4 outline-none"
              />

            </div>





            {/* DESCRIPTION */}

            <div>

              <label className="block text-sm font-medium mb-3">
                Short Description
              </label>

              <input
                type="text"
                name="desc"
                value={formData.desc}
                onChange={handleChange}
                placeholder="Short blog description..."
                className="w-full border border-gray-300 rounded-2xl px-5 py-4 outline-none"
              />

            </div>










            {/* CONTENT */}

            <div>

              <label className="block text-sm font-medium mb-3">
                Story Content
              </label>

              <textarea
                rows="14"
                name="content"
                value={formData.content}
                onChange={handleChange}
                placeholder="Start writing your story..."
                className="w-full border border-gray-300 rounded-2xl px-5 py-4 outline-none resize-none"
              ></textarea>

            </div>





            {/* BUTTONS */}

            <div className="flex gap-4">

              <button
  type="button"
  onClick={() => {

    const drafts = JSON.parse(
      localStorage.getItem("drafts")
    ) || [];





    drafts.push(formData);





    localStorage.setItem(
      "drafts",
      JSON.stringify(drafts)
    );





    alert("Draft saved");

  }}
  className="border border-gray-300 px-6 py-3 rounded-xl font-medium"
>

  Save Draft

</button>

              <button
                type="submit"
                className="bg-black text-white px-6 py-3 rounded-xl font-medium"
              >
                Publish Story
              </button>

            </div>

          </form>

        </div>

      </div>

    </div>

  );

}

export default CreateStory;