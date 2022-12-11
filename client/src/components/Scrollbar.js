import React from "react";

import "../styles/scrollbar.css";
import MovingText from "react-moving-text";

export default function Scrollbar() {
  return (
    <h3 className="scrollBar">
      <MovingText
        type="slideOutToBottom"
        duration="2000ms"
        delay="0s"
        direction="normal"
        timing="ease"
        iteration="infinite"
        fillMode="none"
      >
        Scroll Down
      </MovingText>
    </h3>
  );
}
