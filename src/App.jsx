import "./App.css";
import { Routes, Route, useNavigate } from "react-router-dom";

import Home from "./pages/Home/Home";
import MainLayout from "./Layout/MainLayout";
import { useEffect, useState } from "react";
// import { questions as web_dev_questions } from "./web_dev_questions.json";
// import { questions as tupitube } from "./victoria_junior_high_test_answers_indexed.json";
import {questions as coding_dev_questions} from "./VHS_dev_questions.json";
import {questions as Coding_for_ss2} from "./Coding_for_ss_two.json"
import {questions as coding_for_jss2} from "./jss2_coding_questions.json"
import {questions as coding_for_jss1} from "./jss1_coding_questions.json"
import {questions as coding_for_jss3} from "./jss3_coding_questions.json"
import {questions as coding_for_ss1} from "./ss1_coding_questions.json"
import Quiz from "./pages/Quiz/Quiz";
import ResultList from "./pages/ResultList/ResultList";
const App = () => {
  const questionsList = {
    // "Web development": web_dev_questions,
    // "Tupitube": tupitube,
    "coding for senior secondary": coding_dev_questions,
    "coding_for_senior_secondary_two": Coding_for_ss2,
    "coding_for_junior_secondary_two": coding_for_jss2,
    "coding_for_junior_secondary_one": coding_for_jss1,
    "coding_for_junior_secondary_three": coding_for_jss3,
    "coding_for_senior_secondary_one": coding_for_ss1,
  };
  const [currentStudent, setCurrentStudent] = useState(null);
  const navigate = useNavigate();

  const getStudent = (student) => {
    console.log(student);
    setCurrentStudent(student);
  };

  const onScoreSubmit = async (scoreObj) => {
    const existingResults = JSON.parse(localStorage.getItem("examResults")) || [];

    const updatedResults = [...existingResults, scoreObj];

    localStorage.setItem("examResults", JSON.stringify(updatedResults));

    // const res = await fetch("/api/students", {
    //   method: "POST",
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    //   body: JSON.stringify(scoreObj),
    // });
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
      <Route path="/results" element={<ResultList />} />
    </Routes>
  );
};

export default App;
