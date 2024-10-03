import { AnimatePresence, motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { FaChevronLeft, FaChevronRight, FaCompress, FaExpand, FaTimes } from 'react-icons/fa';
import Center1 from "../assets/center-1.jpg";
import Center10 from "../assets/center-10.jpg";
import Center11 from "../assets/center-10.png";
import Center2 from "../assets/center-2.jpg";
import Center3 from "../assets/center-3.jpg";
import Center4 from "../assets/center-4.jpg";
import Center5 from "../assets/center-5.jpg";
import Center6 from "../assets/center-6.jpg";
import Center7 from "../assets/center-7.jpg";
import Center8 from "../assets/center-8.jpg";
import Center9 from "../assets/center-9.jpg";

const Images = () => {
  const [selectedImage, setSelectedImage] = useState<number | null>(null);
  const [filter] = useState('all');
  const [isFullscreen, setIsFullscreen] = useState(false);

  const images = [
    { src: Center1, alt: "Phòng khám", category: "clinic" },
    { src: Center2, alt: "Khu vực điều trị", category: "treatment" },
    { src: Center3, alt: "Hồ cá Koi", category: "pond" },
    { src: Center4, alt: "Thiết bị chuyên dụng", category: "equipment" },
    { src: Center5, alt: "Đội ngũ bác sĩ", category: "staff" },
    { src: Center6, alt: "Khu cách ly", category: "quarantine" },
    { src: Center7, alt: "Phòng xét nghiệm", category: "lab" },
    { src: Center8, alt: "Khu vực chăm sóc đặc biệt", category: "special-care" },
    { src: Center9, alt: "Khu vực tiếp đón", category: "reception" },
    { src: Center10, alt: "Khu vực nghiên cứu", category: "research" },
    { src: Center11, alt: "Cửa hàng thuốc", category: "pharmacy" },
  ];

  const filteredImages = filter === 'all' ? images : images.filter(img => img.category === filter);

  const handleNext = () => {
    setSelectedImage(prev => (prev === null || prev === filteredImages.length - 1) ? 0 : prev + 1);
  };

  const handlePrev = () => {
    setSelectedImage(prev => (prev === null || prev === 0) ? filteredImages.length - 1 : prev - 1);
  };

  const toggleFullscreen = () => {
    setIsFullscreen(!isFullscreen);
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (selectedImage !== null) {
        if (e.key === 'ArrowRight') handleNext();
        if (e.key === 'ArrowLeft') handlePrev();
        if (e.key === 'Escape') setSelectedImage(null);
        if (e.key === 'f') toggleFullscreen();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedImage, isFullscreen]);

  return (
    <div className="container mx-auto px-4 py-8 bg-gradient-to-b from-blue-50 to-white">
      <h1 className="text-4xl font-bold text-center mb-8 text-indigo-800">Bộ Sưu Tập Hình Ảnh Trung Tâm Thú Y Cá Koi</h1>
      

      <motion.div layout className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {filteredImages.map((image, index) => (
          <motion.div
            layout
            key={index}
            className="relative group overflow-hidden rounded-lg shadow-lg cursor-pointer"
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.3 }}
            onClick={() => setSelectedImage(index)}
          >
            <img
              src={image.src}
              alt={image.alt}
              className="w-full h-64 object-cover transition duration-300 ease-in-out"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center p-4">
              <p className="text-white text-center font-semibold">{image.alt}</p>
            </div>
          </motion.div>
        ))}
      </motion.div>

      <AnimatePresence>
        {selectedImage !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-90 flex items-center justify-center z-50"
            onClick={() => setSelectedImage(null)}
          >
            <div className={`relative ${isFullscreen ? 'w-screen h-screen' : 'max-w-4xl max-h-4xl'}`}>
              <motion.img 
                src={filteredImages[selectedImage].src} 
                alt={filteredImages[selectedImage].alt} 
                className="w-full h-full object-contain"
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.3 }}
              />
              <button className="absolute top-4 right-4 text-white text-2xl" onClick={(e) => { e.stopPropagation(); setSelectedImage(null); }}><FaTimes /></button>
              <button className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white text-4xl" onClick={(e) => { e.stopPropagation(); handlePrev(); }}><FaChevronLeft /></button>
              <button className="absolute right-4 top-1/2 transform -translate-y-1/2 text-white text-4xl" onClick={(e) => { e.stopPropagation(); handleNext(); }}><FaChevronRight /></button>
              <button className="absolute bottom-4 right-4 text-white text-2xl" onClick={(e) => { e.stopPropagation(); toggleFullscreen(); }}>
                {isFullscreen ? <FaCompress /> : <FaExpand />}
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default Images;