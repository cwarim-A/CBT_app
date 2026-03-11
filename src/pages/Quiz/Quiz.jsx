import { useState } from "react";
import Timer from "../../components/Timer/Timer";
import OptionBox from "../../components/OptionBox/OptionBox";
import ButtonA from "../../components/ButtonA/ButtonA";
import Modal from "../../components/Modal/Modal";
import classes from "./Quiz.module.css";
import { students as studentsList } from "../../students.json";

import { useNavigate } from "react-router-dom";

const Quiz = ({ student, questionsList, onScoreSubmit }) => {
  const time = 20 * 60;
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState("");
  const [answers, setAnswers] = useState([]);
  const [score, setScore] = useState(0);
  const [modalState, setModalState] = useState("off");
  const currentStudent = student;
  const navigate = useNavigate();

  // const questions = questionsList[currentStudent.subject];
  const questions = currentStudent ? questionsList[currentStudent.subject] : [];
  

  if (!questions || questions.length === 0) {
    return (
      <main className={classes.quiz}>
        <p>No questions found for subject: {currentStudent?.subject}</p>
      </main>
    );
  }

  const submitAnswers = () => {
    let userScore = 0;
    answers.forEach(({ questionIndex, selectedOption }) => {
      if (
        selectedOption === `option${questions[questionIndex]["answer-index"]}`
      ) {
        userScore++;
      }
    });
    setScore(userScore);
    setModalState("on");
    navigate("/results")
  };

  const getGrade = (score) => {
    const percent = (value) => (value / 100) * questions.length;
    if (score >= percent(90)) {
      return "A1";
    } else if (score >= percent(80)) {
      return "B2";
    } else if (score >= percent(70)) {
      return "B3";
    } else if (score >= percent(65)) {
      return "C4";
    } else if (score >= percent(60)) {
      return "C5";
    } else if (score >= percent(55)) {
      return "C6";
    } else if (score >= percent(50)) {
      return "D7";
    } else if (score >= percent(40)) {
      return "E8";
    } else {
      return "F9";
    }
  };

  const confirmSubmit = () => {
    const scoreObj = {
      id: studentsList.length + 1,
      name: student.name,
      className: student.class,
      subject: student.subject,
      score: score,
      average: `${(score / questions.length) * 100}%`,
      grade: getGrade(score),
    };
    onScoreSubmit(scoreObj);
    alert("Exam submitted successfully!");
    navigate("/");
  };

  const handleOptionChange = (e) => {
    setSelectedOption(e.target.value);
    setAnswers((prevAnswers) => {
      const newAnswers = prevAnswers.filter(
        (obj) => obj.questionIndex !== currentQuestionIndex
      );
      return [
        ...newAnswers,
        { questionIndex: currentQuestionIndex, selectedOption: e.target.value },
      ];
    });
  };

  const resetOptions = () => {
    setSelectedOption("");
  };

  const showAnsweredQuestion = (index) => {
    if (answers.find((obj) => obj.questionIndex === index)) {
      setSelectedOption(
        answers.find((obj) => obj.questionIndex === index).selectedOption
      );
    } else {
      setSelectedOption("");
    }
  };

  const setQuestion = (index) => {
    resetOptions();
    setCurrentQuestionIndex(index);
    showAnsweredQuestion(index);
  };
  return (
    <main className={classes.container}>
      <aside>
        <Modal
          identifier="submit"
          currentState={modalState}
          message="Are you sure you want to submit?"
          submitBtnText="Yes I am"
          submitBtnFunc={confirmSubmit}
        />
      </aside>
      <section>
        <h2>Timer:</h2>
        <Timer time={time} active={true} run={submitAnswers} />
      </section>
      <section>
        <p className={classes.question}>
          {questions[currentQuestionIndex]?.id}.{"  "}
          {questions[currentQuestionIndex]?.question}
        </p>
        <ul>
          {questions[currentQuestionIndex]?.options.map((option, index) => (
            <li key={index}>
              <OptionBox
                text={option}
                value={`option${index}`}
                name="option"
                checked={selectedOption === `option${index}`}
                onChange={(e) => handleOptionChange(e)}
              />
            </li>
          ))}
        </ul>
        <div className={classes.navigate}>
          <ButtonA
            onClick={() => {
              currentQuestionIndex > 0
                ? setQuestion(currentQuestionIndex - 1)
                : setQuestion(0);
            }}
          >
            previous
          </ButtonA>
          <ButtonA
            onClick={() => {
              currentQuestionIndex < questions.length - 1
                ? setQuestion(currentQuestionIndex + 1)
                : setQuestion(questions.length - 1);
            }}
          >
            next
          </ButtonA>
        </div>
      </section>
      <section>
        <p className={classes.status}>
          {answers.length} out of {questions.length} questions answered
        </p>
        <div>
          {/* <div className={classes["question-buttons"]}>
            {questions.map((question) => (
              <ButtonA
                key={question.id}
                onClick={() => setQuestion(question.id - 1)}
                style={
                  currentQuestionIndex === question.id - 1
                    ? "current"
                    : answers.includes(
                        answers.find(
                          (obj) => obj.questionIndex === question.id - 1
                        )
                      )
                    ? "answered"
                    : ""
                }
              >
                {question.id}
              </ButtonA>
            ))}
          </div> */}
          <div className={classes["question-buttons"]}>
            {questions.map((question) => (
              <ButtonA
                key={question.id}
                onClick={() => setQuestion(question.id - 1)}
                style={
                  currentQuestionIndex === question.id - 1
                    ? "current"
                    : answers.some(
                      (obj) => obj.questionIndex === question.id - 1
                    )
                      ? "answered"
                      : ""
                }
              >
                {question.id}
              </ButtonA>
            ))}
          </div>
        </div>
        <ButtonA onClick={() => submitAnswers()}>Submit</ButtonA>
      </section>
    </main>
  );
};

export default Quiz;
