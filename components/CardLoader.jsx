import React from "react";

const CardLoader = () => {
  return (
    <div className="w-full py-3 px-5 border-b rounded-xl border-[#353535] hover:bg-[#1d1d1d] space-y-2">
     <div className="w-full h-[10px] bg-[#b5b5b5] animate-pulse"></div>
     <div className="w-[50%] h-[10px] bg-[#fff] animate-pulse"></div>
     <div className="w-[70%] h-[10px] bg-[#646262] animate-pulse"></div>
    </div>
  );
};

export default CardLoader;
