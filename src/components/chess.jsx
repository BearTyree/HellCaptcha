import React, { useRef, useState } from "react";

//h8 g7
export const ChessPuzzle = ({ onPass }) => {
  const inputRef = useRef(null);
  const [isCorrect, setIsCorrect] = useState(null);

  const correctMove = "h8g7";

  const checkMove = (event) => {
    event.preventDefault();
    const move = inputRef.current.value.trim();
    if (move === correctMove) {
      setIsCorrect(true);
      setTimeout(() => {
        if (onPass) onPass(true);
      }, 1000);
    } else {
      setIsCorrect(false);
    }
  };

  return (
    <div className="flex flex-col justify-center items-center w-[96rem] min-h-[48rem]">
      <div
        className="flex items-center justify-center"
        style={{ width: "auto", height: "auto" }}
      >
        <img src="../../public/puzzle.png" />

        <form onSubmit={checkMove}>
          <input
            type="text"
            placeholder="Enter your move"
            className="border rounded p-2 m-2"
            ref={inputRef}
          />
          <button type="submit" className="bg-blue-500 text-white p-2 rounded">
            Submit
          </button>
        </form>
        {isCorrect !== null && (
          <div
            className={`indicator ${
              isCorrect ? "text-green-500" : "text-red-500"
            }`}
          >
            {isCorrect ? "Correct!" : "Not the best move!"}
          </div>
        )}
      </div>
    </div>
  );
};
