"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import Header from "./_components/Header";
import Hero from "./_components/Hero";

type Props = {};
export default function Home(props: Props) {
  return (
    <div>
      <Header/>
      <Hero/>
    </div> 
  );
}
