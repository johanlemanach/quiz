import React from 'react';

export default function Question({ question, options, onAnswer }) {
  return (
    <div className="question-container">
      <h2>{question}</h2>
      <div className="button-container">
        {options.map(function (option) {
          return (
            <button
              key={option}
              onClick={function () {
                onAnswer(option);
              }}
              className="question-button"
            >
              {option}
            </button>
          );
        })}
      </div>
    </div>
  );
}
