import { BrowserRouter, Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";

import Home from "./pages/home";
import Explore from "./pages/explore";
import StoryDetails from "./pages/StoryDetails";
import CreateStory from "./pages/CreateStory";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/login";
import Signup from "./pages/Signup";

function App() {

  return (

    <BrowserRouter>

      <Navbar />

      <Routes>

        <Route path="/" element={<Home />} />

        <Route path="/explore" element={<Explore />} />

        <Route path="/story/:id" element={<StoryDetails />} />

        <Route path="/create-story" element={<CreateStory />} />

        <Route path="/dashboard" element={<Dashboard />} />

        <Route path="/login" element={<Login />} />

        <Route path="/signup" element={<Signup />} />

      </Routes>

    </BrowserRouter>

  );

}

export default App;