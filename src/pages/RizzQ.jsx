import React from 'react';
import { useState, useEffect, useRef } from 'react';
import Question from '../components/Question';
import BellCurve from '../components/BellCurve';
import Timer from '../components/Timer';

function RizzQ({ onPass }) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [questionNumber, setQuestionNumber] = useState(1);
  const [answers, setAnswers] = useState([]);
  const [page, setPage] = useState('test');
  const [results, setResults] = useState([]);
  let timerRef;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:8080/questions');
        if (!response.ok) {
          setError('error');
          throw new Error('Network response was not ok');
        }
        const result = await response.json();
        setData(result);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    console.log(data);
  }, [data]);

  async function submitAnswer(index, newItem) {
    setAnswers((prevAnswers) => {
      console.log(newItem);
      const newAnswers = [...prevAnswers];

      if (index < newAnswers.length) {
        // Replace the item at the specified index.
        newAnswers[index] = newItem;
      } else {
        // Fill missing indices with blank objects.
        for (let i = newAnswers.length; i < index; i++) {
          newAnswers.push({});
        }
        // Insert newItem at the specified index.
        newAnswers.push(newItem);
      }

      return newAnswers;
    });
    if (questionNumber == data.length) {
      return;
    }
    setQuestionNumber((number) => number + 1);
  }
  async function submitEarly() {
    let response = await fetch('http://localhost:8080/answers', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ answers: answers }),
    });
    console.log(answers);
    setPage('inbetween');
    let json = await response.json();
    if (json.message == 'norming') {
      setPage('thanks');
      return;
    }
    setResults(json);
    setPage('results');
    return;
  }
  useEffect(() => {
    async function submit() {
      if (answers.length == data.length && questionNumber == data.length) {
        let response = await fetch('http://localhost:8080/answers', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ answers: answers }),
        });
        console.log(answers);
        setPage('inbetween');
        let json = await response.json();
        if (json.message == 'norming') {
          setPage('thanks');
          return;
        }
        setResults(json);
        setPage('results');
        return;
      }
    }
    submit();
  }, [answers]);

  // useEffect(() => {
  //   if (timerState) {
  //     console.log(timerState);
  //     timerState.startTimer();
  //   }
  // }, [timerState]);

  // useEffect(() => {
  //   async function getResults() {
  //     let response = await fetch('http://localhost:8080/calculaterizz', {
  //       method: 'POST',
  //       headers: { 'Content-Type': 'applcation/json' },
  //       body,
  //     });
  //   }
  //   if (page == 'inbetween') {
  //   }
  // }, [page]);

  function goBackQuestion() {
    if (questionNumber == 1) {
      return;
    }
    setQuestionNumber((number) => number - 1);
  }

  return (
    <div className='w-[20rem] h-[20rem] bg-white pt-8 rounded-md p-4'>
      {' '}
      {page == 'test' ? (
        <div className='text-black'>
          {loading && <p>Loading...</p>}
          {error && <p>Error: {error.message}</p>}
          {data.length > 0 ? (
            <>
              <Timer
                ref={(t) => {
                  if (t && !timerRef) {
                    t.startTimer();
                    timerRef = t;
                  }
                }}
                timeUp={() => {
                  submitEarly();
                  setPage('inbetween');
                }}
              />
              <Question
                key={questionNumber}
                number={questionNumber}
                question={data[questionNumber - 1].question}
                options={data[questionNumber - 1].options}
                submitAnswer={submitAnswer}
                propanswer={answers[questionNumber - 1]}
                goBackQuestion={goBackQuestion}
                final={questionNumber == data.length ? true : false}
                questionId={data[questionNumber - 1].id}
              />
            </>
          ) : (
            ''
          )}
        </div>
      ) : (
        <>
          {page == 'inbetween' ? (
            <></>
          ) : (
            <>
              {page == 'results' ? (
                <div className='text-black'>
                  <div className='grid place-items-center'>
                    Your RizzQ is
                    <span className='font-bold'> {results.rizzq}</span>
                  </div>
                  <BellCurve rizzq={results.rizzq} />
                  <div className='flex justify-end items-end w-full pb-3'>
                    <button
                      className='mr-3 rounded-md p-1 border-1 border-black'
                      onClick={() => {
                        onPass();
                      }}
                    >
                      Continue
                    </button>
                  </div>
                </div>
              ) : (
                <div className='text-black'>Thank You For Your Responses</div>
              )}
            </>
          )}
        </>
      )}
    </div>
  );
}

export default RizzQ;
