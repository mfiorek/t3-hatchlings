import React from "react";

const Footer = () => {
  return (
    <div className="flex flex-wrap justify-center gap-x-2 bg-neutral-700 p-2 text-sm text-neutral-50 shadow">
      <p className="text-center">Made for fun 🙃</p>
      <p className="text-center">
        by <a href="https://mfiorek.github.io/">Marcin Fiorek Codes</a> 🥦
      </p>
      <p className="text-center">
        Source code:{" "}
        <a href="https://github.com/mfiorek/t3-hatchlings">github</a> ⌨
      </p>
    </div>
  );
};

export default Footer;
