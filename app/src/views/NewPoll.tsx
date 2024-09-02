import { useState } from "react";

export default function NewPoll() {
  const [options, setOptions] = useState(["", ""]);

  const handleOptionInput = (index: number, newValue: string) => {
    const updatedItems = [...options];
    updatedItems[index] = newValue;
    setOptions(updatedItems);
  };

  return (
    <div className="flex flex-col">
      <h2 className="text-white text-sm font-bold mb-8">Create a Poll</h2>

      <input
        placeholder="Give your Poll a name..."
        className="placeholder-[#ffffff66] p-2 font-bold mb-12 bg-transparent text-lg placeholder-italic rounded-none border-b border-b-[#fff1]"
        type="text"
      />

      <textarea
        className="placeholder-[#f8f8f80D] min-h-24 p-2 font-bold mb-12 bg-transparent text-sm placeholder-italic rounded border border-[#fff1]"
        placeholder="Description"
      />

      <ul className="flex gap-4 mb-4 flex-col">
        {options.map((optionText, i) => (
          <li>
            <div className="px-5 py-3 bg-[#f8f8f80D] flex items-center gap-4 rounded-lg">
              <span className="italic font-bold text-[#D323FF]">{i + 1}.</span>
              <input
                type="text"
                className="placeholder-[#f8f8f80D] flex-1 font-bold bg-transparent placeholder-italic"
                value={optionText}
                onChange={(e) => handleOptionInput(i, e.target.value)}
              />
              <button
                onClick={() =>
                  setOptions(
                    options.filter((_, deleteIndex) => i !== deleteIndex)
                  )
                }
                className="p-2"
              >
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 16 16"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M2.14602 2.85402C2.09953 2.80753 2.06266 2.75234 2.0375 2.6916C2.01234 2.63087 1.99939 2.56577 1.99939 2.50002C1.99939 2.43428 2.01234 2.36918 2.0375 2.30844C2.06266 2.2477 2.09953 2.19251 2.14602 2.14602C2.19251 2.09953 2.2477 2.06266 2.30844 2.0375C2.36918 2.01234 2.43428 1.99939 2.50002 1.99939C2.56577 1.99939 2.63087 2.01234 2.6916 2.0375C2.75234 2.06266 2.80753 2.09953 2.85402 2.14602L8.00002 7.29302L13.146 2.14602C13.1925 2.09953 13.2477 2.06266 13.3084 2.0375C13.3692 2.01234 13.4343 1.99939 13.5 1.99939C13.5658 1.99939 13.6309 2.01234 13.6916 2.0375C13.7523 2.06266 13.8075 2.09953 13.854 2.14602C13.9005 2.19251 13.9374 2.2477 13.9625 2.30844C13.9877 2.36918 14.0007 2.43428 14.0007 2.50002C14.0007 2.56577 13.9877 2.63087 13.9625 2.6916C13.9374 2.75234 13.9005 2.80753 13.854 2.85402L8.70702 8.00002L13.854 13.146C13.9005 13.1925 13.9374 13.2477 13.9625 13.3084C13.9877 13.3692 14.0007 13.4343 14.0007 13.5C14.0007 13.5658 13.9877 13.6309 13.9625 13.6916C13.9374 13.7523 13.9005 13.8075 13.854 13.854C13.8075 13.9005 13.7523 13.9374 13.6916 13.9625C13.6309 13.9877 13.5658 14.0007 13.5 14.0007C13.4343 14.0007 13.3692 13.9877 13.3084 13.9625C13.2477 13.9374 13.1925 13.9005 13.146 13.854L8.00002 8.70702L2.85402 13.854C2.80753 13.9005 2.75234 13.9374 2.6916 13.9625C2.63087 13.9877 2.56577 14.0007 2.50002 14.0007C2.43428 14.0007 2.36918 13.9877 2.30844 13.9625C2.2477 13.9374 2.19251 13.9005 2.14602 13.854C2.09953 13.8075 2.06266 13.7523 2.0375 13.6916C2.01234 13.6309 1.99939 13.5658 1.99939 13.5C1.99939 13.4343 2.01234 13.3692 2.0375 13.3084C2.06266 13.2477 2.09953 13.1925 2.14602 13.146L7.29302 8.00002L2.14602 2.85402Z"
                    fill="#D323FF"
                  />
                </svg>
              </button>
            </div>
          </li>
        ))}

        <li>
          <button
            onClick={() => setOptions([...options, ""])}
            className="p-4 mt-4 bg-[#f8f8f80D] text-xs w-full items-center gap-4 rounded-lg"
          >
            Add Option
          </button>
        </li>
      </ul>

      <button className="p-4 bg-[#D323FF] text-white font-bold text-xs w-full items-center gap-4 rounded-lg">
        Create Poll
      </button>
    </div>
  );
}
