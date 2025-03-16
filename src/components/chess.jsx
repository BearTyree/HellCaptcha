import React, { useState, useRef } from "react";

export const ChessPuzzle = ({ onPass }) => {
  // Empty array for images - you'll add SVG sources manually
  const defaultImages = Array(64).fill("");
  // could this be better? yes, Do I want to add multiple chess puzles, their best moves and FEN? hell no
  //janks as fuck, but we ball
  defaultImages[0] = "/chess/bR.svg"
  defaultImages[4] = "/chess/bR.svg"
  defaultImages[5] = "/chess/bK.svg"
  defaultImages[6] = "/chess/bN.svg"
  defaultImages[7] = "/chess/wQ.svg"
  defaultImages[9] = "/chess/bP.svg"
  defaultImages[11] = "/chess/wR.svg"
  defaultImages[13] = "/chess/bP.svg"
  defaultImages[14] = "/chess/bB.svg"
  defaultImages[16] = "/chess/bP.svg"
  defaultImages[20] = "/chess/bP.svg"
  defaultImages[21] = "/chess/bQ.svg"
  defaultImages[22] = "/chess/wB.svg"
  defaultImages[23] = "/chess/wB.svg"
  defaultImages[26] = "/chess/bP.svg"
  defaultImages[46] = "/chess/wP.svg"
  defaultImages[48] = "/chess/wP.svg"
  defaultImages[49] = "/chess/wP.svg"
  defaultImages[50] = "/chess/wP.svg"
  defaultImages[53] = "/chess/wP.svg"
  defaultImages[55] = "/chess/wP.svg"
  defaultImages[60] = "/chess/wR.svg"
  defaultImages[62] = "/chess/wK.svg"


  const [selectedSquares, setSelectedSquares] = useState(new Set());
  const [moveInput, setMoveInput] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const inputRef = useRef(null);

  // Chess board setup
  const files = ["a", "b", "c", "d", "e", "f", "g", "h"];
  const ranks = [8, 7, 6, 5, 4, 3, 2, 1];

  const toggleSquareSelection = (index) => {
    const newSelectedSquares = new Set(selectedSquares);
    if (newSelectedSquares.has(index)) {
      newSelectedSquares.delete(index);
    } else {
      newSelectedSquares.add(index);
    }
    setSelectedSquares(newSelectedSquares);
  };

  const handleVerify = () => {
    if (moveInput === "h8g7") {
      setErrorMessage("");
      if (onPass) {
        onPass(true);
      }
    } else {
      setErrorMessage("Try Again");
    }
  };

  const refreshChallenge = () => {
    setSelectedSquares(new Set());
    setMoveInput("");
    setErrorMessage("");
  };

  return (
    <div className="w-[40.313rem] bg-white rounded-md overflow-hidden pt-8 p-4 ">
      {/* Header */}
      <div className="bg-[#1A73E8] text-white px-4 py-3">
        <p className="text-lg font-bold leading-tight mb-1">
        Think over what is the best move
        </p>
        <p className="text-xs">
          Once done, enter in Long Algebraic Notation e.g. e2e4
        </p>
      </div>

      {/* Chess Grid */}
      <div className="grid grid-cols-8 bg-white">
        {Array(64).fill().map((_, index) => {
          const row = Math.floor(index / 8);
          const col = index % 8;
          const isLightSquare = (row + col) % 2 === 0;

          return (
            <div
              key={index}
              onClick={() => toggleSquareSelection(index)}
              className={`relative cursor-pointer overflow-hidden 
                ${isLightSquare ? "bg-[#F0D9B5]" : "bg-[#B58863]"}
                w-[80px] aspect-square flex items-center justify-center
              `}
            >
              {defaultImages[index] && (
                <img
                  src={defaultImages[index]}
                  alt=""
                  className="w-full h-full object-contain"
                />
              )}
            </div>
          );
        })}
      </div>

      {/* Footer */}
      <div className="flex items-center justify-between p-2 bg-[#F9F9F9] border-t border-gray-300">
        <button
          onClick={refreshChallenge}
          className="text-gray-600 hover:text-gray-800"
          title="Get a new challenge"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
            />
          </svg>
        </button>
        <div className="flex items-center space-x-2">
          <input
            type="text"
            ref={inputRef}
            placeholder="Enter move"
            value={moveInput}
            onChange={(e) => setMoveInput(e.target.value)}
            className="px-2 py-1 border border-gray-300 rounded"
          />
          <button
            onClick={handleVerify}
            className="px-4 py-2 rounded-sm font-bold bg-[#1A73E8] text-white hover:bg-[#4285F4]"
          >
            VERIFY
          </button>
        </div>
      </div>
      {errorMessage && (
        <div className="text-red-500 text-center py-2">
          {errorMessage}
        </div>
      )}
    </div>
  );
};
