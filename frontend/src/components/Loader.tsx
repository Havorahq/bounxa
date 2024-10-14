/* eslint-disable @typescript-eslint/no-explicit-any */
//

const Loader = ({ height, color }: any) => {
  return (
    <div className="flex items-center justify-center">
      <div
        className={`animate-spin rounded-full border-4 ${
          color === "white"
            ? `border-r-white border-t-white`
            : "border-r-black border-t-black"
        } border-transparent ${height ? `h-${height} w-${height}` : "h-6 w-6"}`}
      ></div>
    </div>
  );
};

export default Loader;
