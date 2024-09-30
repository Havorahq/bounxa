//

import { HouseSimple, CalendarBlank, Compass } from "@phosphor-icons/react";
import Link from "next/link";
import React from "react";
import { usePathname } from "next/navigation";
import { twMerge } from "tailwind-merge";

function Nav() {
  const pathName = usePathname();
  const active = twMerge(
    "border-[#E0E0E0] border-2 rounded-full bg-[#e0e0e065] text-black"
  );
  const notActive = twMerge("text-[#7D7D7D]");
  return (
    <nav className="w-[48px] flex flex-col items-center gap-2 py-1 bg-[#FAFAFA] rounded-[48px] border-2 border-[#E0E0E0] fixed left-4 top-1/2 -translate-y-1/2">
      <Link
        href={""}
        className={`${pathName === "/" ? active : notActive}  p-2`}
      >
        <HouseSimple size={20} />
      </Link>
      <Link
        href={""}
        className={`${pathName === "/c" ? active : notActive}  p-2`}
      >
        <CalendarBlank size={20} />
      </Link>
      <Link
        href={""}
        className={`${pathName === "/c" ? active : notActive}  p-2`}
      >
        <Compass size={20} />
      </Link>
    </nav>
  );
}

export default Nav;
