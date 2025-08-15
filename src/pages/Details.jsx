import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Heart,
  Share2,
  MapPin,
  Star,
  Calendar,
  Phone,
  Building2,
  ParkingCircle,
  Globe,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Separator } from "@/components/ui/separator";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { addNewData } from "../redux/slice/stadionSlice";

export default function Details() {
  const { id } = useParams();
  const { data } = useSelector((state) => state.stadions);

  const stadium = data?.find((item) => String(item.id) === String(id));

  if (!stadium) {
    return <div>No data found</div>;
  }

  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const dispatch = useDispatch();

  const nextImage = () => {
    setIsTransitioning(true);
    setCurrentImageIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
    setTimeout(() => {
      setIsTransitioning(false);
    }, 500);
  };

  const prevImage = () => {
    setIsTransitioning(true);
    setCurrentImageIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
    setTimeout(() => {
      setIsTransitioning(false);
    }, 500);
  };

  const [selectedDate, setSelectedDate] = useState("");
  const [selectedTime, setSelectedTime] = useState("");
  const [selectedDuration, setSelectedDuration] = useState("hourly");
  const [bookingMessage, setBookingMessage] = useState("");

  const dayMap = {
    dushanba: "monday",
    seshanba: "tuesday",
    chorshanba: "wednesday",
    payshanba: "thursday",
    juma: "friday",
    shanba: "saturday",
    yakshanba: "sunday",
  };

  const images =
    Array.isArray(stadium.image) && stadium.image.length > 0
      ? stadium.image
      : ["/src/assets/default.jpg"];

  const getTimeSlots = (date) => {
    if (!date) return [];

    const mockSchedule = ["09:00-22:00"];

    const dayOfWeekUzbek = new Date(date)
      .toLocaleString("uz-UZ", { weekday: "long" })
      .toLowerCase();
    const dayOfWeek = dayMap[dayOfWeekUzbek] || dayOfWeekUzbek;
    const availability = stadium.availability[dayOfWeek] || mockSchedule;

    if (!availability.length) return [];

    const [start, end] = availability[0].split("-");
    const startHour = parseInt(start.split(":")[0], 10);
    const endHour = parseInt(end.split(":")[0], 10);

    if (isNaN(startHour) || isNaN(endHour)) return [];

    const slots = [];
    for (let hour = startHour; hour < endHour; hour++) {
      slots.push(`${hour}:00`);
    }
    return slots;
  };

  const timeSlots = getTimeSlots(selectedDate);

  const handleBooking = (e) => {
    e.preventDefault();
    if (!selectedDate || !selectedTime || !selectedDuration) {
      setBookingMessage("Iltimos, sanani, vaqtni va davomiylikni tanlang.");
      return;
    }
    console.log({
      stadiumId: stadium.id,
      date: selectedDate,
      time: selectedTime,
      duration: selectedDuration,
      price:
        selectedDuration === "hourly"
          ? stadium.price.hourly
          : stadium.price.daily,
      currency: stadium.price.currency,
    });
    setBookingMessage(
      `Band qilindi: ${stadium.name} - ${selectedDate}, ${selectedTime} (${
        selectedDuration === "hourly" ? "soatlik" : "kunlik"
      })`
    );
  };

  const handleNavigate = () => {
    const yandexUrl = `https://yandex.com/navi/?whatshere[point]=${stadium.location.coordinates.longitude},${stadium.location.coordinates.latitude}&whatshere[zoom]=15`;
    window.open(yandexUrl, "_blank");
  };

  const mapEmbedUrl = `https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2996.5!2d${stadium.location.coordinates.longitude}!3d${stadium.location.coordinates.latitude}!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNDEuMzExMSw2OS4yNzk3!5e0!3m2!1sen!2sus!4v1690000000000!5m2!1sen!2sus`;

  const [likedStadiums, setLikedStadiums] = useState(() => {
    const saved = localStorage.getItem("likedStadiums");
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem("likedStadiums", JSON.stringify(likedStadiums));
  }, [likedStadiums]);

  useEffect(() => {
    const likedStadiumsData = data?.filter((stadium) =>
      likedStadiums.includes(Number(stadium.id))
    );
    dispatch(addNewData(likedStadiumsData));
  }, [likedStadiums, data, dispatch]);

  const toggleLike = (stadiumId) => {
    const numericId = Number(stadiumId);
    setLikedStadiums((prev) =>
      prev.includes(numericId)
        ? prev.filter((id) => id !== numericId)
        : [...prev, numericId]
    );
  };

  return (
    <div className="container mx-auto p-4 mb-16 max-w-5xl">
      <Card className="overflow-hidden border shadow-lg rounded-2xl">
        <CardHeader className="p-0 relative">
          <div className="w-[95%] mx-auto h-52 sm:h-64 md:h-80">
            <img
              src={images[currentImageIndex]}
              alt={`${stadium.name} ${currentImageIndex + 1}`}
              className={`w-full h-full rounded-md object-cover`}
            />
            {images.length > 1 && (
              <>
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute top-1/2 left-5 sm:left-10 transform -translate-y-1/2 bg-white/90 dark:bg-gray-900/80 size-8 rounded-full shadow-md"
                  onClick={prevImage}
                >
                  <ChevronLeft className="size-4 text-primary" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute top-1/2 right-5 sm:right-10 transform -translate-y-1/2 bg-white/90 dark:bg-gray-900/80 size-8 rounded-full shadow-md"
                  onClick={nextImage}
                >
                  <ChevronRight className="size-4 text-primary" />
                </Button>
              </>
            )}
            <div className="absolute top-4 left-5 sm:left-10 flex items-center gap-2">
              <Button
                variant="outline"
                size="icon"
                className="bg-white/90 dark:bg-gray-900/80 size-8 rounded-full shadow-md"
                onClick={() => toggleLike(stadium.id)}
              >
                <Heart
                  className={`size-4 transition-colors ${
                    likedStadiums.includes(Number(stadium.id))
                      ? "fill-red-500 text-red-500"
                      : ""
                  }`}
                />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="bg-white/90 dark:bg-gray-900/80 size-8 rounded-full shadow-md"
              >
                <Share2 className="size-4 text-primary" />
              </Button>
            </div>
            <div className="absolute bottom-4 right-10 flex items-center bg-white/90 dark:bg-gray-900/80 px-3 py-1 rounded-full text-sm shadow-md">
              <Star className="size-4 mr-1 text-yellow-500" />
              <span className="font-medium">{stadium.rating}</span>
              <span className="text-muted-foreground ml-1">
                ({stadium.reviews} sharhlar)
              </span>
            </div>
          </div>
        </CardHeader>

        <CardContent className="p-6 grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <CardTitle className="text-3xl font-bold mb-2">
              {stadium.name}
            </CardTitle>
            <CardDescription className="text-base mb-4 leading-relaxed">
              {stadium.description}
            </CardDescription>

            <Separator className="my-5" />

            <div className="space-y-4 text-sm">
              <div className="flex items-center gap-2">
                <Building2 className="size-5 text-primary" />
                <span className="font-medium">Turi:</span> {stadium.type}
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="size-5 text-primary" />
                <span className="font-medium">Qurilgan Yil:</span>{" "}
                {stadium.construction_year}
              </div>
              <div className="flex items-center gap-2">
                <ParkingCircle className="size-5 text-primary" />
                <span className="font-medium">Parking joylari:</span>{" "}
                {stadium.parking_spaces}
              </div>
            </div>

            <Separator className="my-5" />

            <h3 className="font-semibold mb-2">Imkoniyatlar</h3>
            <div className="flex flex-wrap gap-2">
              {stadium.facilities.map((item, idx) => (
                <Badge
                  key={idx}
                  variant="secondary"
                  className="hover:bg-primary/10 transition-colors"
                >
                  {item}
                </Badge>
              ))}
            </div>

            <Separator className="my-5" />

            <h3 className="font-semibold mb-2">Aloqa</h3>
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Phone className="size-5 text-primary" />
                <a
                  href={`tel:${stadium.contact.phone}`}
                  className="hover:underline"
                >
                  {stadium.contact.phone}
                </a>
              </div>
            </div>

            <div className="p-6 mt-10">
              <h3 className="font-semibold mb-2 flex items-center gap-2">
                <MapPin className="size-5 text-primary" />
                Joylashuv
              </h3>
              <p className="text-sm mb-4 text-muted-foreground">
                {stadium.location.address}, {stadium.location.city},{" "}
                {stadium.location.region}
              </p>
              <div className="w-full h-64 mb-4 overflow-hidden rounded-xl shadow-md">
                <iframe
                  src={mapEmbedUrl}
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                ></iframe>
              </div>
              <Button
                onClick={handleNavigate}
                className="w-full sm:w-auto bg-primary text-white hover:bg-primary/90"
              >
                <Globe className="size-4 mr-2" />
                Borish (Yandex navidator)
              </Button>
            </div>
          </div>

          <div className="space-y-8">
            <div>
              <h3 className="font-semibold mb-2">Narxlar</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <Button variant="outline" className="justify-start font-medium">
                  Soatlik: {stadium.price.hourly} {stadium.price.currency}
                </Button>
                <Button variant="outline" className="justify-start font-medium">
                  Kunlik: {stadium.price.daily} {stadium.price.currency}
                </Button>
              </div>
            </div>

            <Separator className="my-4 md:hidden" />

            <div>
              <h3 className="font-semibold mb-2">Ish vaqti</h3>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Kun</TableHead>
                    <TableHead>Vaqt</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {Object.entries(stadium.availability).map(([day, time]) => (
                    <TableRow key={day}>
                      <TableCell className="capitalize font-medium">
                        {day}
                      </TableCell>
                      <TableCell className="text-muted-foreground">
                        {time.join(", ")}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>

            <Separator className="my-4 md:hidden" />

            <div className="mt-14">
              <h3 className="font-semibold mb-2">Band qilish</h3>
              <form onSubmit={handleBooking} className="space-y-4">
                <div>
                  <Label className="mb-3" htmlFor="date">
                    Sana
                  </Label>
                  <Input
                    type="date"
                    id="date"
                    value={selectedDate}
                    onChange={(e) => setSelectedDate(e.target.value)}
                    className="w-full"
                    min={new Date().toISOString().split("T")[0]}
                    placeholder="Sana tanlang"
                  />
                </div>
                <div>
                  <Label className="mb-3" htmlFor="time">
                    Vaqt
                  </Label>
                  <Select value={selectedTime} onValueChange={setSelectedTime}>
                    <SelectTrigger id="time">
                      <SelectValue placeholder="Vaqt tanlang" />
                    </SelectTrigger>
                    <SelectContent>
                      {timeSlots.length ? (
                        timeSlots.map((slot) => (
                          <SelectItem key={slot} value={slot}>
                            {slot}
                          </SelectItem>
                        ))
                      ) : (
                        <SelectItem value="none" disabled>
                          Mavjud vaqt yo&apos;q
                        </SelectItem>
                      )}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label className="mb-3" htmlFor="duration">
                    Davomiylik
                  </Label>
                  <Select
                    value={selectedDuration}
                    onValueChange={setSelectedDuration}
                  >
                    <SelectTrigger id="duration">
                      <SelectValue placeholder="Davomiylik tanlang" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="hourly">Soatlik</SelectItem>
                      <SelectItem value="daily">Kunlik</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <Button
                  type="submit"
                  className="w-full bg-primary hover:bg-primary/90"
                >
                  Hozir band qilish
                </Button>
                {bookingMessage && (
                  <p className="text-sm text-center text-muted-foreground">
                    {bookingMessage}
                  </p>
                )}
              </form>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
