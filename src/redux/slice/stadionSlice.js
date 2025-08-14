import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  data: [
    {
      id: 1,
      nomi: "Bunyodkor Staidoni",
      rasmi: "https://example.com/images/bunyodkor-stadium.jpg",
      narxi: {
        soatlik: 500000,
        kunlik: 3000000,
        valyuta: "UZS",
      },
      joylashuvi: {
        manzili: "Chilonzor tumani, Bodomzor yo'li 2-uy, Toshkent",
        shahri: "Toshkent",
        viloyati: "Toshkent viloyati",
        koordinatalar: {
          kenglik: 41.2358,
          uzunlik: 69.1853,
        },
      },
      turi: "usti yopiq",
      imkoniyatlar: [
        "Proyektorlar",
        "VIP zal",
        "Parking",
        "Restoran",
        "Tibbiy xona",
      ],
      mavjudlik: {
        dushanba: ["09:00-22:00"],
        seshanba: ["09:00-22:00"],
        chorshanba: ["09:00-22:00"],
        payshanba: ["09:00-22:00"],
        juma: ["09:00-22:00"],
        shanba: ["08:00-23:00"],
        yakshanba: ["08:00-23:00"],
      },
      aloqa: {
        telefon: "+998901234567",
        email: "info@bunyodkor.uz",
        veb_sayt: "https://bunyodkor.uz",
      },
      reyting: 4.8,
      sharhlar: 156,
      tavsif:
        "Toshkentdagi eng zamonaviy stadionlardan biri. Professional futbol o'yinlari uchun mo'ljallangan.",
      parking_joylari: 500,
      qurilish_yili: 2012,
    },
    {
      id: 2,
      nomi: "Pakhtakor Stadioni",
      rasmi: "https://example.com/images/pakhtakor-stadium.jpg",
      narxi: {
        soatlik: 400000,
        kunlik: 2500000,
        valyuta: "UZS",
      },
      joylashuvi: {
        manzili: "Mirzo Ulug'bek tumani, Pakhtakor ko'chasi 1-uy, Toshkent",
        shahri: "Toshkent",
        viloyati: "Toshkent viloyati",
        koordinatalar: {
          kenglik: 41.3111,
          uzunlik: 69.2797,
        },
      },
      turi: "usti yopiq",
      imkoniyatlar: [
        "Proyektorlar",
        "Matbuot markazi",
        "Parking",
        "Xavfsizlik",
        "Mashq maydonlari",
      ],
      mavjudlik: {
        dushanba: ["10:00-21:00"],
        seshanba: ["10:00-21:00"],
        chorshanba: ["10:00-21:00"],
        payshanba: ["10:00-21:00"],
        juma: ["10:00-21:00"],
        shanba: ["09:00-22:00"],
        yakshanba: ["09:00-22:00"],
      },
      aloqa: {
        telefon: "+998901234568",
        email: "contact@pakhtakor.uz",
        veb_sayt: "https://pakhtakor.uz",
      },
      reyting: 4.5,
      sharhlar: 89,
      tavsif: "Tarixiy stadion, ko'plab muhim o'yinlarga mezbonlik qilgan.",
      parking_joylari: 300,
      qurilish_yili: 1956,
    },
    {
      id: 3,
      nomi: "Yoshlar Sport Majmuasi",
      rasmi: "https://example.com/images/yoshlar-stadium.jpg",
      narxi: {
        soatlik: 200000,
        kunlik: 1200000,
        valyuta: "UZS",
      },
      joylashuvi: {
        manzili: "Yakkasaroy tumani, Amir Temur shoh ko'chasi 78, Toshkent",
        shahri: "Toshkent",
        viloyati: "Toshkent viloyati",
        koordinatalar: {
          kenglik: 41.2995,
          uzunlik: 69.2401,
        },
      },
      turi: "usti ochiq",
      imkoniyatlar: [
        "Proyektorlar",
        "Kiyinish xonalari",
        "Parking",
        "Sport zali",
        "Suzish havzasi",
      ],
      mavjudlik: {
        dushanba: ["06:00-23:00"],
        seshanba: ["06:00-23:00"],
        chorshanba: ["06:00-23:00"],
        payshanba: ["06:00-23:00"],
        juma: ["06:00-23:00"],
        shanba: ["06:00-24:00"],
        yakshanba: ["06:00-24:00"],
      },
      aloqa: {
        telefon: "+998901234569",
        email: "info@yoshlar-sport.uz",
        veb_sayt: "https://yoshlar-sport.uz",
      },
      reyting: 4.2,
      sharhlar: 67,
      tavsif:
        "Yoshlar uchun mo'ljallangan sport majmuasi. Turli sport turlari uchun qulay.",
      parking_joylari: 150,
      qurilish_yili: 2018,
    },
    {
      id: 4,
      nomi: "Samarqand Staidoni",
      rasmi: "https://example.com/images/samarqand-stadium.jpg",
      narxi: {
        soatlik: 300000,
        kunlik: 1800000,
        valyuta: "UZS",
      },
      joylashuvi: {
        manzili: "Registon ko'chasi 15, Samarqand",
        shahri: "Samarqand",
        viloyati: "Samarqand viloyati",
        koordinatalar: {
          kenglik: 39.627,
          uzunlik: 66.975,
        },
      },
      turi: "usti yopiq",
      imkoniyatlar: [
        "Proyektorlar",
        "VIP sektori",
        "Parking",
        "Kafeterya",
        "Birinchi yordam",
      ],
      mavjudlik: {
        dushanba: ["08:00-22:00"],
        seshanba: ["08:00-22:00"],
        chorshanba: ["08:00-22:00"],
        payshanba: ["08:00-22:00"],
        juma: ["08:00-22:00"],
        shanba: ["07:00-23:00"],
        yakshanba: ["07:00-23:00"],
      },
      aloqa: {
        telefon: "+998901234570",
        email: "stadium@samarqand.uz",
        veb_sayt: "https://samarqand-stadium.uz",
      },
      reyting: 4.6,
      sharhlar: 112,
      tavsif:
        "Samarqand shahrining markaziy staidoni. Tarixiy shahar markazida joylashgan.",
      parking_joylari: 200,
      qurilish_yili: 2008,
    },
    {
      id: 5,
      nomi: "Navoi Staidoni",
      rasmi: "https://example.com/images/navoi-stadium.jpg",
      narxi: {
        soatlik: 250000,
        kunlik: 1500000,
        valyuta: "UZS",
      },
      joylashuvi: {
        manzili: "Mustaqillik shoh ko'chasi 45, Navoi",
        shahri: "Navoi",
        viloyati: "Navoi viloyati",
        koordinatalar: {
          kenglik: 40.0844,
          uzunlik: 65.3792,
        },
      },
      turi: "usti yopiq",
      imkoniyatlar: [
        "Proyektorlar",
        "Parking",
        "Xavfsizlik",
        "Kafeterya",
        "Mashq maydoni",
      ],
      mavjudlik: {
        dushanba: ["09:00-21:00"],
        seshanba: ["09:00-21:00"],
        chorshanba: ["09:00-21:00"],
        payshanba: ["09:00-21:00"],
        juma: ["09:00-21:00"],
        shanba: ["08:00-22:00"],
        yakshanba: ["08:00-22:00"],
      },
      aloqa: {
        telefon: "+998901234571",
        email: "info@navoi-stadium.uz",
        veb_sayt: "https://navoi-stadium.uz",
      },
      reyting: 4.3,
      sharhlar: 45,
      tavsif:
        "Navoi shahridagi asosiy stadion. Mahalliy va mintaqaviy musobaqalar uchun.",
      parking_joylari: 180,
      qurilish_yili: 2015,
    },
    {
      id: 6,
      nomi: "Farg'ona Markaziy Staidoni",
      rasmi: "https://example.com/images/fergana-stadium.jpg",
      narxi: {
        soatlik: 350000,
        kunlik: 2000000,
        valyuta: "UZS",
      },
      joylashuvi: {
        manzili: "Al-Farg'oniy ko'chasi 28, Farg'ona",
        shahri: "Farg'ona",
        viloyati: "Farg'ona viloyati",
        koordinatalar: {
          kenglik: 40.3842,
          uzunlik: 71.7843,
        },
      },
      turi: "usti yopiq",
      imkoniyatlar: [
        "Proyektorlar",
        "VIP zal",
        "Parking",
        "Restoran",
        "Tibbiy markaz",
        "Media markaz",
      ],
      mavjudlik: {
        dushanba: ["08:00-22:00"],
        seshanba: ["08:00-22:00"],
        chorshanba: ["08:00-22:00"],
        payshanba: ["08:00-22:00"],
        juma: ["08:00-22:00"],
        shanba: ["07:00-23:00"],
        yakshanba: ["07:00-23:00"],
      },
      aloqa: {
        telefon: "+998901234572",
        email: "stadium@fergana.uz",
        veb_sayt: "https://fergana-stadium.uz",
      },
      reyting: 4.7,
      sharhlar: 98,
      tavsif:
        "Farg'ona vodiysining eng yirik staidoni. Professional darajadagi sport tadbirlari uchun.",
      parking_joylari: 250,
      qurilish_yili: 2010,
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
