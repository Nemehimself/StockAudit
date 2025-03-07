import React from "react";
import { motion } from "framer-motion";

interface MenuItem {
  icon: React.ElementType;
  label: string;
  bg: string;
}

interface MenuDropdownProps {
  menuItems: MenuItem[];
  setActiveIndex: (index: number) => void;
  setIsMenuOpen: (isOpen: boolean) => void;
}

const MenuDropdown: React.FC<MenuDropdownProps> = ({ menuItems, setActiveIndex, setIsMenuOpen }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      className="absolute top-16 left-4 bg-white shadow-lg rounded-md w-56 p-2 z-30"
    >
      {menuItems.map((item, index) => (
        <div
          key={index}
          className={`flex items-center gap-3 p-3 mt-2 cursor-pointer rounded-md transition ${item.bg} text-white hover:opacity-80`}
          onClick={() => {
            setActiveIndex(index);
            setIsMenuOpen(false);
          }}
        >
          <item.icon className="w-6 h-6" />
          <span>{item.label}</span>
        </div>
      ))}
    </motion.div>
  );
};

export default MenuDropdown;
