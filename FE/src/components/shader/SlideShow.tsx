import React from "react";

const SlideShow = () => {
  return (
    <div className="grid grid-flow-col grid-rows-2 grid-cols-3 gap-8">
      <div>
        <img src="/mountains-1.jpg" alt="" loading="lazy" />
      </div>
      <div className="col-start-3">
        <img src="/mountains-2.jpg" alt="" loading="lazy" />
      </div>
      <div>
        <img src="/mountains-3.jpg" alt="" loading="lazy" />
      </div>
      <div>
        <img src="/mountains-4.jpg" alt="" loading="lazy" />
      </div>
      <div className="row-start-1 col-start-2 col-span-2">
        <img src="/mountains-5.jpg" alt="" loading="lazy" />
      </div>
    </div>
  );
};

export default SlideShow;
