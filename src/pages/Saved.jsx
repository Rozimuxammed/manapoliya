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
import {
  Heart,
  Share2,
  ChevronLeft,
  ChevronRight,
  BookmarkCheck,
} from "lucide-react";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";

export default function Saved() {
  const { data } = useSelector((state) => state.stadions); // ✅ asosiy data
  const [imageIndices, setImageIndices] = useState({});
  const [likedStadiums, setLikedStadiums] = useState(() => {
    const saved = localStorage.getItem("likedStadiums");
    return saved ? JSON.parse(saved) : [];
  });

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

  return (
    <div className="container mx-auto mb-16 p-3">
      {savedStadiums?.length === 0 ? (
        <div className="flex flex-col items-center justify-center h-[550px] text-center text-gray-500">
          <BookmarkCheck className="size-10 mb-2 text-gray-400" />
          <p className="text-lg font-medium">
            Hech qanday saqlangan stadion yo‘q
          </p>
          <p className="text-sm">
            Bosh sahifadan stadionlarni "like" qilib saqlashingiz mumkin.
          </p>
          <Link to="/" className={`${buttonVariants({ variant: "outline" })} mt-5`}>
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
                  <div className="w-[95%] mx-auto h-56 sm:h-64 md:h-72">
                    <img
                      src={images[currentIndex]}
                      className="w-full h-full rounded-md object-cover"
                      alt={`${name} ${currentIndex + 1}`}
                    />
                    {images.length > 1 && (
                      <>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-white/90 dark:bg-gray-900/80 size-8 rounded-full shadow-md"
                          onClick={() => prevImage(id, images.length)}
                        >
                          <ChevronLeft className="size-4 text-primary" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-white/90 dark:bg-gray-900/80 size-8 rounded-full shadow-md"
                          onClick={() => nextImage(id, images.length)}
                        >
                          <ChevronRight className="size-4 text-primary" />
                        </Button>
                      </>
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
