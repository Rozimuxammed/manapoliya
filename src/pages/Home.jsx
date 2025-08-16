import { useDispatch, useSelector } from "react-redux";
import { Button } from "@/components/ui/button";
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
  X,
  Send,
  Map,
} from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Link } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import { addNewData } from "../redux/slice/stadionSlice";
import { Label } from "../components/ui/label";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
});

export default function Home() {
  const { data } = useSelector((state) => state.stadions);
  const dispatch = useDispatch();
  const [imageIndices, setImageIndices] = useState({});
  const [likedStadiums, setLikedStadiums] = useState(() => {
    const saved = localStorage.getItem("likedStadiums");
    return saved ? JSON.parse(saved) : [];
  });
  const [shareModal, setShareModal] = useState(null);
  const [selectedContacts, setSelectedContacts] = useState([]);
  const [selectedRegion, setSelectedRegion] = useState("");
  const [location, setLocation] = useState(null);
  const [showMapModal, setShowMapModal] = useState(false);
  const [nearbyStadiums, setNearbyStadiums] = useState([]);
  const mapRef = useRef(null);
  const mapContainerRef = useRef(null);

  // Ikki nuqta orasidagi masofani hisoblash (Haversine formula)
  const calculateDistance = (lat1, lon1, lat2, lon2) => {
    const R = 6371; // Yer radiusi km da
    const dLat = ((lat2 - lat1) * Math.PI) / 180;
    const dLon = ((lon2 - lon1) * Math.PI) / 180;
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos((lat1 * Math.PI) / 180) *
        Math.cos((lat2 * Math.PI) / 180) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const distance = R * c;
    return distance;
  };

  // Yaqin stadionlarni topish
  const findNearbyStadiums = (userLat, userLng, maxDistance = 10) => {
    return (
      data
        ?.filter((stadium) => {
          if (!stadium.lat || !stadium.lng) return false;
          const distance = calculateDistance(
            userLat,
            userLng,
            stadium.lat,
            stadium.lng
          );
          return distance <= maxDistance;
        })
        .sort((a, b) => {
          const distanceA = calculateDistance(userLat, userLng, a.lat, a.lng);
          const distanceB = calculateDistance(userLat, userLng, b.lat, b.lng);
          return distanceA - distanceB;
        }) || []
    );
  };

  useEffect(() => {
    if (showMapModal && mapContainerRef.current && location) {
      // Eski xaritani tozalash
      if (mapRef.current) {
        mapRef.current.remove();
      }

      // Yangi xarita yaratish
      mapRef.current = L.map(mapContainerRef.current).setView(
        [location.lat, location.lng],
        13
      );

      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution:
          '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      }).addTo(mapRef.current);

      // Foydalanuvchi joylashuvini belgilash
      const userIcon = L.divIcon({
        html: '<div style="background-color: #3b82f6; width: 20px; height: 20px; border-radius: 50%; border: 3px solid white; box-shadow: 0 2px 4px rgba(0,0,0,0.3);"></div>',
        className: "user-location-marker",
        iconSize: [20, 20],
        iconAnchor: [10, 10],
      });

      L.marker([location.lat, location.lng], { icon: userIcon })
        .addTo(mapRef.current)
        .bindPopup("<b>Sizning joylashuvingiz</b>")
        .openPopup();

      // Yaqin stadionlarni xaritaga qo'shish
      nearbyStadiums.forEach((stadium) => {
        const distance = calculateDistance(
          location.lat,
          location.lng,
          stadium.lat,
          stadium.lng
        );

        const stadiumIcon = L.divIcon({
          html: '<div style="background-color: #ef4444; width: 16px; height: 16px; border-radius: 50%; border: 2px solid white; box-shadow: 0 1px 3px rgba(0,0,0,0.3);"></div>',
          className: "stadium-marker",
          iconSize: [16, 16],
          iconAnchor: [8, 8],
        });

        L.marker([stadium.lat, stadium.lng], { icon: stadiumIcon })
          .addTo(mapRef.current)
          .bindPopup(
            `<div style="min-width: 200px;">
              <b>${stadium.name}</b><br>
              <p style="margin: 5px 0; color: #666; font-size: 12px;">${
                stadium.description
              }</p>
              <p style="margin: 5px 0; font-weight: bold; color: #059669;">${
                stadium.price.hourly
              } ${stadium.price.currency}</p>
              <p style="margin: 5px 0; color: #3b82f6; font-size: 11px;">📍 ${distance.toFixed(
                1
              )} km masofa</p>
            </div>`
          );
      });

      return () => {
        if (mapRef.current) {
          mapRef.current.remove();
          mapRef.current = null;
        }
      };
    }
  }, [showMapModal, location, nearbyStadiums]);

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

  useEffect(() => {
    const likedStadiumsData = data?.filter((stadium) =>
      likedStadiums.includes(stadium.id)
    );
    dispatch(addNewData(likedStadiumsData));
  }, [likedStadiums, data, dispatch]);

  const toggleLike = (stadiumId) => {
    setLikedStadiums((prev) =>
      prev.includes(stadiumId)
        ? prev.filter((id) => id !== stadiumId)
        : [...prev, stadiumId]
    );
  };

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

  const handleRegionChange = (value) => {
    if (value === "nearby") {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (pos) => {
            const userLocation = {
              lat: pos.coords.latitude,
              lng: pos.coords.longitude,
            };
            setLocation(userLocation);

            // Yaqin stadionlarni topish
            const nearby = findNearbyStadiums(
              userLocation.lat,
              userLocation.lng
            );
            setNearbyStadiums(nearby);

            // Xarita modalini ochish
            setShowMapModal(true);

            console.log("User Location:", pos.coords);
            console.log("Nearby Stadiums:", nearby);
          },
          (err) => {
            console.error("Geolocation error:", err);
            alert(
              "Joylashuvni aniqlashda xatolik yuz berdi. Iltimos, brauzer sozlamalarini tekshiring."
            );
          }
        );
      } else {
        alert("Sizning qurilmangiz geolokatsiyani qo'llab-quvvatlamaydi");
      }
    }
    setSelectedRegion(value);
  };

  // Xaritada ko'rsatish tugmasi uchun handler
  const handleShowOnMap = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          const userLocation = {
            lat: pos.coords.latitude,
            lng: pos.coords.longitude,
          };
          setLocation(userLocation);

          // Barcha stadionlarni ko'rsatish
          setNearbyStadiums(data || []);
          setShowMapModal(true);
        },
        (err) => {
          console.error("Geolocation error:", err);
          // Joylashuvsiz ham xaritani ko'rsatish
          setLocation({ lat: 41.2995, lng: 69.2401 }); // Toshkent koordinatalari
          setNearbyStadiums(data || []);
          setShowMapModal(true);
        }
      );
    } else {
      // Geolocation qo'llab-quvvatlanmasa, Toshkent markazi
      setLocation({ lat: 41.2995, lng: 69.2401 });
      setNearbyStadiums(data || []);
      setShowMapModal(true);
    }
  };

  const regions = {
    Toshkent: ["Chilonzor", "Yunusobod", "Yakkasaroy", "Olmazor"],
    Samarqand: ["Registon", "Urgut", "Bulung'ur", "Ishtixon"],
    Buxoro: ["G'ijduvon", "Vobkent", "Qorako'l", "Jondor"],
    "Farg'ona": ["Marg'ilon", "Qo'qon", "Quva", "Rishton"],
    Andijon: ["Asaka", "Shahrixon", "Xo'jaobod"],
    Namangan: ["Chortoq", "Pop", "Uchqo'rg'on"],
    Xorazm: ["Urganch", "Xiva", "Shovot"],
    Qashqadaryo: ["Qarshi", "Shahrisabz", "Kitob"],
    Surxondaryo: ["Termiz", "Sherobod", "Denov"],
    Jizzax: ["Zomin", "Forish", "Baxmal"],
    Sirdaryo: ["Guliston", "Yangiyer", "Sardoba"],
    Navoiy: ["Zarafshon", "Karmana", "Uchquduq"],
  };

  return (
    <div className="container mx-auto mb-16 p-3">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
        <h1 className="text-2xl sm:text-3xl font-bold text-justify">
          Sport maydonlari
        </h1>

        <div className="flex sm:flex-row sm:items-center gap-2 w-full sm:w-auto">
          <div className="flex flex-col gap-3">
            <Select onValueChange={handleRegionChange}>
              <SelectTrigger className="sm:w-[150px]">
                <SelectValue placeholder="Hudud" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="nearby">Menga yaqin</SelectItem>
                {Object.keys(regions).map((region) => (
                  <SelectItem key={region} value={region}>
                    {region}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {selectedRegion && selectedRegion !== "nearby" && (
              <Select>
                <SelectTrigger className="sm:w-[150px]">
                  <SelectValue placeholder="Tuman/Shahar" />
                </SelectTrigger>
                <SelectContent>
                  {regions[selectedRegion].map((district) => (
                    <SelectItem key={district} value={district}>
                      {district}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            )}
          </div>

          <Button
            variant="outline"
            className="sm:w-auto cursor-pointer text-gray-600 font-normal flex items-center justify-center"
            onClick={handleShowOnMap}
          >
            <Map className="mr-2" /> Xaritada
          </Button>

          <Select>
            <SelectTrigger className="sm:w-[180px]">
              <SelectValue placeholder="Stadion turi" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="usti yopiq">Usti yopiq</SelectItem>
              <SelectItem value="usti ochiq">Usti ochiq</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

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

      {showMapModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center p-3 justify-center z-50">
          <div className="bg-white dark:bg-gray-900 rounded-xl shadow-lg p-6 w-full max-w-4xl max-h-[90vh] relative">
            <Button
              variant="ghost"
              className="absolute top-3 right-3 text-gray-500 hover:text-gray-700 z-10"
              onClick={() => setShowMapModal(false)}
            >
              <X className="size-5" />
            </Button>
            <h2 className="text-lg font-bold mb-4">
              {selectedRegion === "nearby"
                ? "Yaqin atrofdagi stadionlar"
                : "Stadionlar xaritasi"}
            </h2>

            {selectedRegion === "nearby" && (
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                {nearbyStadiums.length > 0
                  ? `${nearbyStadiums.length} ta yaqin stadion topildi`
                  : "Yaqin atrofda stadion topilmadi"}
              </p>
            )}

            <div
              ref={mapContainerRef}
              className="w-full h-96 rounded-md mb-4"
            ></div>

            {/* Yaqin stadionlar ro'yxati */}
            {selectedRegion === "nearby" &&
              nearbyStadiums.length > 0 &&
              location && (
                <div className="max-h-40 overflow-y-auto mb-4">
                  <h3 className="font-semibold mb-2">Yaqin stadionlar:</h3>
                  <div className="space-y-2">
                    {nearbyStadiums.slice(0, 5).map((stadium) => {
                      const distance = calculateDistance(
                        location.lat,
                        location.lng,
                        stadium.lat,
                        stadium.lng
                      );
                      return (
                        <div
                          key={stadium.id}
                          className="flex justify-between items-center p-2 bg-gray-50 dark:bg-gray-800 rounded-lg"
                        >
                          <div>
                            <p className="font-medium text-sm">
                              {stadium.name}
                            </p>
                            <p className="text-xs text-gray-600 dark:text-gray-400">
                              {stadium.price.hourly} {stadium.price.currency}
                            </p>
                          </div>
                          <span className="text-xs text-blue-600 dark:text-blue-400">
                            {distance.toFixed(1)} km
                          </span>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

            <Button
              variant="secondary"
              className="w-full"
              onClick={() => setShowMapModal(false)}
            >
              Yopish
            </Button>
          </div>
        </div>
      )}

      {/* Stadium Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {data?.map(({ image, price, name, description, id }) => {
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
    </div>
  );
}
