import { useState } from "react";

import { AiOutlineDown } from "react-icons/ai";

type ShowFaqProps = {
  text: string;
  header: string;
};

const ShowFaq = ({ header, text }: ShowFaqProps) => {
  const [active, setActive] = useState(false);

  const handleToggle = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setActive(!active);
  };

  return (
    <>
      <div className="single-faq mb-4 w-full rounded-lg border bg-white p-4 sm:p-8 lg:px-6 xl:px-8">
        <button
          className={`faq-btn flex w-full text-left`}
          onClick={handleToggle}
        >
          <div className="mr-5 flex h-10 w-full max-w-[40px] items-center justify-center rounded-lg bg-primary bg-opacity-5 text-primary">
            <AiOutlineDown
              className={`duration-200 ease-in-out fill-primary stroke-primary ${
                active ? "rotate-180" : ""
              }`}
            />
          </div>

          <div className="w-full">
            <h4 className="text-lg font-semibold text-black mt-1">{header}</h4>
          </div>
        </button>

        <div
          className={`pl-[62px] duration-200 ease-in-out ${
            active ? "block" : "hidden"
          }`}
        >
          <p className="py-3 text-base leading-relaxed text-body-color">
            {text}
          </p>
        </div>
      </div>
    </>
  );
};

export default ShowFaq;
