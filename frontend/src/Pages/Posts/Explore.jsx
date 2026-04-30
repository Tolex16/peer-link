import { useState } from "react";
import { FiHeart, FiMessageCircle, FiSearch } from "react-icons/fi";
import explore1 from "../../assets/explore1.jpg";
import explore2 from "../../assets/explore2.jpg";
import explore3 from "../../assets/explore3.png";
import explore4 from "../../assets/explore4.jpg";
import explore5 from "../../assets/explore5.jpg";
import explore6 from "../../assets/explore6.png";
import explore7 from "../../assets/explore7.jpg";
import explore8 from "../../assets/explore8.jpg";
import explore9 from "../../assets/explore9.jpg";
import Footer from "../../Components/Footer";
import Navbar from "../../Components/Navbar";

export default function Explore() {
  const [selectedPost, setSelectedPost] = useState(null);

  const posts = [
    {
      id: 1,
      image: explore1,
      likes: 120,
      comments: 14,
      user: "John Doe",
      caption: "Nature vibes 🌿",
    },
    {
      id: 2,
      image: explore2,
      likes: 80,
      comments: 10,
      user: "Jane",
      caption: "City life 🌆",
    },
    {
      id: 3,
      image: explore3,
      likes: 200,
      comments: 45,
      user: "Alex",
      caption: "Coding all night 💻",
    },
    {
      id: 4,
      image: explore4,
      likes: 300,
      comments: 60,
      user: "Mary",
      caption: "Style check ✨",
    },
    {
      id: 5,
      image: explore5,
      likes: 150,
      comments: 20,
      user: "David",
      caption: "Stay fit 💪",
    },
    {
      id: 6,
      image: explore6,
      likes: 150,
      comments: 20,
      user: "David",
      caption: "Stay fit 💪",
    },
    {
      id: 7,
      image: explore7,
      likes: 150,
      comments: 20,
      user: "David",
      caption: "Stay fit 💪",
    },
    {
      id: 8,
      image: explore8,
      likes: 150,
      comments: 20,
      user: "David",
      caption: "Stay fit 💪",
    },
    {
      id: 9,
      image: explore9,
      likes: 150,
      comments: 20,
      user: "David",
      caption: "Stay fit 💪",
    },
  ];

  return (
    <>
      <Navbar />
      <div className="max-w-6xl mx-auto mt-24 mb-20 px-4">
        {/* 🔍 Search */}
        <div className="flex items-center gap-2 mb-6 border rounded-xl px-4 py-2">
          <FiSearch />
          <input
            placeholder="Search users, posts..."
            className="outline-none w-full"
          />
        </div>

        {/* 🔥 Trending Tags */}
        <div className="flex gap-3 mb-6 overflow-x-auto">
          {["#Tech", "#Lagos", "#Fitness", "#Music", "#Startups"].map((tag) => (
            <span
              key={tag}
              className="px-4 py-1 bg-gray-100 rounded-full text-sm cursor-pointer hover:bg-gray-200"
            >
              {tag}
            </span>
          ))}
        </div>

        {/* 🧱 Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          {posts.map((post) => (
            <div
              key={post.id}
              className="relative group cursor-pointer"
              onClick={() => setSelectedPost(post)}
            >
              <img
                src={post.image}
                alt=""
                className="w-full h-full object-cover rounded-lg"
              />

              {/* 🔥 Hover Overlay */}
              <div
                className="absolute inset-0 bg-black/40 opacity-0 
              group-hover:opacity-100 flex items-center justify-center gap-6 
              text-white transition"
              >
                <div className="flex items-center gap-1">
                  <FiHeart /> {post.likes}
                </div>
                <div className="flex items-center gap-1">
                  <FiMessageCircle /> {post.comments}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* 🔥 MODAL VIEW */}
        {selectedPost && (
          <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
            <div className="bg-white rounded-xl overflow-hidden max-w-3xl w-full flex">
              {/* Image */}
              <img src={selectedPost.image} className="w-1/2 object-cover" />

              {/* Details */}
              <div className="p-4 flex flex-col justify-between w-1/2">
                <div>
                  <h3 className="font-semibold">{selectedPost.user}</h3>
                  <p className="text-sm text-gray-600 mt-2">
                    {selectedPost.caption}
                  </p>
                </div>

                <button
                  onClick={() => setSelectedPost(null)}
                  className="mt-4 text-red-500 cursor-pointer"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
      <Footer />
    </>
  );
}
