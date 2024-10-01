//

import EventCard from "@/components/EventCard";
import Header from "@/components/Header";
import Nav from "@/components/Nav";
import React from "react";

function Calendar() {
  return (
    <main className="background-image-div">
      <Header />
      <Nav />
      <div className="mt-20">
        <EventCard />
        <EventCard />
      </div>
    </main>
  );
}

export default Calendar;
