// import Image from "next/image";
//

"use client";
import EmptyState from "@/components/event/EmptyState";
import Header from "@/components/Header";
import Loader from "@/components/Loader";
import Nav from "@/components/Nav";
import { useEffect, useState } from "react";
import { getAllEvent } from "../api/helper-function";
import EventsCard2 from "@/components/event/EventsCard2";
import { EventType } from "@/utils/dataType";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<EventType[]>([]);
  const getAll = async () => {
    setLoading(true);
    const res = await getAllEvent();
    if (res.data) {
      setData(res.data.reverse());
    }
    setLoading(false);
  };

  useEffect(() => {
    getAll();
  }, []);
  return (
    <main className="background-image-div">
      <div className="flex flex-col items-start justify-start">
        <Header
        // auth={true}
        />
        <Nav />
        <div className="m-auto w-[95%] lg:w-[1000px]">
          <div className="events_con mt-10">
            {loading ? (
              <div className="flex w-full items-center justify-center">
                <Loader color={"white"} heignt={"100px"} />
              </div>
            ) : data.length === 0 ? (
              <EmptyState
                title={"No Upcoming Event"}
                subtitle={"You have no upcoming events. Why not host one?"}
                btnText={"Create Event"}
                onClick={() => router.push("/create-event")}
              />
            ) : (
              data.map(
                (obj: EventType, index: number) =>
                  obj.type === "public" && (
                    <EventsCard2 key={index} data={obj} />
                  ),
              )
            )}
            {/* <EventsCard2 /> */}
          </div>
        </div>
      </div>
    </main>
  );
}
