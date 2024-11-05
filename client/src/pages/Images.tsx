import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import { FaChevronLeft, FaChevronRight, FaCompress, FaExpand, FaTimes } from "react-icons/fa";

import Center1 from "../assets/center-2.jpg"; // khu vuc dieu tri
import Center2 from "../assets/center-4.jpg";
import Center3 from "../assets/center-5.jpg";
import Center4 from "../assets/fish-care-1.jpg";
import Center5 from "../assets/fish-care-2.webp";

import Center7 from "../assets/doctor-1.jpg"; // doi ngu bac si
import Center8 from "../assets/doctor-2.jpg"; // doi ngu bac si
import Center9 from "../assets/doctor-3.jpg"; // doi ngu bac si
import Center6 from "../assets/fish-care-4.jpg"; // doi ngu bac si

import Center10 from "../assets/special-care-1.jpg"; //khu vuc cham soc dac biet
import Center11 from "../assets/special-care-2.jpg"; //khu vuc cham soc dac biet

import Center13 from "../assets/center-1.jpg"; //khu vuc tiep don
import Center12 from "../assets/center-3.jpg"; //khu vuc tiep don

import Center14 from "../assets/water-quality-1.jpg"; // ho ca
import Center16 from "../assets/water-quality-3.jpg"; // ho ca
import Center17 from "../assets/water-quality-4.jpg"; // ho ca
import Center15 from "../assets/water-quality-5.jpg"; // ho ca
import Center18 from "../assets/water-quality-6.jpg"; // ho ca
import Center19 from "../assets/water-quality-7.jpg"; // ho ca

import Center24 from "../assets/center-10.png"; // ca benh
import Center23 from "../assets/center-10.webp"; // ca benh
import Center25 from "../assets/center-11.webp"; // ca benh
import Center20 from "../assets/center-7.jpg"; // ca benh
import Center21 from "../assets/center-8.jpg"; // ca benh
import Center22 from "../assets/center-9.jpg"; // ca benh

