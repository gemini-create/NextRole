import JobCard from "../components/JobCard";

function Column({status,jobs,onView,onEdit, onDelete}){
    return(
        <div className="column" style={{ backgroundColor: status.background }}>
            <div className="columnHeader">
                <div className="columnTitle">
                     <span className="statusDot"style={{ backgroundColor: status.color }}></span>
                     <h3>{status.key}</h3>
                </div>
                
                <span style={{ color: status.color }}>{jobs.length}</span>
            </div>

            <div className="jobList">
            {jobs.length === 0 ? (
                <div className="emptyCard">Nothing here yet.</div>
            ) : (
                jobs.map((job) => (
                <JobCard key={job.id} job={job}  onView={onView} onEdit={onEdit} onDelete={onDelete}></JobCard>
                ))
            )
            }</div>
        </div>
    );
}
export default Column;