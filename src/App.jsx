import "./App.css";
import { Routes, Route, useNavigate } from "react-router-dom";

import Home from "./pages/Home/Home";
import MainLayout from "./Layout/MainLayout";
import { useEffect, useState } from "react";
import { questions as web_dev_questions } from "./web_dev_questions.json";
import { questions as tupitube } from "./victoria_junior_high_test_answers_indexed.json";
import Quiz from "./pages/Quiz/Quiz";
import ResultList from "./pages/ResultList/ResultList";
const App = () => {
  const questionsList = {
    "Web development": web_dev_questions,
    tupitube: tupitube,
  };
  const [currentStudent, setCurrentStudent] = useState(null);
  const navigate = useNavigate();

  const getStudent = (student) => {
    console.log(student);
    setCurrentStudent(student);
  };

  const onScoreSubmit = async (scoreObj) => {
    const res = await fetch("/api/students", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(scoreObj),
    });
    setCurrentStudent(null);
    return;
  };

  useEffect(() => {
    if (currentStudent !== null) {
      navigate("/quiz");
    }
  }, [currentStudent, navigate]);

  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route index element={<Home getStudent={getStudent} />} />
        <Route
          path="/quiz"
          element={
            <Quiz
              student={currentStudent}
              questionsList={questionsList}
              onScoreSubmit={onScoreSubmit}
            />
          }
        />
      </Route>
      <Route path="/results-vhs-120s2" element={<ResultList />} />
    </Routes>
  );
};

export default App;
