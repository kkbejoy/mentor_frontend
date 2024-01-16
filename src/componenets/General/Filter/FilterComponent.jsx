import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import {
  setPriceRange,
  setRating,
} from "../../../slices/MenteeSlices/searchSlice";

const FilterComponent = ({ applyFilter }) => {
  const dispatch = useDispatch();
  const [selectedPrice, setSelectedPrice] = useState("a");
  const [selectedRating, setSelectedRating] = useState("9");
  useEffect(() => {
    console.log("Selected Price", selectedPrice);
    dispatch(setPriceRange(selectedPrice));
    dispatch(setRating(selectedRating));
  }, [selectedPrice, selectedRating]);

  const priceObject = [
    {
      value: "a",
      price: "Any",
    },

    {
      value: "b",
      price: "Under  ₹1000",
    },
    {
      value: "c",
      price: "₹1000-₹2500",
    },
    {
      value: "d",
      price: "₹2000-₹5000",
    },
    {
      value: "e",
      price: " Above ₹5000",
    },
  ];

  const ratingObject = [
    {
      value: "1",
      rating: "⭐",
    },
    {
      value: "2",
      rating: "⭐⭐",
    },
    {
      value: "3",
      rating: "⭐⭐⭐",
    },
    {
      value: "4",
      rating: "⭐⭐⭐⭐",
    },
    {
      value: "5",
      rating: "⭐⭐⭐⭐⭐",
    },
  ];

  return (
    <div className="block md:inline-flex w-full p-4 bg-white">
      <div className="ml-2 items-center space-x-4 w-1/2">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Price:
        </label>
        <div className="flex w-1/2">
          <div className="inline-flex items-center">
            {priceObject?.map((priceRange) => {
              return (
                <div
                  key={priceRange.value}
                  className="flex items-center space-x-2 "
                >
                  <input
                    type="checkbox"
                    id={`price-${priceRange.value}`}
                    value={priceRange.value}
                    checked={selectedPrice === priceRange.value}
                    onChange={(e) =>
                      setSelectedPrice(
                        e.target.checked ? priceRange?.value : "a"
                      )
                    }
                    className="peer h-5 w-5 cursor-pointer appearance-none rounded-md border border-blue-gray-200 transition-all checked:border-black checked:bg-blue-700 checked:border-0"
                  />
                  <label
                    htmlFor={`price-${priceRange.value}`}
                    className="text-gray-700 relative text-sm flex items-center p-3 rounded-full cursor-pointer"
                  >
                    {priceRange.price}
                  </label>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <div className="ml-2 items-end  space-x-4 w-1/2 ">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Rating:
        </label>
        <div className="flex w-1/2">
          <div className="inline-flex items-center">
            {ratingObject?.map((ratings) => {
              return (
                <div
                  key={ratings.rating}
                  className="flex items-center shadow-sm mr-2 "
                >
                  <input
                    type="checkbox"
                    id={`reviews-${ratings.value}`}
                    value={ratings.value}
                    checked={selectedRating === ratings.value}
                    onChange={(e) =>
                      setSelectedRating(e.target.checked ? ratings.value : a)
                    }
                    className="peer h-5 w-5 cursor-pointer appearance-none rounded-md border border-blue-gray-200 transition-all checked:border-black checked:bg-yellow-300 checked:border-0"
                  />
                  <label
                    htmlFor={`reviews-${ratings.value}`}
                    className="text-gray-700 relative flex items-center p-3 rounded-full cursor-pointer"
                  >
                    {ratings.rating}
                  </label>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* <button
        className="w-full bg-blue-500 text-white font-semibold p-3 rounded hover:bg-blue-600 mt-4"
        onClick={handleFilter}
      >
        Apply Filters
      </button> */}
    </div>
  );
};

export default FilterComponent;
