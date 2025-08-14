import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  BookmarkCheck,
  CircleQuestionMark,
  HomeIcon,
  User,
} from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";
import { AnimatedThemeToggler } from "@/components/magicui/animated-theme-toggler";

const routes = [
  { href: "/", icon: HomeIcon, label: "Bosh sahifa" },
  { href: "/saved", icon: BookmarkCheck, label: "Saqlangan" },
  { href: "/interests", icon: CircleQuestionMark, label: "Qiziq" },
  { href: "/profile", icon: User, label: "Profil" },
];

export default function Navbar() {
  const [theme, setTheme] = useState(null);
  const location = useLocation();

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme") || "light";
    setTheme(savedTheme);
    document.documentElement.classList.toggle("dark", savedTheme === "dark");
  }, []);

  const handleThemeToggle = () => {
    const newTheme = theme === "dark" ? "light" : "dark";
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);
    document.documentElement.classList.toggle("light", newTheme === "light");
  };

  return (
    <nav className="container mx-auto flex items-center sm:justify-between justify-center py-2 sm:py-4">
      <Link to="/" className="text-xl font-bold hidden sm:block">
        ManaPoliya
      </Link>

      <TooltipProvider>
        <div className="flex items-center text-center gap-5 sm:gap-3">
          {routes.map((item) => {
            const isActive = location.pathname === item.href;

            return (
              <div key={item.label}>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Link
                      to={item.href}
                      aria-label={item.label}
                      className={cn(
                        buttonVariants({ variant: "ghost", size: "icon" }),
                        "size-10 sm:size-12 rounded-full",
                        isActive && "bg-primary text-white dark:text-gray-900"
                      )}
                    >
                      <item.icon className="size-4 sm:size-4" />
                    </Link>
                  </TooltipTrigger>
                  <TooltipContent className="hidden sm:block">
                    <p>{item.label}</p>
                  </TooltipContent>
                </Tooltip>

                <span className="text-xs mt-1 block sm:hidden text-center">
                  {item.label}
                </span>
              </div>
            );
          })}

          <div>
            <Tooltip>
              <TooltipTrigger asChild>
                <div
                  className={cn(
                    buttonVariants({ variant: "ghost", size: "icon" }),
                    "size-10 sm:size-12 rounded-full cursor-pointer"
                  )}
                  onClick={handleThemeToggle}
                >
                  <AnimatedThemeToggler theme={theme} />
                </div>
              </TooltipTrigger>
              <TooltipContent className="hidden sm:block">
                <p>Tema o'zgartirish</p>
              </TooltipContent>
            </Tooltip>
            <span className="text-xs mt-1 block sm:hidden text-center">
              Tema
            </span>
          </div>
        </div>
      </TooltipProvider>
    </nav>
  );
}
