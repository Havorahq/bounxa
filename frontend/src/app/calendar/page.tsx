//

import EventCard from "@/components/event/EventCard";
import Header from "@/components/Header";
import Nav from "@/components/Nav";
import React from "react";

function Calendar() {
  return (
    <main className="background-image-div">
      <Header />
      <Nav />
      <div className="flex flex-col gap-5 sm:mt-20 sm:gap-0">
        <EventCard />
        <EventCard />
      </div>
    </main>
  );
}

export default Calendar;
