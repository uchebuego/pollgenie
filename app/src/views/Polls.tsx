import { Link } from "react-router-dom";

export default function Polls() {
  return (
    <div className="flex flex-col">
      <div className="flex items-center justify-between mb-12">
        <h2 className="text-white text-2xl font-bold">Your Polls</h2>

        <Link
          to="/new"
          className="p-3 bg-[#D323FF] text-white font-bold text-xs items-center gap-4 rounded-lg"
        >
          Create Poll
        </Link>
      </div>

      <ul className="gap-4 flex flex-col">
        {[0, 0, 0].map((_, i) => (
          <li key={i}>
            <div className="p-5 bg-[#f8f8f80D] rounded-lg hover:scale-105 transition-all duration-300 ease-in-out delay-75">
              <h3 className="font-bold text-lg mb-4">
                2024 Presidential Election
              </h3>

              <p className="text-xs font-light mb-8 pr-8">
                Tinubu or Peter Obi? Choose the next president of Nigeria!
              </p>

              <ul className="flex gap-4 flex-col sm:flex-row flex-wrap">
                {[0, 0, 0].map((_, itemI) => (
                  <li key={itemI}>
                    <div className="rounded-md p-2 flex items-center gap-3 bg-[#0002]">
                      <span className="text-[#D323FF] font-bold">
                        {itemI + 1}.
                      </span>
                      <span className="text-sm">Peter Obi</span>

                      <div className="text-xs ml-auto text-[#f8f8f8] text-opacity-40 text-right">
                        <p>{Number(1387563).toLocaleString()} (10%)</p>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </li>
        ))}
      </ul>

      {/* <button className="p-4 bg-[#D323FF] text-white font-bold text-xs w-full items-center gap-4 rounded-lg">
        Create Poll
      </button> */}
    </div>
  );
}
