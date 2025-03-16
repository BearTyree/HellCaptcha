import React, { useEffect, useState } from 'react';

function Question({
  number,
  question,
  options,
  submitAnswer,
  propanswer,
  goBackQuestion,
  final,
  questionId,
}) {
  const [answer, setAnswer] = useState(propanswer);
  useEffect(() => {
    console.log(
      'answer: ' + answer + ' propanswer:' + JSON.stringify(propanswer)
    );
  });

  return (
    <>
      <div className='flex row'>
        {number + '.'}&emsp;&emsp;
        <div>
          {question.split('\n').map((line, index) => (
            <span key={index + 30}>
              {line}
              <br />
            </span>
          ))}
        </div>
      </div>
      <br />
      <div className='flex'>
        <div>&ensp;&emsp;&emsp;&emsp;</div>
        <ol className='list-[upper-alpha]' type='A'>
          {options.map((option, index) =>
            answer == index ? (
              <>
                <li
                  key={index}
                  onClick={() => {
                    setAnswer(null);
                  }}
                >
                  <div className='rounded-full border-black border-2 h-6 w-6 absolute -translate-x-6 translate-y-0.5'></div>
                  &ensp;{option}
                </li>
              </>
            ) : (
              <li
                className='cursor-pointer group'
                key={index}
                onClick={() => {
                  setAnswer(index);
                }}
              >
                <div className='rounded-full border-gray-400 group-hover:border-1 h-6 w-6 absolute -translate-x-6 translate-y-0.5'></div>
                &ensp;{option}
              </li>
            )
          )}
        </ol>
      </div>
      <br />
      <div className='flex justify-between'>
        <button
          onClick={() => {
            goBackQuestion();
          }}
          className='px-4 py-2 rounded-sm font-bold bg-[#4A90E2] text-white hover:bg-[#3A80D2]'
        >
          Back
        </button>

        <button
          onClick={() => {
            submitAnswer(number - 1, { id: questionId, answer });
          }}
          className='px-4 py-2 rounded-sm font-bold bg-[#4A90E2] text-white hover:bg-[#3A80D2]'
        >
          {final == true ? 'Submit' : 'Next'}
        </button>
      </div>
    </>
  );
}

export default Question;
