import { Pencil, Trash2 } from "lucide-react";

function Drafts() {

  const drafts = [
    {
      id: 1,
      title: "The Psychology of Great Design",
      category: "Design",
      updated: "2 hours ago",
    },

    {
      id: 2,
      title: "Why Consistency Wins",
      category: "Productivity",
      updated: "Yesterday",
    },

    {
      id: 3,
      title: "The Future of Remote Work",
      category: "Business",
      updated: "3 days ago",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">

      <div className="max-w-6xl mx-auto px-6 py-12">

        {/* HEADER */}

        <div className="mb-10">

          <h1 className="text-5xl font-bold tracking-tight">
            Your Drafts
          </h1>

          <p className="text-gray-500 mt-3">
            Continue editing and publish your unfinished stories.
          </p>

        </div>





        {/* DRAFT GRID */}

        <div className="grid md:grid-cols-2 gap-8">

          {drafts.map((draft) => (

            <div
              key={draft.id}
              className="bg-white border border-gray-200 rounded-3xl p-7 shadow-sm"
            >

              <div className="flex items-start justify-between mb-6">

                <div>

                  <p className="text-sm text-gray-500 mb-2">
                    {draft.category}
                  </p>

                  <h2 className="text-2xl font-bold">
                    {draft.title}
                  </h2>

                </div>

                <span className="bg-yellow-100 text-yellow-700 text-xs px-3 py-1 rounded-full">
                  Draft
                </span>

              </div>





              <p className="text-sm text-gray-500 mb-8">
                Last updated {draft.updated}
              </p>





              {/* ACTION BUTTONS */}

              <div className="flex gap-4">

                <button className="flex items-center gap-2 bg-black text-white px-5 py-3 rounded-xl text-sm">

                  <Pencil size={16} />

                  Edit Draft

                </button>





                <button className="flex items-center gap-2 border border-red-300 text-red-600 px-5 py-3 rounded-xl text-sm">

                  <Trash2 size={16} />

                  Delete

                </button>

              </div>

            </div>

          ))}

        </div>

      </div>

    </div>
  );
}

export default Drafts;