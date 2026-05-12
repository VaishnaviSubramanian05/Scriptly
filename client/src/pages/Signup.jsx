import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Signup() {

  const navigate = useNavigate();





  const [formData, setFormData] = useState({

    name: "",
    email: "",
    password: "",
    role: "user",

  });





  const handleChange = (e) => {

    setFormData({

      ...formData,

      [e.target.name]: e.target.value,

    });

  };





  const handleSubmit = async (e) => {

    e.preventDefault();





    try {

      const res = await fetch(
        "https://scriptly-f836.onrender.com/signup",
        {

          method: "POST",

          headers: {
            "Content-Type": "application/json",
          },

          body: JSON.stringify(formData),

        }
      );





      const data = await res.json();





      if (res.ok) {

        alert("Signup successful");

        navigate("/login");

      }

      else {

        alert(data.message);

      }

    }

    catch (err) {

      console.log(err);

    }

  };





  return (

    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-6">

      <div className="bg-white w-full max-w-md p-8 rounded-3xl border border-gray-200 shadow-sm">

        <h1 className="text-4xl font-bold mb-2">
          Create Account
        </h1>





        <p className="text-gray-500 mb-8">
          Join Scriptly and start exploring stories.
        </p>





        <form
          onSubmit={handleSubmit}
          className="space-y-5"
        >




          <input
            type="text"
            name="name"
            placeholder="Full Name"
            value={formData.name}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-xl px-4 py-3 outline-none"
          />





          <input
            type="email"
            name="email"
            placeholder="Email Address"
            value={formData.email}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-xl px-4 py-3 outline-none"
          />





          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-xl px-4 py-3 outline-none"
          />





          <select
            name="role"
            value={formData.role}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-xl px-4 py-3 outline-none"
          >

            <option value="user">
              User
            </option>

            <option value="author">
              Author
            </option>

          </select>





          <button className="w-full bg-black text-white py-3 rounded-xl font-medium">

            Create Account

          </button>

        </form>

      </div>

    </div>

  );

}

export default Signup;