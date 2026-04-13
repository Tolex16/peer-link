import { useState } from "react";
import axios from "../../Components/api/axios";
import Navbar from "../../Components/Navbar";
import Footer from "../../Components/Footer";
import user from "../../assets/user.png";
import { toast, ToastContainer } from "react-toastify";

export default function UpdateProfile() {
  const [preview, setPreview] = useState(null);
  const [base64Image, setBase64Image] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");

  const [formData, setFormData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmNewPassword: "",
  });
  const [message, setMessage] = useState("");

  const MAX_IMAGE_SIZE = 2 * 1024 * 1024; // 2MB

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // 🔒 Validate file type
    if (!file.type.startsWith("image/")) {
      setError("Only image files are allowed");
      toast.info("Only image files are allowed");
      return;
    }

    // 🔒 Validate file size
    if (file.size > MAX_IMAGE_SIZE) {
      setError("Image size must not exceed 2MB");
      toast.info("Image size must not exceed 2MB");

      return;
    }

    setError("");

    const reader = new FileReader();
    reader.onloadend = () => {
      setPreview(reader.result);
      setBase64Image(reader.result.split(",")[1]);
    };
    reader.readAsDataURL(file);
  };

  const handleSave = async () => {
    // if (!firstName || !lastName || !email) {
    //   setError("All fields are required");
    //   toast.info("All fields are required");
    //   return;
    // }

    try {
      setLoading(true);
      setError("");

      await axios.put(`/user/profile`, {
        firstName,
        lastName,
        email,
        base64Image,
      });

      toast.success("Profile updated successfully");
    } catch (err) {
      toast.error("Failed to update profile");
      setError("Failed to update profile");
    } finally {
      setLoading(false);
    }
  };

  const validate = () => {
    const { currentPassword, newPassword, confirmNewPassword } = formData;
    if (!currentPassword || !newPassword || !confirmNewPassword) {
      setMessage("All fields are required.");
      return false;
    }
    if (newPassword.length < 8) {
      setMessage("New password must be at least 8 characters.");
      return false;
    }
    if (newPassword !== confirmNewPassword) {
      setMessage("New passwords do not match.");
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    // Password strength validation (fixed logic)
    const { newPassword, confirmNewPassword } = formData;
    const hasMinimumLength =
      newPassword.length >= 8 && confirmNewPassword.length >= 8;
    const hasUppercase = /[A-Z]/.test(newPassword && confirmNewPassword);
    const hasLowercase = /[a-z]/.test(newPassword && confirmNewPassword);
    const hasNumber = /\d/.test(newPassword && confirmNewPassword);
    const hasSpecialCharacter = /[!@#$%^&*]/.test(
      newPassword && confirmNewPassword,
    );

    if (
      !hasMinimumLength ||
      !hasUppercase ||
      !hasLowercase ||
      !hasNumber ||
      !hasSpecialCharacter
    ) {
      setMessage(
        "❌ Password must meet the following criteria:\n" +
          "- Minimum 8 characters\n" +
          "- At least one uppercase letter\n" +
          "- At least one lowercase letter\n" +
          "- At least one number\n" +
          "- At least one special character (!@#$%^&*)",
      );
      return;
    }

    try {
      setLoading(true);
      setMessage("");

      const response = await axios.post(
        "/change-password/execute",
        {
          currentPassword: formData.currentPassword,
          newPassword: formData.newPassword,
          confirmNewPassword: formData.confirmNewPassword, // ✅ Send this too
        },
        {
          headers: {
            //Authorization: `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "application/json",
          },
        },
      );

      setMessage("✅ Password updated successfully.");
      setFormData({
        currentPassword: "",
        newPassword: "",
        confirmNewPassword: "",
      });
    } catch (error) {
      toast.error(error.response);
      setMessage(
        `❌ ${error.response?.data?.message || "Password update failed."}`,
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-white flex items-center justify-center p-6">
        <div className="bg-white p-6 border border-blue-700 mt-18 rounded-xl shadow-xl w-full max-w-md">
          <div className="text-center mb-5">
            <h2 className="text-2xl font-semibold">Edit Profile</h2>
            <p className="text-gray-600 text-md">Update your details</p>
          </div>

          <div className="flex flex-col items-center gap-4">
            {/* Avatar */}
            <img
              src={preview || user}
              className="w-32 h-32 mb-3 rounded-full object-cover border-4 border-blue-500"
            />

            <input
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className="text-sm text-white mx-auto text-center cursor-pointer"
            />

            {/* First Name */}
            <input
              type="text"
              placeholder="First Name"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              className="w-full px-4 py-2 rounded bg-zinc-800 text-white outline-none focus:ring-2 focus:ring-blue-500"
            />

            {/* Last Name */}
            <input
              type="text"
              placeholder="Last Name"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              className="w-full px-4 py-2 rounded bg-zinc-800 text-white outline-none focus:ring-2 focus:ring-blue-500"
            />

            {/* Email */}
            <input
              type="email"
              placeholder="Email Address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 rounded bg-zinc-800 text-white outline-none focus:ring-2 focus:ring-blue-500"
            />

            {/* Save Button */}
            <button
              onClick={handleSave}
              disabled={loading}
              className="bg-blue-500 hover:bg-blue-700 cursor-pointer disabled:opacity-50 text-black font-semibold px-6 py-2 rounded-lg w-full"
            >
              {loading ? "Saving..." : "Save Changes"}
            </button>
          </div>
        </div>
      </div>
      <section className="bg-white my-15 border border-blue-700 rounded-lg p-6 max-w-3xl mx-auto">
        <h2 className="text-2xl font-semibold text-blue-500 mb-4">
          Change Password
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          {["currentPassword", "newPassword", "confirmNewPassword"].map(
            (field, i) => (
              <div key={i}>
                <label className="block mb-1 text-sm capitalize">
                  {field.replace(/([A-Z])/g, " $1")}
                </label>
                <input
                  type="text"
                  value={formData[field]}
                  onChange={(e) =>
                    setFormData({ ...formData, [field]: e.target.value })
                  }
                  className="w-full px-4 py-2 rounded text-blue-700 border border-blue-700 focus:outline-none focus:ring-2 focus:ring-green-500"
                  required
                />
              </div>
            ),
          )}

          {message && (
            <p
              className={`text-sm ${
                message.startsWith("✅") ? "text-green-400" : "text-red-400"
              }`}
            >
              {message}
            </p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="bg-blue-600 text-white hover:shadow-2xl 
                hover:bg-blue-800 overflow-hidden py-2 px-6 rounded transition cursor-pointer"
          >
            {loading ? "Updating..." : "Update Password"}
          </button>
        </form>
      </section>
      <Footer />
      <ToastContainer position="top-right" autoClose={2000} />
    </>
  );
}
