"use client";
import dynamic from "next/dynamic";
const Dictaphone = dynamic(() => import("./azure"), { ssr: false });
import React from "react";

function Page() {
  return <Dictaphone />;
}

export default Page;
