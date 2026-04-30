import { useState } from "react";
import Navbar from "../../Components/Navbar";
import Footer from "../../Components/Footer";

export default function Friends() {
  const [search, setSearch] = useState("");

  const friends = [
    { id: 1, name: "Micheal Dee", online: true },
    { id: 2, name: "Precious Nnaji", online: false },
    { id: 3, name: "Alex King", online: true },
    { id: 4, name: "Mary Ann", online: false },
  ];

  const filtered = friends.filter((f) =>
    f.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <>
      <Navbar/>
    <div className="max-w-4xl mx-auto mt-20 px-4">
      <h2 className="text-xl font-semibold mb-4">Friends</h2>

      {/* Search */}
      <input
        type="text"
        placeholder="Search friends..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="w-full mb-4 border rounded-lg px-3 py-2"
      />

      {/* List */}
      <div className="space-y-3">
        {filtered.map((friend) => (
          <div
            key={friend.id}
            className="flex justify-between items-center bg-white p-4 rounded-lg shadow"
          >
            <div className="flex items-center gap-3">
              <div className="relative">
                <div className="w-10 h-10 bg-gray-300 rounded-full" />
                {friend.online && (
                  <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-white rounded-full" />
                )}
              </div>

              <p className="font-medium">{friend.name}</p>
            </div>

            <div className="flex gap-2">
              <button className="text-blue-500 text-sm">Message</button>
              <button className="text-red-500 text-sm">Unfollow</button>
            </div>
          </div>
        ))}
      </div>
    </div>
     <Footer/>
  </>
  );
}