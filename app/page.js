import Image from "next/image";
import RollingGallery from "./RollingGallery/page";
import SplitText from "./SplitText/page";
import ShinyText from "./ShinyText/page";
import TiltedCard from "./TiltedCard/page";
import CountUp from "./CountUp/page";
import Link from "next/link";

export default function Home() {

  const sneakers = [
    { name: "Blue Sneakers", slug: "blue-sneakers", image: "/shoes/Blue_Sneakers.jpeg" },
    { name: "Red Sneakers", slug: "red-sneakers", image: "/shoes/Red_Sneakers.jpeg" },
    { name: "Yellow Sneakers", slug: "yellow-sneakers", image: "/shoes/Yellow_Sneakers.jpeg" },
    { name: "Green Sneakers", slug: "green-sneakers", image: "/shoes/Green_Sneakers.jpeg" },
    { name: "Pink Sneakers", slug: "pink-sneakers", image: "/shoes/Pink_Sneakers.jpeg" },
    { name: "Orange Sneakers", slug: "orange-sneakers", image: "/shoes/Orange_Sneakers.jpeg" },
    { name: "Light Yellow Sneakers", slug: "light-yellow-sneakers", image: "/shoes/LightYellow_Sneakers.jpeg" },
    { name: "Cyan Sneakers", slug: "cyan-sneakers", image: "/shoes/Cyan_Sneakers.jpeg" },
  ];

  return (
    <>
      <section className=" bg-black ">

        <div id="firstpart" className="firstpart w-screen h-screen grid grid-cols-1 md:grid-cols-2">

          <div className="order-2 md:order-1 flex justify-center items-center md:h-auto">
            <RollingGallery autoplay={true} pauseOnHover={true} />
          </div>


          <div className="order-1 md:order-2 flex justify-center flex-col mx-6 md:mx-10 py-10 md:py-0  md:h-auto">
            <h1 className="text-4xl md:text-4xl lg:text-5xl font-bold text-[#4ED7F1] mt-2 leading-snug">
              <SplitText text="Step Into Style" />
            </h1>
            <p className="text-lg text-[#cfcfcf] mb-6">
              Discover classic, handcrafted shoes that redefine old-school fashion.
              Quality, comfort, and character -{" "}
              <ShinyText text="All in one" disabled={false} speed={3} className="custom-class" />
            </p>
            <p className="text-base text-[#4ED7F1]">
              Inspired by the past, crafted for today - every pair tells a story of
              craftsmanship, comfort, and timeless fashion.
            </p>
          </div>
        </div>

        <div id="secondpart" className="secondpart w-screen min-h-screen text-white px-4 py-8">
          {/* Header */}
          <h1 className="text-4xl md:text-4xl lg:text-5xl font-bold text-[#4ED7F1] mb-8 flex justify-center items-center">
            <SplitText text="Products" />
          </h1>

          {/* Sneaker */}
          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-3">
            {
              sneakers.map((sneaker, index) => {
                console.log(`buy/${sneaker.slug}?img=${encodeURIComponent(sneaker.image)}`);

                return (
                  <Link
                    key={index}
                    href={`buy/${sneaker.slug}?img=${encodeURIComponent(sneaker.image)}`}
                    className="bg-black rounded-xl p-4 flex justify-center items-center cursor-pointer"
                  >
                    <TiltedCard
                      imageSrc={sneaker.image}
                      altText={sneaker.name}
                      captionText={sneaker.name}
                      containerHeight="300px"
                      containerWidth="300px"
                      imageHeight="300px"
                      imageWidth="300px"
                      rotateAmplitude={12}
                      scaleOnHover={1.2}
                      showMobileWarning={false}
                      showTooltip={true}
                      displayOverlayContent={true}
                    />
                  </Link>
                );
              })
            }

          </div>
        </div>

        <div id="thirdpart" className="thirdpart w-full max-h-screen text-white flex flex-col items-center px-4 py-16">
          {/* Heading */}
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#4ED7F1] mb-12 text-center">
            <SplitText text="Our experience" />
          </h1>

          {/* Stats Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 sm:gap-10 text-center">
            {/* Years */}
            <div className="text-2xl sm:text-3xl flex flex-col items-center">
              Years
              <CountUp
                from={0}
                to={7}
                separator=","
                direction="up"
                duration={3}
                className="count-up-text my-2"
              />
            </div>

            {/* Customers */}
            <div className="text-2xl sm:text-3xl flex flex-col items-center">
              Customers
              <CountUp
                from={0}
                to={200000}
                separator=","
                direction="up"
                duration={3}
                className="count-up-text my-2"
              />
            </div>

            {/* Monthly Sales */}
            <div className="text-2xl sm:text-3xl flex flex-col items-center">
              Monthly sales~
              <CountUp
                from={0}
                to={2000}
                separator=","
                direction="up"
                duration={3}
                className="count-up-text my-2"
              />
            </div>

            {/* Branches */}
            <div className="text-2xl sm:text-3xl flex flex-col items-center">
              Branches
              <CountUp
                from={0}
                to={333}
                separator=","
                direction="up"
                duration={3}
                className="count-up-text my-2"
              />
            </div>
          </div>
        </div>

        <div id="fourthpart" className="fourthpart w-full max-h-screen px-4 py-12">

          <form action="https://formsubmit.co/186e9bcee7591bf75ebe733cf011c963 " method="POST">
            {/* Heading */}
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-[#4ED7F1] mb-12 text-center">
              <SplitText text="Contact us" />
            </h1>

            {/* Name + Email */}
            <div className="w-full max-w-4xl mx-auto flex flex-col md:flex-row justify-center items-center gap-6">
              <textarea
                required
                name="Name"
                placeholder="Name"
                className="text-white placeholder-white border-2 border-[#4ED7F1] w-full md:w-1/2 h-[8vh]
      text-lg pt-2 pl-3 rounded-md leading-tight appearance-none resize-none overflow-auto"
              />
              <textarea
                required
                name="Email"
                placeholder="Email"
                className="text-white placeholder-white border-2 border-[#4ED7F1] w-full md:w-1/2 h-[8vh]
      text-lg pt-2 pl-3 rounded-md leading-tight appearance-none resize-none overflow-auto"
              />
            </div>

            {/* Message Box */}
            <div className="w-full max-w-4xl mx-auto my-6">
              <textarea
                required
                name="Message"
                placeholder="Message"
                className="text-white placeholder-white border-2 border-[#4ED7F1] w-full h-[25vh]
      text-lg pt-3 pl-3 rounded-md leading-tight appearance-none resize-none overflow-auto"
              />
            </div>

            {/* Submit Button */}
            <div className="w-full flex justify-center items-center">
              <button type="submit" className="text-[#4ED7F1] hover:text-black hover:bg-[#4ED7F1] border-2 border-[#4ED7F1] cursor-pointer mt-4 px-10 py-3 text-lg font-medium rounded-md transition duration-200">
                SUBMIT
              </button>
            </div>
          </form>
        </div>


      </section>
    </>

  );
}
