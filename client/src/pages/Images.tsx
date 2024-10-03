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
  return (
    <div className="grid grid-cols-3 gap-4">
      <img src={Center1} alt="Center 1" className="w-full h-auto rounded-lg" />
      <img src={Center2} alt="Center 2" className="w-full h-auto rounded-lg" />
      <img src={Center3} alt="Center 3" className="w-full h-auto rounded-lg" />
      <img src={Center4} alt="Center 4" className="w-full h-auto rounded-lg" />
      <img src={Center5} alt="Center 5" className="w-full h-auto rounded-lg" />
      <img src={Center6} alt="Center 6" className="w-full h-auto rounded-lg" />
      <img src={Center7} alt="Center 7" className="w-full h-auto rounded-lg" />
      <img src={Center8} alt="Center 8" className="w-full h-auto rounded-lg" />
      <img src={Center9} alt="Center 9" className="w-full h-auto rounded-lg" />
      <img src={Center10} alt="Center 10" className="w-full h-auto rounded-lg" />
      <img src={Center11} alt="Center 11" className="w-full h-auto rounded-lg" />
    </div>
  );
}

export default Images;