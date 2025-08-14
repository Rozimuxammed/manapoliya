import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { useState } from "react";
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

export default function Details() {
  const { id } = useParams();
  const { data } = useSelector((state) => state.stadions);
  const stadium =
    data?.find((item) => String(item.id) === String(id)) || stadiumData;

  if (!stadium) {
    return <div>Ma&apos;lumot topilmadi</div>;
  }

  // State for booking form
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedTime, setSelectedTime] = useState("");
  const [selectedDuration, setSelectedDuration] = useState("hourly");
  const [bookingMessage, setBookingMessage] = useState("");

  // Generate time slots for the selected date
  const getTimeSlots = (date) => {
    if (!date) return [];
    const dayOfWeek = new Date(date)
      .toLocaleString("uz-UZ", { weekday: "long" })
      .toLowerCase();
    const availability = stadium.availability[dayOfWeek] || [];
    if (!availability.length) return [];

    // Parse the time range (e.g., "10:00-21:00") into hourly slots
    const [start, end] = availability[0].split("-");
    const startHour = parseInt(start.split(":")[0], 10);
    const endHour = parseInt(end.split(":")[0], 10);
    const slots = [];
    for (let hour = startHour; hour < endHour; hour++) {
      slots.push(`${hour}:00`);
    }
    return slots;
  };

  const timeSlots = getTimeSlots(selectedDate);

  // Handle booking submission
  const handleBooking = (e) => {
    e.preventDefault();
    if (!selectedDate || !selectedTime || !selectedDuration) {
      setBookingMessage("Iltimos, sanani, vaqtni va davomiylikni tanlang.");
      return;
    }
    // Simulate booking submission (replace with API call or Redux action)
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

  return (
    <div className="container mx-auto p-4 mb-16 max-w-5xl">
      <Card className="overflow-hidden border shadow-lg rounded-2xl">
        <CardHeader className="p-0 relative">
          <img
            src={stadium.image}
            alt={stadium.name}
            className="w-[95%] rounded-md mx-auto h-52 sm:h-64 md:h-80 object-cover"
          />
          <div className="absolute top-4 left-10 flex items-center gap-2">
            <Button
              variant="ghost"
              size="icon"
              className="bg-white/90 dark:bg-gray-900/80 size-8 rounded-full shadow-md"
            >
              <Heart className="size-4" />
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
              ({stadium.reviews} sharh)
            </span>
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
                <span className="font-medium">Qurilish yili:</span>{" "}
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
          </div>

          <div className="space-y-8">
            <div>
              <h3 className="font-semibold mb-2">Narxlar</h3>
              <div className="grid grid-cols-2 gap-3">
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
              <h3 className="font-semibold mb-2">Mavjudlik</h3>
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

            <div>
              <h3 className="font-semibold mb-2">Band qilish</h3>
              <form onSubmit={handleBooking} className="space-y-4">
                <div>
                  <Label htmlFor="date">Sana</Label>
                  <Input
                    type="date"
                    id="date"
                    value={selectedDate}
                    onChange={(e) => setSelectedDate(e.target.value)}
                    className="w-full"
                    min={new Date().toISOString().split("T")[0]}
                  />
                </div>
                <div>
                  <Label htmlFor="time">Vaqt</Label>
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
                  <Label htmlFor="duration">Davomiylik</Label>
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

        <Separator />

        <div className="p-6">
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
            Borish (Yandex Maps)
          </Button>
        </div>
      </Card>
    </div>
  );
}
