import React from "react";

type Props = {
  name: string;
  icon: React.ReactNode;
};

const Button = ({ name, icon }: Props) => {
  return (
    <button className="">
      {icon}

      {name}
    </button>
  );
};

export default Button;
