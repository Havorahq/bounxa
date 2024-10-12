//

import React, { ReactNode } from "react";
import Loader from "./Loader";

type ButtonType = {
  text: ReactNode;
  onClick?: () => void;
  className?: string;
  loading?: boolean;
  disabled?: boolean;
};

function Button({ loading = false, disabled = false, ...props }: ButtonType) {
  return (
    <button
      disabled={disabled}
      onClick={props.onClick}
      className={`${props.className} flex items-center justify-center rounded-[20px] bg-white px-6 py-2 font-medium text-black`}
    >
      {loading ? <Loader /> : props.text}
    </button>
  );
}

export default Button;
