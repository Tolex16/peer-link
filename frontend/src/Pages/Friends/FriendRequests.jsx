import { useState } from "react";
import Navbar from "../../Components/Navbar";
import Footer from "../../Components/Footer";

export default function FriendRequest() {
  const [requests, setRequests] = useState([
    { id: 1, name: "David O", mutual: 3 },
    { id: 2, name: "Blessing", mutual: 1 },
    { id: 3, name: "Tolu", mutual: 5 },
  ]);

  const handleAction = (id) => {
    setRequests((prev) => prev.filter((r) => r.id !== id));
  };

  return (
    <>
      <Navbar />
      <div className="max-w-3xl mx-auto mt-20 px-4">
        <h2 className="text-xl font-semibold mb-4">Friend Requests</h2>

        <div className="space-y-3">
          {requests.map((req) => (
            <div
              key={req.id}
              className="bg-white p-4 rounded-lg shadow flex justify-between items-center"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gray-300 rounded-full" />
                <div>
                  <p className="font-medium">{req.name}</p>
                  <p className="text-xs text-gray-500">
                    {req.mutual} mutual friends
                  </p>
                </div>
              </div>

              <div className="flex gap-2">
                <button
                  onClick={() => handleAction(req.id)}
                  className="bg-blue-500 text-white px-3 py-1 rounded"
                >
                  Follow back
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
       <Footer />
    </>
  );
}
