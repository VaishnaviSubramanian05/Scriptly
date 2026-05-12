function Profile() {

  const stories = [
    {
      id: 1,
      title: "Building Better Habits",
      category: "Productivity",
      date: "May 15, 2026",
    },

    {
      id: 2,
      title: "How AI is Changing Design",
      category: "Technology",
      date: "May 10, 2026",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">

      <div className="max-w-6xl mx-auto px-6 py-12">

        {/* PROFILE HEADER */}

        <div className="bg-white border border-gray-200 rounded-3xl p-8 mb-10">

          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-8">

            <div className="flex items-center gap-6">

              <img
                src="https://i.pravatar.cc/150?img=32"
                alt=""
                className="w-24 h-24 rounded-full object-cover"
              />

              <div>

                <h1 className="text-3xl font-bold">
                  Karthika
                </h1>

                <p className="text-gray-500 mt-2">
                  Writer • Storyteller • Tech Enthusiast
                </p>

                <div className="flex gap-6 mt-4 text-sm text-gray-500">

                  <p>
                    12 Stories
                  </p>

                  <p>
                    1.2K Followers
                  </p>

                  <p>
                    Joined 2026
                  </p>

                </div>

              </div>

            </div>





            {/* EDIT PROFILE BUTTON */}

            <button className="border border-gray-300 px-6 py-3 rounded-xl font-medium w-fit">
              Edit Profile
            </button>

          </div>

        </div>





        {/* STORIES SECTION */}

        <div className="bg-white border border-gray-200 rounded-3xl p-8">

          <div className="flex items-center justify-between mb-8">

            <h2 className="text-2xl font-bold">
              Published Stories
            </h2>

            <button className="text-sm font-medium">
              View All
            </button>

          </div>





          {/* STORY LIST */}

          <div className="space-y-6">

            {stories.map((story) => (

              <div
                key={story.id}
                className="border border-gray-200 rounded-2xl p-6"
              >

                <p className="text-sm text-gray-500 mb-3">
                  {story.category}
                </p>

                <h3 className="text-2xl font-bold mb-3">
                  {story.title}
                </h3>

                <p className="text-sm text-gray-500">
                  Published on {story.date}
                </p>

              </div>

            ))}

          </div>

        </div>

      </div>

    </div>
  );
}

export default Profile;