//

import React, { ReactNode } from "react";

type ButtonType = {
  text: ReactNode;
  onClick?: () => void;
  className?: string;
};

function Button(props: ButtonType) {
  return (
    <button
      onClick={props.onClick}
      className={`${props.className} bg-white text-black py-2 font-medium px-6 rounded-[20px] flex items-center justify-center`}
    >
      {props.text}
    </button>
  );
}

export default Button;
