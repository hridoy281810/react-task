import React from "react";
import { FiArrowUp } from "react-icons/fi";

const LeaderBoardItem = ({ item }) => {
  return (
    <div className="flex justify-between items-center rounded-2xl px-6 py-4 border border-[#ffffff] border-opacity-10">
      <div className="flex items-center">
        <p className="text-[#666666] font-thin">{item.sn}</p>
        <img className="w-[118px] h-[64px] rounded-lg ml-[25px] mr-[16px]" src={item.imageUrl} alt="image" />
        <h3 className="text-[#666666] font-thin text-xl w-[360px]">{item.title}</h3>
        <img className="w-[24px] h-[24px] rounded-full" src={item.authorImage} alt="" />
        <p className="text-[#DBFD51] font-thin ml-2">{item.author}</p>
      </div>
      <div className="inline-flex items-center gap-2">
        <p className="text-[#666666] font-thin">{item.likes}</p>
        <p className="text-[#9bff00]"><FiArrowUp /></p>
      </div>
    </div>
  );
};

export default LeaderBoardItem;




