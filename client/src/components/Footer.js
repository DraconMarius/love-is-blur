/* eslint-disable jsx-a11y/anchor-has-content */
import React from "react";
import "../styles/footer.css";

/* eslint-disable jsx-a11y/anchor-is-valid */
export default function Footer() {
  return (
    <div className="footer">
      <div className="column is-full  ">
        <div className="content has-text-centered ">
          <div
            className="a2a_kit a2a_kit_size_32 a2a_default_style"
            data-a2a-icon-color="#808080"
          >
            <a className="a2a_button_facebook"></a>
            <a className="a2a_button_twitter"></a>
            <a className="a2a_button_whatsapp a2a_counter"></a>
            <a className="a2a_button_reddit a2a_counter"></a>
            <p>Copyright © 2022 Love is Blur</p>
          </div>
        </div>
      </div>
    </div>
  );
}
