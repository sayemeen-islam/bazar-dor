import React from 'react';
import bannerImg from '@/assets/bazar-hero.png'
import Image from 'next/image';

const Banner = () => {
   const date = new Date().toLocaleDateString("bn-BD", {
    dateStyle: "full",
  });
  return (
  
      <div className='flex justify-between bg-base-100 border border-base-300 px-6 py-3  rounded-4xl max-w-6xl mx-auto mt-7 mb-15'>
        {/* left */}
        <div >
           <span className='badge  bg-accent-soft px-2 rounded-4xl w-fit px-4 text-accent '>{date}</span>
         <h1 className='text-4xl font-bold mt-3'>আজকের বাজারের দাম এক নজরে</h1>
         <p className='text-md text-base-content/80 my-8'>চাল, ডাল, তেল, সবজি, মাছ, মাংস, ডিম ও মসলার দাম — বাজারভিত্তিক বিস্তারিত, গড়, সর্বনিম্ন-সর্বাধিক <br></br>এবং দামের পরিবর্তন এক জায়গায়।</p>
        <a href="#সব-পণ্য" > <button className='btn btn-primary rounded-lg w-[120px]'>সব পণ্য দেখুন</button></a>
        </div>
        <Image src={bannerImg} alt='Banner Image of Bazar Dor' width={400} height={400}></Image>

      </div>

  );
};

export default Banner;