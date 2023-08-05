import React, { useEffect, useState } from "react";

function QuestionList({ questions, onDeleteQuestion }) {
  return (
    <section>
      <h1>Quiz Questions</h1>
      <ul>
        {questions.map((question) => (
          <li key={question.id}>
            <h3>{question.prompt}</h3>
            <button onClick={() => onDeleteQuestion(question.id)}>
              Delete
            </button>
          </li>
        ))}
      </ul>
    </section>
  );
}

export default QuestionList;
