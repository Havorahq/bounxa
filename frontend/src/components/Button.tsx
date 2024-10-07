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
      className={`${props.className} flex items-center justify-center rounded-[20px] bg-white px-6 py-2 font-medium text-black`}
    >
      {props.text}
    </button>
  );
}

export default Button;
