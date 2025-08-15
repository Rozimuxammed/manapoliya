import { useSelector } from "react-redux";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Heart, Share2, ChevronLeft, ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";
import { useState } from "react";

export default function Home() {
  const { data } = useSelector((state) => state.stadions);

  const [imageIndices, setImageIndices] = useState({});

  const getImageIndex = (stadiumId) => {
    return imageIndices[stadiumId] || 0;
  };

  const nextImage = (stadiumId, imageLength) => {
    setImageIndices((prev) => ({
      ...prev,
      [stadiumId]:
        (prev[stadiumId] || 0) === imageLength - 1
          ? 0
          : (prev[stadiumId] || 0) + 1,
    }));
  };

  const prevImage = (stadiumId, imageLength) => {
    setImageIndices((prev) => ({
      ...prev,
      [stadiumId]:
        (prev[stadiumId] || 0) === 0
          ? imageLength - 1
          : (prev[stadiumId] || 0) - 1,
    }));
  };

  return (
    <div className="container mx-auto grid grid-cols-1 mb-16 sm:grid-cols-2 lg:grid-cols-3 gap-5 py-5">
      {data?.map(({ image, price, name, description, id }) => (
        <Card
          key={id}
          className="relative w-full shadow-none border rounded-xl overflow-hidden"
        >
          <CardHeader className="p-0 relative">
            <div className="w-[95%] mx-auto h-56 sm:h-64 md:h-72">
              <img
                src={Array.isArray(image) ? image[getImageIndex(id)] : image}
                className="w-full h-full rounded-md object-cover"
                alt={`${name} ${getImageIndex(id) + 1}`}
              />
              {Array.isArray(image) && image.length > 1 && (
                <>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-white/90 dark:bg-gray-900/80 size-8 rounded-full shadow-md"
                    onClick={() => prevImage(id, image.length)}
                  >
                    <ChevronLeft className="size-4 text-primary" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-white/90 dark:bg-gray-900/80 size-8 rounded-full shadow-md"
                    onClick={() => nextImage(id, image.length)}
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
            <Button className="cursor-pointer" size="icon" variant="outline">
              <Heart className="size-4" />
            </Button>
            <Button className="cursor-pointer" size="icon" variant="outline">
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
      ))}
    </div>
  );
}