const Images = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const [selectedImage, setSelectedImage] = useState<number | null>(null);
  const [filter] = useState("all");
  const [isFullscreen, setIsFullscreen] = useState(false);

  const images = [
    { src: Center1, alt: "Khu vực điều trị", category: "treatment" },
    { src: Center2, alt: "Khu vực điều trị", category: "treatment" },
    { src: Center14, alt: "Hồ cá Koi", category: "pond" },
    { src: Center12, alt: "Khu vực tiếp đón", category: "reception" },
    { src: Center6, alt: "Đội ngũ bác sĩ", category: "staff" },
    { src: Center24, alt: "Cá bị bệnh", category: "sick-fish" },
    { src: Center20, alt: "Cá bị bệnh", category: "sick-fish" },
    { src: Center10, alt: "Khu vực chăm sóc đặc biệt", category: "special-care" },
    { src: Center13, alt: "Khu vực tiếp đón", category: "reception" },
    { src: Center15, alt: "Hồ cá Koi", category: "pond" },
    { src: Center21, alt: "Cá bị bệnh", category: "sick-fish" },
    { src: Center3, alt: "Khu vực điều trị", category: "treatment" },
    { src: Center7, alt: "Đội ngũ bác sĩ", category: "staff" },
    { src: Center16, alt: "Hồ cá Koi ", category: "pond" },
    { src: Center4, alt: "Khu vực điều trị", category: "treatment" },
    { src: Center8, alt: "Đội ngũ bác sĩ", category: "staff" },
    { src: Center22, alt: "Cá bị bệnh", category: "sick-fish" },
    { src: Center17, alt: "Hồ cá Koi", category: "pond" },
    { src: Center23, alt: "Cá bị bệnh", category: "sick-fish" },
    { src: Center5, alt: "Khu vực điều trị", category: "treatment" },
    { src: Center11, alt: "Khu vực chăm sóc đặc biệt", category: "special-care" },
    { src: Center9, alt: "Đội ngũ bác sĩ", category: "staff" },
    { src: Center18, alt: "Hồ cá Koi", category: "pond" },
    { src: Center19, alt: "Hồ cá Koi", category: "pond" },
    { src: Center25, alt: "Cá bị bệnh", category: "sick-fish" },
    // { src: Center23, alt: "Cá bị bệnh", category: "sick-fish" },
  ];

  const filteredImages =
    filter === "all" ? images : images.filter((img) => img.category === filter);

  const handleNext = () => {
    setSelectedImage((prev) =>
      prev === null || prev === filteredImages.length - 1 ? 0 : prev + 1,
    );
  };

  const handlePrev = () => {
    setSelectedImage((prev) =>
      prev === null || prev === 0 ? filteredImages.length - 1 : prev - 1,
    );
  };

  const toggleFullscreen = () => {
    setIsFullscreen(!isFullscreen);
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (selectedImage !== null) {
        if (e.key === "ArrowRight") handleNext();
        if (e.key === "ArrowLeft") handlePrev();
        if (e.key === "Escape") setSelectedImage(null);
        if (e.key === "f") toggleFullscreen();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [selectedImage, isFullscreen]);

  return (
    <div>
      {/* Section 1: Header */}
      <div className="section pt-30 bg-gradient-to-t from-[#2A7F9E] to-[#175670] py-36 text-center">
        <div className="container mx-auto">
          <h1 className="mb-8 bg-gradient-to-r from-white to-blue-100 bg-clip-text pb-5 text-center text-5xl font-bold leading-tight text-transparent">
            Bộ Sưu Tập Hình Ảnh Trung Tâm Thú Y Cá Koi
          </h1>

          {/* Image Grid */}
          <motion.div
            layout
            className="grid grid-cols-2 gap-6 px-4 md:grid-cols-3 lg:grid-cols-4"
          >
            {filteredImages.map((image, index) => (
              <motion.div
                layout
                key={index}
                className="group relative aspect-square cursor-pointer overflow-hidden rounded-lg shadow-lg"
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.3 }}
                onClick={() => setSelectedImage(index)}
              >
                <img
                  src={image.src}
                  alt={image.alt}
                  className="h-full w-full object-cover transition duration-300 ease-in-out"
                />
                <div className="absolute inset-0 flex items-end justify-center bg-gradient-to-t from-black to-transparent p-4 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                  <p className="text-center font-semibold text-white">{image.alt}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>

      <AnimatePresence>
        {selectedImage !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-90"
            onClick={() => setSelectedImage(null)}
          >
            <div
              className={`relative ${isFullscreen ? "h-full w-full" : "h-[80vmin] w-[80vmin]"} flex items-center justify-center`}
            >
              <motion.img
                src={filteredImages[selectedImage].src}
                alt={filteredImages[selectedImage].alt}
                className={`h-full w-full object-cover ${isFullscreen ? "" : "rounded-lg"}`}
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.3 }}
              />
              <button
                className="absolute right-4 top-4 text-2xl text-white"
                onClick={(e) => {
                  e.stopPropagation();
                  setSelectedImage(null);
                }}
              >
                <FaTimes />
              </button>
              <button
                className="absolute left-4 top-1/2 -translate-y-1/2 transform text-4xl text-white"
                onClick={(e) => {
                  e.stopPropagation();
                  handlePrev();
                }}
              >
                <FaChevronLeft />
              </button>
              <button
                className="absolute right-4 top-1/2 -translate-y-1/2 transform text-4xl text-white"
                onClick={(e) => {
                  e.stopPropagation();
                  handleNext();
                }}
              >
                <FaChevronRight />
              </button>
              <button
                className="absolute bottom-4 right-4 text-2xl text-white"
                onClick={(e) => {
                  e.stopPropagation();
                  toggleFullscreen();
                }}
              >
                {isFullscreen ? <FaCompress /> : <FaExpand />}
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Images;
