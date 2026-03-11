import {  useState } from "react";
import DataTable from "../../components/DataTable/DataTable";
import classes from "./ResultList.module.css";

const ResultList = () => {
  // const [data, setData] = useState([]);
  const results = JSON.parse(localStorage.getItem("examResults")) || [];
    
  // useEffect(() => {
  //   const getResult = async () => {
  //     try {
  //       const res = await fetch("/api/students");
  //       const data = await res.json();
  //       setData(data);
  //     } catch (error) {
  //       console.error("This error occured:", error);
  //     }
  //   };
  //   getResult();
  // }, [data]);
  return (
    <>
      <header className={classes.head}>
        <h1>Results</h1>
      </header>
      <main className={classes.tableContainer}>
        <DataTable data={results} />
      </main>
    </>
  );
};

export default ResultList;
