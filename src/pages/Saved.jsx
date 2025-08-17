import { useSelector } from "react-redux";
import { Button } from "@/components/ui/button";
import { buttonVariants } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Heart, Share2, BookmarkCheck, Send, X } from "lucide-react";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { Label } from "../components/ui/label";

export default function Saved() {
  const { data } = useSelector((state) => state.stadions); // ✅ asosiy data
  const [imageIndices, setImageIndices] = useState({});
  const [shareModal, setShareModal] = useState(null);
  const [selectedContacts, setSelectedContacts] = useState([]);
  const [likedStadiums, setLikedStadiums] = useState(() => {
    const saved = localStorage.getItem("likedStadiums");
    return saved ? JSON.parse(saved) : [];
  });

  // Swipe functionality
  const [touchStart, setTouchStart] = useState({ x: 0, y: 0 });
  const [touchEnd, setTouchEnd] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);

  const handleTouchStart = (e) => {
    setTouchStart({
      x: e.targetTouches[0].clientX,
      y: e.targetTouches[0].clientY,
    });
    setIsDragging(false);
  };

  const handleTouchMove = (e) => {
    setTouchEnd({
      x: e.targetTouches[0].clientX,
      y: e.targetTouches[0].clientY,
    });
    setIsDragging(true);
  };

  const handleTouchEnd = (stadiumId, imagesLength) => {
    if (!isDragging) return;

    const distanceX = touchStart.x - touchEnd.x;
    const distanceY = touchStart.y - touchEnd.y;

    const isLeftSwipe = distanceX > 50;
    const isRightSwipe = distanceX < -50;

    // Faqat gorizontal swipe bo'lsa ishlaydi
    if (Math.abs(distanceX) > Math.abs(distanceY)) {
      if (isLeftSwipe && imagesLength > 1) {
        nextImage(stadiumId, imagesLength);
      }
      if (isRightSwipe && imagesLength > 1) {
        prevImage(stadiumId, imagesLength);
      }
    }
  };

  const mockContacts = [
    { id: 1, name: "Ali", username: "@ali" },
    { id: 2, name: "Vali", username: "@vali" },
    { id: 3, name: "Sardor", username: "@sardor" },
    { id: 4, name: "Dilnoza", username: "@dilnoza" },
    { id: 5, name: "Malika", username: "@malika" },
  ];

  useEffect(() => {
    localStorage.setItem("likedStadiums", JSON.stringify(likedStadiums));
  }, [likedStadiums]);

  const savedStadiums = data?.filter((stadium) =>
    likedStadiums.includes(stadium.id)
  );

  const toggleLike = (stadiumId) => {
    setLikedStadiums((prev) =>
      prev.includes(stadiumId)
        ? prev.filter((id) => id !== stadiumId)
        : [...prev, stadiumId]
    );
  };

  const getImageIndex = (stadiumId) => imageIndices[stadiumId] || 0;

  const nextImage = (stadiumId, length) =>
    setImageIndices((prev) => ({
      ...prev,
      [stadiumId]:
        (prev[stadiumId] || 0) === length - 1 ? 0 : (prev[stadiumId] || 0) + 1,
    }));

  const prevImage = (stadiumId, length) =>
    setImageIndices((prev) => ({
      ...prev,
      [stadiumId]:
        (prev[stadiumId] || 0) === 0 ? length - 1 : (prev[stadiumId] || 0) - 1,
    }));

  const toggleContact = (id) => {
    setSelectedContacts((prev) =>
      prev.includes(id) ? prev.filter((c) => c !== id) : [...prev, id]
    );
  };

  const sendToContacts = () => {
    const chosen = mockContacts.filter((c) => selectedContacts.includes(c.id));
    console.log("📤 Yuborildi:", chosen, "stadiumId:", shareModal);
    setShareModal(null);
    setSelectedContacts([]);
  };

  return (
    <div className="container mx-auto mb-16 p-3">
      {shareModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center p-3 justify-center z-50">
          <div className="bg-white dark:bg-gray-900 rounded-xl shadow-lg p-6 w-96 relative">
            <Button
              variant="ghost"
              className="absolute top-3 right-3 text-gray-500 hover:text-gray-700"
              onClick={() => setShareModal(null)}
            >
              <X className="size-5" />
            </Button>
            <h2 className="text-lg font-bold mb-4">Do'stlarga ulashish</h2>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
              Quyidagi kontaktlardan bir nechtasini belgilang:
            </p>

            <div className="max-h-40 overflow-y-auto mb-4 space-y-2">
              {mockContacts.map((c) => (
                <Label
                  key={c.id}
                  className="flex items-center gap-2 cursor-pointer"
                >
                  <input
                    type="checkbox"
                    checked={selectedContacts.includes(c.id)}
                    onChange={() => toggleContact(c.id)}
                  />
                  <span className="font-medium">{c.name}</span>
                  <span className="text-gray-500 text-sm">{c.username}</span>
                </Label>
              ))}
            </div>

            <div className="flex flex-col gap-2">
              <Button
                className="w-full flex items-center gap-2"
                onClick={sendToContacts}
                disabled={selectedContacts.length === 0}
              >
                <Send className="size-4" />
                Tanlanganlarga yuborish
              </Button>
              <Button
                variant="secondary"
                className="w-full"
                onClick={() => setShareModal(null)}
              >
                Bekor qilish
              </Button>
            </div>
          </div>
        </div>
      )}
      <h1 className="text-2xl sm:text-3xl font-bold mb-6 text-justify">
        Saqlanganlar
      </h1>
      {savedStadiums?.length === 0 ? (
        <div className="flex flex-col items-center justify-center h-[550px] text-center text-gray-500">
          <BookmarkCheck className="size-10 mb-2 text-gray-400" />
          <p className="text-lg font-medium">
            Hech qanday saqlangan stadion yo'q
          </p>
          <p className="text-sm">
            Bosh sahifadan stadionlarni "like" qilib saqlashingiz mumkin.
          </p>
          <Link
            to="/"
            className={`${buttonVariants({ variant: "outline" })} mt-5`}
          >
            Stadionlarni ko'rish
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {savedStadiums.map(({ image, price, name, description, id }) => {
            const images =
              Array.isArray(image) && image.length > 0
                ? image
                : ["/src/assets/default.jpg"];
            const currentIndex = getImageIndex(id);

            return (
              <Card
                key={id}
                className="relative w-full shadow-none border rounded-xl overflow-hidden"
              >
                <CardHeader className="p-0 relative">
                  <div
                    className="w-[95%] mx-auto h-56 sm:h-64 md:h-72 relative overflow-hidden rounded-md cursor-pointer select-none"
                    onTouchStart={handleTouchStart}
                    onTouchMove={handleTouchMove}
                    onTouchEnd={() => handleTouchEnd(id, images.length)}
                    onClick={() =>
                      images.length > 1 && nextImage(id, images.length)
                    }
                  >
                    <img
                      src={images[currentIndex]}
                      className="w-full h-full object-cover transition-transform duration-300 ease-in-out select-none pointer-events-none"
                      alt={`${name} ${currentIndex + 1}`}
                      draggable={false}
                    />
                    {images.length > 1 && (
                      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2">
                        {images.map((_, index) => (
                          <div
                            key={index}
                            className={`w-2 h-2 rounded-full transition-all duration-200 ${
                              index === currentIndex
                                ? "bg-white scale-110"
                                : "bg-white/50"
                            }`}
                          />
                        ))}
                      </div>
                    )}
                  </div>
                </CardHeader>
                <CardContent className="p-4">
                  <CardTitle className="text-lg sm:text-xl">{name}</CardTitle>
                  <CardDescription className="line-clamp-2 text-sm sm:text-base">
                    {description}
                  </CardDescription>
                </CardContent>
                <CardFooter className="flex flex-wrap gap-2 p-4">
                  <Button variant="outline" className="flex-1 cursor-pointer">
                    {price.hourly}
                    <span className="text-xs ml-1">{price.currency}</span>
                  </Button>
                  <Button
                    variant="outline"
                    size="icon"
                    className="cursor-pointer transition-all duration-200"
                    onClick={() => toggleLike(id)}
                  >
                    <Heart
                      className={`size-4 transition-colors duration-200 ${
                        likedStadiums.includes(id)
                          ? "fill-red-500 text-red-500"
                          : ""
                      }`}
                    />
                  </Button>
                  <Button
                    className="cursor-pointer"
                    size="icon"
                    variant="outline"
                    onClick={() => setShareModal(id)}
                  >
                    <Share2 className="size-4" />
                  </Button>
                  <Button
                    asChild
                    variant="secondary"
                    className="flex-1 cursor-pointer"
                  >
                    <Link to={`/details/${id}`}>Batafsil</Link>
                  </Button>
                </CardFooter>
              </Card>
            );
          })}
        </div>
      )}
    </div>
  );
}
