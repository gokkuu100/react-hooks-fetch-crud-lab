import React, { useEffect, useState } from "react";
import AdminNavBar from "./AdminNavBar";
import QuestionForm from "./QuestionForm";
import QuestionList from "./QuestionList";

function App() {
  const [page, setPage] = useState("List");
  const [questions, setQuestions] = useState([]);
  const [showQuestions, setShowQuestions] = useState(false);

  useEffect(() => {
    fetch("http://localhost:4000/questions")
      .then((resp) => resp.json())
      .then((data) => setQuestions(data));
  }, []);

  function handleAddQuestion(newQuestion) {
    fetch("http://localhost:4000/questions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newQuestion),
    })
      .then((resp) => resp.json())
      .then((data) => {
        setQuestions([...questions, data]); // Update questions state with the new question
      });
  }

  function handleDeleteQuestion(questionId) {
    fetch(`http://localhost:4000/questions/${questionId}`, {
      method: "DELETE",
    })
      .then(() => {
        setQuestions(questions.filter((q) => q.id !== questionId)); // Remove from state
      })
      .catch((error) => {
        console.error("Error deleting question:", error);
      });
  }

  function handleUpdateCorrectAnswer(questionId, newCorrectIndex) {
    fetch(`http://localhost:4000/questions/${questionId}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        correctIndex: newCorrectIndex,
      }),
    })
      .then(() => {
        const updatedQuestions = questions.map((q) =>
          q.id === questionId ? { ...q, correctIndex: newCorrectIndex } : q
        );
        setQuestions(updatedQuestions);
      })
      .catch((error) => {
        console.error("Error updating correct answer:", error);
      });
  }

  return (
    <div className="App">
      <button onClick={() => setShowQuestions(!showQuestions)}>
        {showQuestions ? "Hide Questions" : "View Questions"}
      </button>
      {showQuestions && (
        <QuestionList
          questions={questions}
          onDeleteQuestion={handleDeleteQuestion}
          onUpdateCorrectAnswer={handleUpdateCorrectAnswer} // Pass the function
        />
      )}
      <QuestionForm onAddQuestion={handleAddQuestion} />
    </div>
  );
}

export default App;
