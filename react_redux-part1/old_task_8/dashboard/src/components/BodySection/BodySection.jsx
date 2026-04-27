import React from "react";

function BodySection({ title, children }) {
  return (
    <section className="App-bodysection mt-6">
      {title && <h2 className="text-xl font-semibold mb-2">{title}</h2>}
      {children}
    </section>
  );
}

export default BodySection;
