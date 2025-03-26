import React, { useState, useEffect } from "react";
import axios from "axios";
import { Plus, Minus } from "lucide-react";
import { Trophy } from "lucide-react";

export default function LivePortal() {
  const [progress, setProgress] = useState(0);
  const PAGE_SIZE = 10;
  const [searchList, setSearchList] = useState(0);
  const [count, setCount] = useState(0);

  const getProduct = async () => {
    await axios.get(`https://dummyjson.com/recipes/search`).then((res) => {
      setSearchList(res.data?.recipes);
      setCount(res.data?.total);
    });
  };

  useEffect(() => {
    getProduct();
    console.log(searchList);
  }, [progress]);

  const totalPage = Math.ceil(count / PAGE_SIZE);

  return (
    <>
      <div className="p-4 justify-center items-center ">
        <div className="flex space-x-4 items-center">
          <input
            value={progress}
            placeholder="Enter the Progress"
            onChange={(e) => {
              const value = Math.max(0, Number(e.target.value)); // Ensures value is at least 0
              setProgress(value);
            }}
            type="number"
            className="w-40 flex items-center border mb-2 text-sm rounded-lg p-2"
          />
          <span
            onClick={() => setProgress((pre) => pre + 1)}
            className="border cursor-pointer mb-2 flex items-center p-2 rounded-lg"
          >
            <Plus size={18} />
          </span>
          <span
            onClick={() => setProgress((pre) => Math.max(0, pre - 1))}
            className="border cursor-pointer mb-2 flex items-center p-2 rounded-lg"
          >
            <Minus size={18} />
          </span>
        </div>
        <div className="border border-gray-600 border-r-2 border-b-2 overflow-hidden rounded-lg ">
          <div
            role="progressbar"
            aria-valuenow={progress}
            aria-valuemax={100}
            aria-valuemin={0}
            className={`${
              progress < 16
                ? "bg-red-600 text-red-900"
                : progress >= 16 && progress < 60
                ? "bg-orange-500 text-orange-900"
                : progress >= 60
                ? "bg-green-500 text-green-900"
                : ""
            } transition-all  delay-200 duration-300 ease-in text-xs p-2 text-end  transform translate-x-[${
              progress - 100
            }%] `}
          >
            <span className="font-semibold ">{progress}%</span>
          </div>
        </div>
        {progress < 15 ? (
          <div>Focus on Study</div>
        ) : (
          <div className="flex mt-10 justify-center items-center space-x-2">
            <span className="text-sm text-orange-500">Topper</span>
            <Trophy className="text-orange-400" size={15} />
          </div>
        )}
      </div>
    </>
  );
}
