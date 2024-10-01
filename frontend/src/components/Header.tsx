//

import React from "react";

function Header({ auth = false }: { auth?: boolean }) {
  return (
    <header className="w-[874px] m-auto flex justify-between py-8">
      <h1 className="font-medium text-[32px]">Events</h1>
      {auth ? (
        <div className="flex items-center gap-6">
          <div className="text-xl font-medium">John Paul</div>
          <div className="font-medium h-[50px] w-[50px] bg-white rounded-full"></div>
        </div>
      ) : (
        <div className="flex items-center gap-6">
          <div className="bg-white text-black font-medium py-2 px-3 rounded-[36px]">
            Upcoming
          </div>
          <div className="font-medium">Past</div>
        </div>
      )}
    </header>
  );
}

export default Header;
