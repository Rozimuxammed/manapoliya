import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
export default function Profile() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const savedUser = localStorage.getItem("tgUser");
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    } else {
      const mockUser = {
        id: 123456789,
        first_name: "John",
        last_name: "Doe",
        username: "mockuser",
        photo_url: "https://i.pravatar.cc/150?img=3",
      };

      localStorage.setItem("tgUser", JSON.stringify(mockUser));
      setUser(mockUser);
    }
  }, []);

  if (!user) {
    return (
      <div className="flex flex-col items-center justify-center h-screen">
        <h1 className="text-2xl font-bold mb-4">Profilga kirish</h1>
        <p>Mock login ishlayapti...</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <img
        src={user.photo_url}
        alt="Avatar"
        className="w-24 h-24 rounded-full mb-4 shadow-lg"
      />
      <h1 className="text-xl font-bold">
        {user.first_name} {user.last_name}
      </h1>
      {user.username && <p className="text-gray-500">@{user.username}</p>}
      <Button
        onClick={() => {
          localStorage.removeItem("tgUser");
          setUser(null);
        }}
        className="mt-6 px-4 py-2 text-white rounded-md cursor-pointer"
        variant="destructive"
      >
        Chiqish
      </Button>
    </div>
  );
}
