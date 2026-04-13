import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FiUpload, FiX } from "react-icons/fi";
import Navbar from "../../Components/Navbar";
import { toast, ToastContainer } from "react-toastify";
import Footer from "../../Components/Footer";

export default function CreatePost() {
  const navigate = useNavigate();

  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [caption, setCaption] = useState("");
  const [location, setLocation] = useState("");
  const [loading, setLoading] = useState(false);

  // 📸 Handle image upload
  const handleImage = (file) => {
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      setImage(file);
      setPreview(reader.result);
    };
    reader.readAsDataURL(file);
  };

  // 📦 Drag & drop
  const handleDrop = (e) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    handleImage(file);
  };

  // ❌ Remove image
  const removeImage = () => {
    setImage(null);
    setPreview(null);
  };

  // 🚀 Submit post
  const handleSubmit = () => {
    if (!image) return alert("Upload an image");

    setLoading(true);

    setTimeout(() => {
      setLoading(false);
      toast.success("Post created");
      navigate("/");
    }, 1500);
  };

  return (
    <>
      <Navbar />
      <div className="max-w-5xl mx-auto mt-24 px-4 grid md:grid-cols-2 gap-8">
        {/* LEFT: Upload */}
        <div className="bg-white border rounded-xl p-6">
          <h2 className="font-semibold text-lg mb-4">Create Post</h2>

          {!preview ? (
            <div
              onDrop={handleDrop}
              onDragOver={(e) => e.preventDefault()}
              className="border-2 border-dashed rounded-xl h-64 flex flex-col items-center justify-center text-gray-400 cursor-pointer"
            >
              <FiUpload size={30} />
              <p className="mt-2 text-sm">Drag & drop or click to upload</p>

              <input
                type="file"
                accept="image/*"
                onChange={(e) => handleImage(e.target.files[0])}
                className="hidden"
                id="fileUpload"
              />

              <label
                htmlFor="fileUpload"
                className="mt-3 text-blue-500 cursor-pointer"
              >
                Browse files
              </label>
            </div>
          ) : (
            <div className="relative">
              <img
                src={preview}
                alt="preview"
                className="w-full h-64 object-cover rounded-lg"
              />

              <button
                onClick={removeImage}
                className="absolute top-2 right-2 bg-black text-white p-1 rounded-full"
              >
                <FiX />
              </button>
            </div>
          )}

          {/* Caption */}
          <textarea
            value={caption}
            onChange={(e) => setCaption(e.target.value)}
            placeholder="Write a caption..."
            className="w-full mt-4 border rounded-lg p-3 text-sm outline-none"
            maxLength={150}
          />
          <p className="text-xs text-gray-400 text-right">
            {caption.length}/150
          </p>

          {/* Location */}
          <input
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            placeholder="Add location"
            className="w-full mt-3 border rounded-lg p-2 text-sm outline-none"
          />

          {/* Submit */}
          <button
            onClick={handleSubmit}
            disabled={loading}
            className="w-full mt-4 bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 disabled:opacity-50"
          >
            {loading ? "Posting..." : "Post"}
          </button>
        </div>

        {/* RIGHT: Live Preview */}
        <div className="bg-white border rounded-xl p-6">
          <h3 className="font-semibold mb-4">Preview</h3>

          <div className="border rounded-xl p-4">
            <p className="font-semibold">You</p>
            <span className="text-xs text-gray-500">
              {location || "No location"}
            </span>

            {preview && (
              <img
                src={preview}
                alt="preview"
                className="w-full h-60 object-cover rounded-lg my-3"
              />
            )}

            <p className="text-sm">{caption || "Your caption..."}</p>
          </div>
        </div>
      </div>{" "}
      <Footer />
      <ToastContainer position="top-right" autoClose={1000} />
    </>
  );
}
