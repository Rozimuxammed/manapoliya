import { createSlice } from "@reduxjs/toolkit";
import bunyodkor from "../../assets/bunyodkor.jpg";
import paxtakor from "../../assets/paxtakor.jpg";
import yoshlar from "../../assets/yoshlar.jpg";
import samarqand from "../../assets/samarqand.jpg";
import navoiy from "../../assets/navoiy.jpg";
import fargona from "../../assets/fargona.jpg";
const initialState = {
  data: [
    {
      id: 1,
      name: "Bunyodkor Stadium",
      image: [bunyodkor, paxtakor, yoshlar, samarqand],
      price: {
        hourly: 500000,
        daily: 3000000,
        currency: "UZS",
      },
      location: {
        address: "Chilonzor tumani, Bodomzor ko'chasi 2, Toshkent",
        city: "Toshkent",
        region: "Toshkent viloyati",
        coordinates: {
          latitude: 41.2358,
          longitude: 69.1853,
        },
      },
      type: "Usti yopiq",
      facilities: [
        "Proyektorlar",
        "VIP zal",
        "Avtoturargoh",
        "Restoran",
        "Tibbiyot xonasi",
      ],
      availability: {
        dushanba: ["09:00-22:00"],
        seshanba: ["09:00-22:00"],
        chorshanba: ["09:00-22:00"],
        payshanba: ["09:00-22:00"],
        juma: ["09:00-22:00"],
        shanba: ["08:00-23:00"],
        yakshanba: ["08:00-23:00"],
      },
      contact: {
        phone: "+998901234567",
        email: "info@bunyodkor.uz",
      },
      rating: 4.8,
      reviews: 156,
      description:
        "Toshkentdagi eng zamonaviy stadionlardan biri. Professional futbol o‘yinlari uchun mo‘ljallangan.",
      parking_spaces: 500,
      construction_year: 2012,
    },
    {
      id: 2,
      name: "Paxtakor Stadium",
      image: [paxtakor, yoshlar, samarqand, navoiy],
      price: {
        hourly: 400000,
        daily: 2500000,
        currency: "UZS",
      },
      location: {
        address: "Mirzo Ulug‘bek tumani, Paxtakor ko‘chasi 1, Toshkent",
        city: "Toshkent",
        region: "Toshkent viloyati",
        coordinates: {
          latitude: 41.3111,
          longitude: 69.2797,
        },
      },
      type: "Usti yopiq",
      facilities: [
        "Proyektorlar",
        "Matbuot markazi",
        "Avtoturargoh",
        "Xavfsizlik",
        "Mashg‘ulot maydonlari",
      ],
      availability: {
        dushanba: ["10:00-21:00"],
        seshanba: ["10:00-21:00"],
        chorshanba: ["10:00-21:00"],
        payshanba: ["10:00-21:00"],
        juma: ["10:00-21:00"],
        shanba: ["09:00-22:00"],
        yakshanba: ["09:00-22:00"],
      },
      contact: {
        phone: "+998901234568",
        email: "contact@pakhtakor.uz",
      },
      rating: 4.5,
      reviews: 89,
      description: "Ko‘plab muhim o‘yinlarga mezbonlik qilgan tarixiy stadion.",
      parking_spaces: 300,
      construction_year: 1956,
    },
    {
      id: 3,
      name: "Yoshlar sport majmuasi",
      image: [yoshlar, samarqand, navoiy, fargona],
      price: {
        hourly: 200000,
        daily: 1200000,
        currency: "UZS",
      },
      location: {
        address: "Yakkasaroy tumani, Amir Temur shoh ko‘chasi 78, Toshkent",
        city: "Toshkent",
        region: "Toshkent viloyati",
        coordinates: {
          latitude: 41.2995,
          longitude: 69.2401,
        },
      },
      type: "Usti ochiq",
      facilities: [
        "Proyektorlar",
        "Kiyim almashtirish xonalari",
        "Avtoturargoh",
        "Sport zali",
        "Suzish havzasi",
      ],
      availability: {
        dushanba: ["06:00-23:00"],
        seshanba: ["06:00-23:00"],
        chorshanba: ["06:00-23:00"],
        payshanba: ["06:00-23:00"],
        juma: ["06:00-23:00"],
        shanba: ["06:00-24:00"],
        yakshanba: ["06:00-24:00"],
      },
      contact: {
        phone: "+998901234569",
        email: "info@yoshlar-sport.uz",
      },
      rating: 4.2,
      reviews: 67,
      description:
        "Yoshlar uchun mo‘ljallangan, turli sport turlari uchun mos kompleks.",
      parking_spaces: 150,
      construction_year: 2018,
    },
    {
      id: 4,
      name: "Samarqand stadioni",
      image: [samarqand, navoiy, fargona, bunyodkor],
      price: {
        hourly: 300000,
        daily: 1800000,
        currency: "UZS",
      },
      location: {
        address: "Registon ko‘chasi 15, Samarqand",
        city: "Samarqand",
        region: "Samarqand viloyati",
        coordinates: {
          latitude: 39.627,
          longitude: 66.975,
        },
      },
      type: "Usti yopiq",
      facilities: [
        "Proyektorlar",
        "VIP bo‘lim",
        "Avtoturargoh",
        "Kafe",
        "Birinchi yordam xonasi",
      ],
      availability: {
        dushanba: ["08:00-22:00"],
        seshanba: ["08:00-22:00"],
        chorshanba: ["08:00-22:00"],
        payshanba: ["08:00-22:00"],
        juma: ["08:00-22:00"],
        shanba: ["07:00-23:00"],
        yakshanba: ["07:00-23:00"],
      },
      contact: {
        phone: "+998901234570",
        email: "stadium@samarqand.uz",
      },
      rating: 4.6,
      reviews: 112,
      description:
        "Samarqandning markaziy stadioni. Tarixiy shahar markazida joylashgan.",
      parking_spaces: 200,
      construction_year: 2008,
    },
    {
      id: 5,
      name: "Navoiy stadioni",
      image: [navoiy, fargona, bunyodkor, paxtakor],
      price: {
        hourly: 250000,
        daily: 1500000,
        currency: "UZS",
      },
      location: {
        address: "Mustaqillik prospekti 45, Navoiy",
        city: "Navoiy",
        region: "Navoiy viloyati",
        coordinates: {
          latitude: 40.0844,
          longitude: 65.3792,
        },
      },
      type: "Usti yopiq",
      facilities: [
        "Proyektorlar",
        "Avtoturargoh",
        "Xavfsizlik",
        "Kafe",
        "Mashg‘ulot maydoni",
      ],
      availability: {
        dushanba: ["09:00-21:00"],
        seshanba: ["09:00-21:00"],
        chorshanba: ["09:00-21:00"],
        payshanba: ["09:00-21:00"],
        juma: ["09:00-21:00"],
        shanba: ["08:00-22:00"],
        yakshanba: ["08:00-22:00"],
      },
      contact: {
        phone: "+998901234571",
        email: "info@navoi-stadium.uz",
      },
      rating: 4.3,
      reviews: 45,
      description:
        "Navoiy shahrining asosiy stadioni. Mahalliy va mintaqaviy musobaqalar uchun ishlatiladi.",
      parking_spaces: 180,
      construction_year: 2015,
    },
    {
      id: 6,
      name: "Farg‘ona markaziy stadioni",
      image: [fargona, bunyodkor, paxtakor, yoshlar],
      price: {
        hourly: 350000,
        daily: 2000000,
        currency: "UZS",
      },
      location: {
        address: "Al-Farg‘oniy ko‘chasi 28, Farg‘ona",
        city: "Farg‘ona",
        region: "Farg‘ona viloyati",
        coordinates: {
          latitude: 40.3842,
          longitude: 71.7843,
        },
      },
      type: "Usti yopiq",
      facilities: [
        "Proyektorlar",
        "VIP zal",
        "Avtoturargoh",
        "Restoran",
        "Tibbiyot markazi",
        "Media markazi",
      ],
      availability: {
        dushanba: ["08:00-22:00"],
        seshanba: ["08:00-22:00"],
        chorshanba: ["08:00-22:00"],
        payshanba: ["08:00-22:00"],
        juma: ["08:00-22:00"],
        shanba: ["07:00-23:00"],
        yakshanba: ["07:00-23:00"],
      },
      contact: {
        phone: "+998901234572",
        email: "stadium@fergana.uz",
      },
      rating: 4.7,
      reviews: 98,
      description:
        "Farg‘ona vodiysidagi eng yirik stadion. Professional darajadagi sport tadbirlari uchun mo‘ljallangan.",
      parking_spaces: 250,
      construction_year: 2010,
    },
  ],
};

export const stadionsSlice = createSlice({
  name: "stadions",
  initialState,
  reducers: {},
});

export const {} = stadionsSlice.actions;

export default stadionsSlice.reducer;
