import { STATUSES } from "../data/status";

function Stats({ jobs }) {
  const totalApplications = jobs.length;

  return (
    <section className="stats">
      <div className="total">
        <h2>{totalApplications}</h2>
        <span>Total Applications</span>
      </div>

      <div className="statsList">
        {STATUSES.map((status) => {

          const count = jobs.filter((job) => job.status === status.key).length;

          return (
            <div key={status.key} className="statusItem">
              <span className="statusDot"
              style={{
                  backgroundColor: status.color,
                }}
              />
              <span>{count} {status.label}</span>
            </div>
          );
        })}
      </div>
    </section>
  );
}

export default Stats;