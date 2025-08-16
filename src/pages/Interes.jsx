import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Send, HelpCircle } from "lucide-react";
import { motion } from "framer-motion";

export default function Interes() {
  return (
    <div className="container mx-auto p-6">
      <h1 className="text-center text-4xl font-bold mb-8">Qiziqarli Sahifa</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <a
          href="https://t.me/manapolya_uz"
          target="_blank"
          rel="noopener noreferrer"
        >
          <motion.div
            whileHover={{ scale: 1.07, rotate: 1 }}
            transition={{ type: "spring", stiffness: 300 }}
            className="relative group"
          >
            <Card className="relative cursor-pointer transition-all hover:scale-105 active:scale-95 hover:shadow-xl">
              <div className="absolute inset-0 rounded-[10px] bg-gradient-to-r from-blue-400/0 via-purple-500/0 to-pink-500/0 group-hover:from-blue-400/30 group-hover:via-purple-500/30 group-hover:to-pink-500/30 transition-all duration-500"></div>

              <CardHeader className="flex flex-row items-center gap-3 relative z-10">
                <Send className="w-8 h-8 text-blue-500" />
                <CardTitle>Telegram Kanalimiz</CardTitle>
              </CardHeader>

              <CardContent className="relative">
                <p className="text-gray-600">
                  Yangiliklar va e’lonlardan birinchi bo‘lib xabardor bo‘lish
                  uchun hoziroq bosing.
                </p>
              </CardContent>

              <div className="absolute inset-0 flex items-center justify-center bg-black/80 text-white text-xl font-bold opacity-0 group-hover:opacity-100 transition-opacity rounded-[10px] duration-500">
                Kirish →
              </div>
            </Card>
          </motion.div>
        </a>

        <a
          href="https://t.me/manapolya_ali"
          target="_blank"
          rel="noopener noreferrer"
        >
          <motion.div
            whileHover={{ scale: 1.07, rotate: -1 }}
            transition={{ type: "spring", stiffness: 300 }}
            className="relative group"
          >
            <Card className="relative cursor-pointer transition-all hover:scale-105 active:scale-95 hover:shadow-xl">
              <div className="absolute rounded-[10px] inset-0 bg-gradient-to-r from-green-400/0 via-yellow-400/0 to-red-400/0 group-hover:from-green-400/30 group-hover:via-yellow-400/30 group-hover:to-red-400/30 transition-all duration-500"></div>

              <CardHeader className="flex flex-row items-center gap-3 relative z-10">
                <HelpCircle className="w-8 h-8 text-green-500" />
                <CardTitle>Yordam va Takliflar</CardTitle>
              </CardHeader>

              <CardContent className="relative z-10">
                <p className="text-gray-600">
                  Savol, muammo yoki takliflaringizni yozishingiz mumkin.
                </p>
              </CardContent>

              {/* Hoverda chiqadigan overlay */}
              <div className="absolute inset-0 flex items-center rounded-[10px] justify-center bg-black/70 text-white text-xl font-bold opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                Kirish →
              </div>
            </Card>
          </motion.div>
        </a>
      </div>
    </div>
  );
}
