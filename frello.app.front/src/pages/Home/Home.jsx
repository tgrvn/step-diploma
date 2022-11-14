import React from "react";
import SectionWelcome from "./sections/SectionWelcome/SectionWelcome";
import SectionPreview from "./sections/SectionPreview/SectionPreview";
import SectionFeatures from "./sections/SectionFeatures/SectionFeatures";
import SectionActionCall from "./sections/SectionActionCall/SectionActionCall";

export default function Home() {
  return (
    <div className="home">
      <SectionWelcome />
      <div className="container">
        <SectionPreview />
        <SectionFeatures />
        <SectionActionCall />
      </div>
    </div>
  );
}
