import React from "react";
import { Slide } from "react-slideshow-image";
import "react-slideshow-image/dist/styles.css";
import styles from "./slide.module.css";

const Example = () => {
  const images = [
    "https://images.pexels.com/photos/13948274/pexels-photo-13948274.jpeg?auto=compress&cs=tinysrgb&w=800",
    "https://sachsuthattphcm.com.vn/wp-content/uploads/2019/07/Banner-sach-moi-xuat-ban-thang-7.bmp",
    "https://thaihabooks.com/wp-content/uploads/2020/11/Banner-T11-FB-scaled.jpg",
  ];

  return (
    <div className="max-w-7xl grid grid-cols-1 gap-5 mx-auto md:grid md:grid-cols-[920px,340px]">
      <div>
        <Slide>
          <div className={styles.eachslideeffect}>
            <div style={{ backgroundImage: `url(${images[0]})` }}></div>
          </div>
          <div className={styles.eachslideeffect}>
            <div style={{ backgroundImage: `url(${images[1]})` }}></div>
          </div>
          <div className={styles.eachslideeffect}>
            <div style={{ backgroundImage: `url(${images[2]})` }}></div>
          </div>
        </Slide>
      </div>

      <div className="gap-[10px] flex flex-col">
        <div>
          <img
            src="https://newshop.vn/public/uploads/landing-page/sach-hay-newshop/banner-mobile.png"
            alt=""
            className="w-full h-[170px] rounded-xl"
          />
        </div>

        <div>
          <img
            src="https://www.khaitam.com/Data/Sites/1/News/53/khaitam-banner-chiasesachhay-1200x628-2.png"
            alt=""
            className="w-full h-[170px]  rounded-xl"
          />
        </div>
      </div>
    </div>
  );
};

export default Example;
