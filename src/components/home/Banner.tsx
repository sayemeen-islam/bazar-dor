import bannerImg from "@/assets/bazar-hero.png";
import Image from "next/image";

const Banner = () => {
  const date = new Date().toLocaleDateString("bn-BD", {
    dateStyle: "full",
  });

  return (
    <section className="mx-auto mt-5 mb-10 flex max-w-6xl flex-col items-center justify-between gap-6 rounded-3xl border border-base-300 bg-base-100 px-4 py-5 sm:mt-7 sm:mb-12 sm:gap-8 sm:px-4 sm:py-7 md:flex-row md:rounded-4xl lg:px-6">
      {/* Left: Text content */}
      <div className="w-full md:flex-1">
        <span className="badge w-fit rounded-full bg-accent-soft px-3 py-3 text-xs font-light text-accent sm:text-sm">
          {date}
        </span>

        <h1 className="mt-4 text-2xl leading-snug font-bold sm:text-3xl lg:text-4xl">
          আজকের বাজারের দাম এক নজরে
        </h1>

        <p className="my-5 text-sm leading-7 text-base-content/80 sm:my-6 sm:text-base">
          চাল, ডাল, তেল, সবজি, মাছ, মাংস, ডিম ও মসলার দাম — বাজারভিত্তিক
          বিস্তারিত, গড়, সর্বনিম্ন-সর্বাধিক এবং দামের পরিবর্তন এক জায়গায়।
        </p>

        <a
          href="#সব-পণ্য"
          className="btn btn-primary w-full rounded-xl sm:w-auto"
        >
          সব পণ্য দেখুন
        </a>
      </div>

      {/* Right: Banner image */}
      <div className="w-full max-w-xs sm:max-w-sm md:w-[42%] md:max-w-none md:flex-shrink-0">
        <Image
          src={bannerImg}
          alt="BazarDor market price banner"
          priority
          className="h-auto w-full object-contain"
          sizes="(max-width: 639px) 100vw, (max-width: 767px) 384px, 42vw"
        />
      </div>
    </section>
  );
};

export default Banner;


// import React from 'react';
// import bannerImg from '@/assets/bazar-hero.png'
// import Image from 'next/image';

// const Banner = () => {
//    const date = new Date().toLocaleDateString("bn-BD", {
//     dateStyle: "full",
//   });
//   return (
  
//       <div className='flex justify-between bg-base-100 border border-base-300 px-6 py-3  rounded-4xl max-w-6xl mx-auto mt-7 mb-15'>
//         {/* left */}
//         <div >
//            <span className='badge  bg-accent-soft px-2 rounded-4xl w-fit px-4 text-accent font-[300]'>{date}</span>
//          <h1 className='text-4xl font-bold mt-3'>আজকের বাজারের দাম এক নজরে</h1>
//          <p className='text-md text-base-content/80 my-8'>চাল, ডাল, তেল, সবজি, মাছ, মাংস, ডিম ও মসলার দাম — বাজারভিত্তিক বিস্তারিত, গড়, সর্বনিম্ন-সর্বাধিক <br></br>এবং দামের পরিবর্তন এক জায়গায়।</p>
//         <a href="#সব-পণ্য" > <button className='btn btn-primary rounded-lg w-[120px]'>সব পণ্য দেখুন</button></a>
//         </div>
//         <Image src={bannerImg} alt='Banner Image of Bazar Dor' width={400} height={400}></Image>

//       </div>

//   );
// };

// export default Banner;