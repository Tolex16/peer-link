import { useState } from "react";
import Navbar from "../../Components/Navbar";
import { FiHeart, FiMessageCircle, FiX } from "react-icons/fi";
import profilePic from "../../assets/profile.jpeg";
import post1 from "../../assets/post1.jpeg";
import post2 from "../../assets/post2.jpeg";
import post3 from "../../assets/post3.jpg";
import post4 from "../../assets/post4.jpg";
import post5 from "../../assets/post5.jpeg";
import post6 from "../../assets/post6.jpg";
import Footer from "../../Components/Footer";
import { useNavigate } from "react-router-dom";

export default function MyProfile() {
  const [activeTab, setActiveTab] = useState("posts");
  const [selectedPost, setSelectedPost] = useState(null);
  const navigate = useNavigate();

  const posts = [
    { id: 1, image: post1, likes: 1200, comments: 450 },
    { id: 2, image: post2, likes: 4500, comments: 1000 },
    { id: 3, image: post3, likes: 800, comments: 200 },
    { id: 4, image: post4, likes: 6000, comments: 540 },
    { id: 5, image: post5, likes: 5200, comments: 160 },
    { id: 6, image: post6, likes: 3000, comments: 350 },
  ];
  const handleEdit = () => {
    navigate("/edit-profile");
  };
  return (
    <>
      <Navbar />

      <div className="max-w-5xl mx-auto mt-24 px-4">
        {/* HEADER */}
        <div className="flex flex-col md:flex-row items-center gap-8 mb-8">
          {/* Profile Image */}
          <div className="relative">
            <img
              src={profilePic}
              alt="profile"
              className="w-28 h-28 rounded-full object-cover border-4 border-white shadow"
            />
            <span className="absolute bottom-1 right-1 w-4 h-4 bg-green-500 border-2 border-white rounded-full" />
          </div>

          {/* Info */}
          <div className="flex-1 text-center md:text-left">
            <h2 className="text-2xl font-semibold">
              Tochukwu Emmanuel Nna-Edozie
            </h2>

            {/* Stats */}
            <div className="flex justify-center md:justify-start gap-6 text-sm mt-3">
              <span>
                <b>6</b> posts
              </span>
              <span>
                <b>5k</b> followers
              </span>
              <span>
                <b>80</b> following
              </span>
            </div>

            {/* Buttons */}
            <div className="mt-4 flex justify-center md:justify-start gap-2">
              <button
                onClick={handleEdit}
                className="px-5 py-1.5 cursor-pointer border rounded-lg text-sm hover:bg-gray-100"
              >
                Edit Profile
              </button>
            </div>

            {/* Bio */}
            <p className="mt-3 text-sm text-gray-700">
              Fullstack Developer | Building PeerLink 🚀
            </p>
          </div>
        </div>

        {/* STORY HIGHLIGHTS */}
        <div className="flex gap-4 mb-8 overflow-x-auto">
          {["Code", "Life", "Travel"].map((item, i) => (
            <div key={i} className="flex flex-col items-center text-sm">
              <div className="w-16 h-16 bg-gray-200 rounded-full mb-1" />
              {item}
            </div>
          ))}
        </div>

        {/* TABS */}
        <div className="flex justify-center border-t pt-4 mb-6 gap-8 text-sm font-medium">
          <button
            onClick={() => setActiveTab("posts")}
            className={activeTab === "posts" ? "text-black" : "text-gray-400"}
          >
            Posts
          </button>
          <button
            onClick={() => setActiveTab("saved")}
            className={activeTab === "saved" ? "text-black" : "text-gray-400"}
          >
            Saved
          </button>
          <button
            onClick={() => setActiveTab("tagged")}
            className={activeTab === "tagged" ? "text-black" : "text-gray-400"}
          >
            Tagged
          </button>
        </div>

        {/* POSTS GRID */}
        {activeTab === "posts" && (
          <div className="grid grid-cols-3 gap-4">
            {posts.map((post) => (
              <div
                key={post.id}
                onClick={() => setSelectedPost(post)}
                className="relative group cursor-pointer"
              >
                <img
                  src={post.image}
                  alt="post"
                  className="w-full h-82 object-cover"
                />

                {/* Hover overlay */}
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center gap-4 text-white text-sm transition">
                  <span className="flex items-center gap-1">
                    <FiHeart /> {post.likes}
                  </span>
                  <span className="flex items-center gap-1">
                    <FiMessageCircle /> {post.comments}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* EMPTY STATES */}
        {activeTab !== "posts" && (
          <div className="text-center text-gray-400 mt-10">No content yet</div>
        )}
      </div>

      {/* POST MODAL */}
      {selectedPost && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg overflow-hidden max-w-md w-full relative">
            <button
              onClick={() => setSelectedPost(null)}
              className="absolute top-3 right-3 cursor-pointer hover:text-red-800 text-black"
            >
              <FiX size={20} />
            </button>

            <img
              src={selectedPost.image}
              alt="post"
              className="w-full h-80 object-cover"
            />

            <div className="p-4 text-sm">
              <p className="font-semibold">Tochukwu Emmanuel Nna-Edozie</p>
              <p className="text-gray-600 mt-1">
                {selectedPost.likes} likes • {selectedPost.comments} comments
              </p>
            </div>
          </div>
        </div>
      )}
      <Footer />
    </>
  );
}
