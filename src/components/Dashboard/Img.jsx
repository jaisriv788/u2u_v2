import image1 from "../../assets/Dashboard/u2uimg.png";
import image2 from "../../assets/Dashboard/u2uwallet.webp";
function Img() {
  return (
    <div className="grid lg:grid-cols-2 gap-3 sm:gap-5">
      <img src={image2} alt="img" className="rounded-lg" />
      <img src={image1} alt="img" className="rounded-lg" />
    </div>
  );
}

export default Img;
