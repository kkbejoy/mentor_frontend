import { HeroSectionWelcomeMessage } from "../../../constants/messageToFront";
import HomePageMentorCards from "../Cards/HomePageMentorCards";
import HomePageTypewriter from "../Typewriter/HomePageTypewriter";

import Slider from "react-slick";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchMentorsListUsingSearchInput } from "../../../slices/MenteeSlices/mentorSearchResultSlice";
export default function HeroSection() {
  const dispatch = useDispatch();
  const mentorListForCards = useSelector(
    (state) => state?.mentorSearchResult?.data?.mentorsSearchResult
  );

  const price = useSelector((state) => state.mentorSearchInput.priceRange);
  const rating = useSelector((state) => state.mentorSearchInput.rating);
  const search = useSelector((state) => state.mentorSearchInput.search);

  console.log("Mentors", mentorListForCards);
  useEffect(() => {
    dispatch(fetchMentorsListUsingSearchInput({ search, price, rating }));
  }, []);
  const settings = {
    dots: true,
    infinite: true,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    speed: 2000,
    autoplaySpeed: 1500,
    cssEase: "linear",
  };
  const trailArray = [{}, {}, {}];
  return (
    <div className="bg-white">
      <div className="relative isolate px-6  lg:px-8">
        {/* <div
          className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80"
          aria-hidden="true"
        > */}
        {/* <div
          className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]"
          style={{
            clipPath:
              "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
          }}
        /> */}
        {/* </div> */}
        <div className="mx-auto max-w-xl py-32 sm:py-48 lg:my-auto">
          <div className="hidden sm:mb-8 sm:flex sm:justify-center">
            <div className="relative rounded-full px-3 py-1 text-sm leading-6 text-gray-600 ring-1  ring-gray-900/10 hover:ring-gray-900/20">
              Learn a new skill, launch a project, land your dream career.
              {/* <a href="#" className="font-semibold text-indigo-600">
                <span className="absolute inset-0" aria-hidden="true" />
                Read more <span aria-hidden="true">&rarr;</span>
              </a> */}
            </div>
          </div>
          <div className="text-center">
            {/* <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
              1-on-1 Start-up Mentorship
            </h1> */}

            <HomePageTypewriter />
            <p className="mt-6 text-lg leading-8 text-gray-600">
              {HeroSectionWelcomeMessage}
            </p>
            <div className="mt-10 flex items-center justify-center "></div>
          </div>{" "}
          {/* <SearchBar /> */}
        </div>
        <div
          className="absolute inset-x-0 top-[calc(100%-13rem)] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[calc(100%-30rem)]"
          aria-hidden="true"
        >
          <div
            className="relative left-[calc(50%+3rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%+36rem)] sm:w-[72.1875rem]"
            style={{
              clipPath:
                "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
            }}
          />
        </div>
        <div className=" w-3/4 m-auto ">
          <div className="mt-0 mb-10 transition-all">
            {" "}
            <Slider {...settings}>
              {mentorListForCards?.slice(0, 4).map((mentor) => {
                return <HomePageMentorCards profile={mentor} />;
              })}
            </Slider>
          </div>
        </div>
      </div>
    </div>
  );
}
