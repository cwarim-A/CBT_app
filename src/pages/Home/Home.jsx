import { useState } from "react";
import classes from "./Home.module.css";

const Home = ({ getStudent }) => {
  const [studentName, setStudentName] = useState("");
  const [studentClass, setStudentClass] = useState("JSS1 - JSS3");
  const [subject, setSubject] = useState("Web development");

  const startQuiz = (e) => {
    e.preventDefault();
    const student = {
      name: studentName,
      class: studentClass,
      subject: subject,
    };
    getStudent(student);
  };

  return (
    <>
      <main className={classes.container}>
        <h2>fill in your necessary credentials and begin the exam</h2>
        <form onSubmit={startQuiz}>
          <label htmlFor="name">
            <span>Name:</span>
            <input
              type="text"
              placeholder="e.g. Surname, FirstName LastName"
              value={studentName}
              id="name"
              onChange={(e) => setStudentName(e.target.value)}
              required
            />
          </label>
          <label htmlFor="name">
            <span>Class:</span>
            <select
              value={studentClass}
              id="name"
              onChange={(e) => setStudentClass(e.target.value)}
            >
              <option value="JSS1 - JSS2">JSS1 - JSS2</option>
              <option value="JSS3 - SS1">JSS3 - SS1</option>
              <option value="SS1 - SS3">SS3</option>
            </select>
          </label>
          <label htmlFor="subject">
            <span>Subject:</span>
            <select
              value={subject}
              id="subject"
              onChange={(e) => setSubject(e.target.value)}
            >
              <option value="Web development">Web development</option>
              <option value="tupitube">Python</option>
              <option value="Scratch">Coding Foundation</option>
              <option value="coding for senior secondary">Coding for Senior Secondary</option>
              <option value="Code.org">Code.org</option>
            </select>
          </label>
          <button type="submit">Start Exam</button>
        </form>
      </main>
    </>
  );
};

export default Home;
