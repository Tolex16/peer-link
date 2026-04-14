import { useState } from "react";
import { FiHeart, FiMessageCircle, FiSend, FiBookmark } from "react-icons/fi";
import tech from "../../assets/tech.jpg";
import strangerThings2 from "../../assets/stranger-things-hd.jpg";
import beach from "../../assets/beach.jpg";
import hero from "../../assets/network.jpeg";
import golden from "../../assets/goldencorridor.png";
import { toast, ToastContainer } from "react-toastify";

export default function Hero() {
  const [posts, setPosts] = useState([
    {
      id: 1,
      user: "John Doe",
      location: "Lagos, Nigeria",
      time: "2h",
      image: tech,
      content: "Just built something cool 🚀",
      liked: false,
      likes: 12,
      comments: ["🔥🔥", "Nice one!"],
      following: false,
    },
    {
      id: 2,
      user: "Jane Smith",
      location: "Lagos, Nigeria",
      time: "5h",
      image: beach,
      content: "Lagos sunsets hit different 🌇",
      liked: false,
      likes: 25,
      comments: ["Beautiful!", "Where is this?", "What a cool view"],
      following: true,
    },
    {
      id: 3,
      user: "Alex King",
      location: "Port Harcourt",
      time: "1d",
      image: golden,
      content: "Grinding hard 💻",
      liked: false,
      likes: 40,
      comments: ["Respect 💯"],
      following: false,
    },
    {
      id: 4,
      user: "Mary Ann",
      location: "Enugu",
      time: "3d",
      image: hero,
      content: "Networking is everything 🤝",
      liked: false,
      likes: 18,
      comments: ["True talk"],
      following: false,
    },
    {
      id: 5,
      user: "David O",
      location: "Ibadan",
      time: "1w",
      image: strangerThings2,
      content: "Just joined PeerLink 🔥",
      liked: false,
      likes: 60,
      comments: ["Welcome!", "Let’s connect"],
      following: false,
    },
  ]);

  const [activeComment, setActiveComment] = useState(null);
  const [newComment, setNewComment] = useState("");
  const [heartPop, setHeartPop] = useState(null); // 🔥 animation state

  // 🔥 Like toggle
  const handleLike = (id) => {
    setPosts((prev) =>
      prev.map((post) =>
        post.id === id
          ? {
              ...post,
              liked: !post.liked,
              likes: post.liked ? post.likes - 1 : post.likes + 1,
            }
          : post,
      ),
    );
  };

  // 🔥 Double click animation
  const handleDoubleClick = (id) => {
    handleLike(id);
    setHeartPop(id);

    setTimeout(() => setHeartPop(null), 600);
  };

  // 🔥 Add comment
  const handleComment = (id) => {
    if (!newComment.trim()) return;

    setPosts((prev) =>
      prev.map((post) =>
        post.id === id
          ? {
              ...post,
              comments: [...post.comments, newComment],
            }
          : post,
      ),
    );

    setNewComment("");
  };

  return (
    <div className="flex justify-center mt-29 mb-20 px-4">
      {/* Feed */}
      <div className="w-full max-w-xl space-y-6">
        {posts.map((post) => (
          <div
            key={post.id}
            className="bg-white border border-blue-500 rounded-xl shadow-sm p-4"
          >
            {/* Header */}
            <div className="flex justify-between items-center mb-3">
              <div>
                <p className="font-semibold">{post.user}</p>
                <span className="text-xs text-gray-500">
                  {post.location} • {post.time} ago
                </span>
              </div>

              <button className="text-sm cursor-pointer text-blue-500">
                {post.following ? "Following" : "Follow"}
              </button>
            </div>

            {/* Content */}
            <p className="mb-3">{post.content}</p>

            {/* Image + Like animation */}
            <div
              onDoubleClick={() => handleDoubleClick(post.id)}
              className="relative cursor-pointer"
            >
              <img
                src={post.image}
                alt="post"
                className="w-full h-60 object-cover rounded-lg mb-3 transition duration-300 hover:scale-[1.02]"
              />

              {/* 🔥 Heart Pop Animation */}
              {heartPop === post.id && (
                <div className="absolute inset-0 flex items-center justify-center">
                  <FiHeart className="text-red-500 text-6xl animate-ping" />
                </div>
              )}
            </div>

            {/* Actions */}
            <div className="flex justify-between items-center mb-2">
              <div className="flex gap-4 text-xl">
                <button onClick={() => handleLike(post.id)}>
                  <FiHeart
                    className={`${
                      post.liked ? "text-red-500 cursor-pointer scale-110" : ""
                    } transition`}
                  />
                </button>

                <button className="cursor-pointer" onClick={() => setActiveComment(post.id)}>
                  <FiMessageCircle />
                </button>

                <button className="cursor-pointer" onClick={() => toast.success("Post shared!")}>
                  <FiSend />
                </button>
              </div>

              <FiBookmark className="cursor-pointer" />
            </div>

            {/* Likes */}
            <p className="text-sm font-semibold">{post.likes} likes</p>

            {/* Comments */}
            <div className="mt-2 space-y-1">
              {post.comments.slice(0, 2).map((c, i) => (
                <p key={i} className="text-sm text-gray-700">
                  {c}
                </p>
              ))}
            </div>

            {post.comments.length > 2 && (
              <button
                className="text-xs text-gray-500"
                onClick={() => setActiveComment(post.id)}
              >
                View all comments
              </button>
            )}

            {/* Add Comment */}
            {activeComment === post.id && (
              <div className="mt-3 flex gap-2">
                <input
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                  placeholder="Add a comment..."
                  className="flex-1 border rounded-full px-3 py-1 text-sm"
                />
                <button
                  onClick={() => handleComment(post.id)}
                  className="text-blue-500 text-sm"
                >
                  Post
                </button>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Sidebar */}
      <div className="hidden lg:block w-80 ml-8">
        <h3 className="font-semibold mb-4">Suggested for you</h3>

        {["Alex", "Chinedu", "Blessing", "Tolu","Daniel", "Hilda" ].map((name, i) => (
          <div key={i} className="flex justify-between items-center mb-3">
            <p>{name}</p>
            <button className="text-blue-500 cursor-pointer text-sm">
              Follow
            </button>
          </div>
        ))}
      </div>
      <ToastContainer position="top-right" autoClose={1000} />
    </div>
  );
}
