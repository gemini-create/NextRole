import Column from "./Column";
import { STATUSES } from "../data/status";

function Board({jobs, onView, onEdit, onDelete}) {

  return (
    <section className="board">
      {STATUSES.map((status) => {
        const filteredJobs = jobs.filter(
          (job) => job.status === status.key
        );

        return (
          <Column key={status.key} status={status} jobs={filteredJobs} onView={onView} onEdit={onEdit} onDelete={onDelete}/>
        );
      })}
    </section>
  );
}

export default Board;