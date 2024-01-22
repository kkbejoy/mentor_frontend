import React from "react";

import { Typewriter, useTypewriter, Cursor } from "react-simple-typewriter";
import { HeroSectionTypewriterWords } from "../../../constants/messageToFront";
const HomePageTypewriter = () => {
  const [typewriter] = useTypewriter({
    words: HeroSectionTypewriterWords,
    loop: 0,

    typeSpeed: 100,
    deleteSpeed: 40,
  });
  return (
    <div className="text-center h-12">
      <h1 className="text-sm font-bold tracking-tight text-gray-900 sm:text-xl transition-transform">
        {typewriter}
        <Cursor cursorColor="red" />
      </h1>
    </div>
  );
};

export default HomePageTypewriter;
