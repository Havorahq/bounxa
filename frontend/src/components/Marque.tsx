"use client";

const Marquee = ({ children }:{children: unknown}) => {
  return (
    <div className="relative flex overflow-x-hidden">
      {/* First scroll container */}
      <div className="animate-marquee whitespace-nowrap py-3 pr-8">
        {Array(2)
          .fill(children)
          .map((content, i) => (
            <span key={i} className="mx-4">
              {content}
            </span>
          ))}
      </div>

      {/* Second scroll container for seamless loop */}
      <div className="animate-marquee2 absolute top-0 whitespace-nowrap py-3 pr-8">
        {Array(2)
          .fill(children)
          .map((content, i) => (
            <span key={i} className="mx-4">
              {content}
            </span>
          ))}
      </div>
    </div>
  );
};

export default Marquee;
