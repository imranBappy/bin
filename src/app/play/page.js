"use client"
import React from "react";
import Play from "./Play";

const page = () => {
    console.log('Pay render!');
  return (
    <div>
      <h1>Hello World</h1>
      <Play id="1" />
      <Play id="2" />
      <Play id="3" />
    </div>
  );
};

export default page;
