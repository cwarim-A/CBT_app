import classes from "./DataTable.module.css";

const DataTable = ({ data }) => {
  return (
    <table className={classes.table}>
      <thead>
        <tr>
          <th>
            <div className={classes.header}>s/n</div>
          </th>
          <th>
            <div className={classes.header}>class</div>
          </th>
          <th>
            <div className={classes.header}>name</div>
          </th>
          <th>
            <div className={classes.header}>subject</div>
          </th>
          <th>
            <div className={classes.header}>score</div>
          </th>
          <th>
            <div className={classes.header}>average</div>
          </th>
          <th>
            <div className={classes.header}>grade</div>
          </th>
        </tr>
      </thead>
      <tbody>
        {data.map(({ id, name, className, subject, score, average, grade },index) => (
          <tr key={id}>
            <td>
              <div className={classes.column}>{index + 1}</div>
            </td>
            <td>
              <div className={classes.column}>{className}</div>
            </td>
            <td>
              <div className={`${classes.column} ${classes.name}`}>{name}</div>
            </td>
            <td>
              <div className={classes.column}>{subject}</div>
            </td>
            <td>
              <div className={classes.column}>{score}</div>
            </td>
            <td>
              <div className={classes.column}>{average}</div>
            </td>
            <td>
              <div className={classes.column}>{grade}</div>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default DataTable;
