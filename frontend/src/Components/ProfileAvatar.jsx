import { useMemo } from "react";
import { Pencil } from "lucide-react";
import { useNavigate } from "react-router-dom";
import user from "../assets/user.png";

const DEFAULT_AVATAR = user;

export default function ProfileAvatar({
  base64Image,
  size = 120,
}) {
  const navigate = useNavigate();

  const imageSrc = useMemo(() => {
    if (!base64Image || typeof base64Image !== "string") {
      return DEFAULT_AVATAR;
    }

    const cleanBase64 = base64Image.replace(/^"+|"+$/g, "").replace(/\s/g, "");

    if (!cleanBase64) return DEFAULT_AVATAR;

    if (cleanBase64.startsWith("data:image")) {
      return cleanBase64;
    }

    return `data:image/png;base64,${cleanBase64}`;
  }, [base64Image]);

  return (
    <div
      className="relative group cursor-pointer"
      style={{ width: size, height: size }}
    >
      <img
        src={imageSrc}
        onError={(e) => (e.currentTarget.src = DEFAULT_AVATAR)}
        alt="User Profile"
        className="w-full h-full object-cover rounded-full border-4 border-white shadow-lg transition-transform duration-300 group-hover:scale-105"
      />

      <div className="absolute inset-0 rounded-full bg-black/20 opacity-0 group-hover:opacity-100 transition" />

      <button
        className="absolute bottom-0.5 right-1 bg-white cursor-pointer hover:bg-white p-2 rounded-full shadow-lg transition-transform group-hover:scale-110"
      >
        <Pencil size={5} className="text-black cursor-pointer" />
      </button>
    </div>
  );
}
