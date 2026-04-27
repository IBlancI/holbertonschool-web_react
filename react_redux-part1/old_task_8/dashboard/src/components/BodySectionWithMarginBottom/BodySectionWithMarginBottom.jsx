import React from "react";
import BodySection from "../BodySection/BodySection";

function BodySectionWithMarginBottom({ title, children }) {
  return (
    <div className="bodySectionWithMargin mb-8">
      <BodySection title={title}>{children}</BodySection>
    </div>
  );
}

export default BodySectionWithMarginBottom;
