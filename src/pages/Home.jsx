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
import { Heart, Share2 } from "lucide-react";
import { Link } from "react-router-dom";

export default function Home() {
  const { data } = useSelector((state) => state.stadions);
  console.log(data);

  return (
    <div className="container mx-auto grid grid-cols-1 mb-16 sm:grid-cols-2 lg:grid-cols-3 gap-5 py-5">
      {data?.map(({ image, price, name, description, id }) => (
        <Card
          key={id}
          className="relative w-full shadow-none border rounded-xl overflow-hidden"
        >
          <CardHeader className="p-0">
            <img
              src={image}
              className="w-[95%] mx-auto rounded-md h-56 sm:h-64 md:h-72 object-cover"
              alt={name}
            />
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
