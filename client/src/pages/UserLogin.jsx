import { useState } from "react";

function UserLogin() {

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





    if (res.ok && data.user.role === "user") {

      localStorage.setItem(
        "user",
        JSON.stringify(data.user)
      );

      localStorage.setItem(
        "token",
        data.token
      );

      window.location.href = "/";

    }

    else {

      alert("Not a user account");

    }

  };





  return (

    <div className="min-h-screen flex items-center justify-center">

      <form
        onSubmit={handleSubmit}
        className="bg-white p-10 rounded-3xl w-full max-w-md space-y-5 border"
      >

        <h1 className="text-4xl font-bold">
          User Login
        </h1>





        <input
          type="email"
          name="email"
          placeholder="Email"
          onChange={handleChange}
          className="w-full border rounded-xl px-4 py-3"
        />





        <input
          type="password"
          name="password"
          placeholder="Password"
          onChange={handleChange}
          className="w-full border rounded-xl px-4 py-3"
        />





        <button className="w-full bg-black text-white py-3 rounded-xl">

          Login

        </button>

      </form>

    </div>

  );

}

export default UserLogin;