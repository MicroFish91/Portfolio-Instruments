import React from "react";

const Footer: React.FC = () => {
  const now = new Date();

  return (
    <div>
      <footer className="footer">
        <div className="container">
          <div className="row align-items-center flex-row-reverse">
            <div className="col-md-12 col-sm-12 mt-3 mt-lg-0 text-center">
              Copyright © {now.getFullYear()}{" "}
              <a href="#">Portfolio Instruments</a>. Designed by{" "}
              <a href="#">MicroFish</a>. All rights reserved.
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Footer;
