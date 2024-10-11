//

import React from "react";

function Header({ auth = false }: { auth?: boolean }) {
  return (
    <header className="m-auto flex w-[90%] justify-between py-8 tablet:w-[800px]">
      <h1 className="text-2xl font-medium sm:text-3xl">Events</h1>
      {auth ? (
        <div className="flex items-center gap-4">
          <div className="font-medium sm:text-xl">John Paul</div>
          <div className="h-[40px] w-[40px] rounded-full bg-white font-medium sm:h-[50px] sm:w-[50px]"></div>
        </div>
      ) : (
        <div className="flex items-center gap-6">
          <div className="rounded-[36px] bg-white px-3 py-2 font-medium text-black">
            Upcoming
          </div>
          <div className="font-medium">Past</div>
        </div>
      )}
    </header>
  );
}

export default Header;
