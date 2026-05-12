import { useState } from "react";
import { useNavigate } from "react-router-dom";


function Login() {

  const navigate = useNavigate();

  const [formData, setFormData] = useState({

    email: "",
    password: "",

  });





  const handleChange = (e) => {

    setFormData({

      ...formData,

      [e.target.name]: e.target.value,

    });

  };





  const handleSubmit = async (e) => {

  e.preventDefault();

  console.log("LOGIN CLICKED");

  try {

    const res = await fetch(
      "https://scriptly-f836.onrender.com/login",
      {

        method: "POST",

        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify(formData),

      }
    );

    const data = await res.json();

    console.log(data);

    if (res.ok) {

      localStorage.setItem(
        "token",
        data.token
      );

      localStorage.setItem(
        "user",
        JSON.stringify(data.user)
      );

      window.location.href = "/";

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

    <div className="min-h-screen flex items-center justify-center bg-gray-50">

      <form
        onSubmit={handleSubmit}
        className="bg-white p-10 rounded-3xl shadow-sm w-full max-w-md space-y-6"
      >

        <h1 className="text-4xl font-bold">
          Login
        </h1>





        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          className="w-full border border-gray-300 rounded-2xl px-5 py-4 outline-none"
        />





        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          className="w-full border border-gray-300 rounded-2xl px-5 py-4 outline-none"
        />





        <button
          type="submit"
          className="w-full bg-black text-white py-4 rounded-2xl font-medium"
        >
          Login
        </button>

      </form>

    </div>

  );

}

export default Login;