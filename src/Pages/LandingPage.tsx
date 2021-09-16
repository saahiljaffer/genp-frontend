import CTA from "../Components/CTA";
import Features from "../Components/Features";
import Hero from "../Components/Hero";
import { useEffect } from "react";
import { initializeApp } from "firebase/app";

export default function LandingPage({ signedIn }: { signedIn: boolean }) {
  return (
    <>
      <Hero signedIn={signedIn} />
      <Features />
      <CTA signedIn={signedIn} />
    </>
  );
}
