import { useIssues } from "../issueQueries";

export const IssueStats = () => {
  const { data } = useIssues(1); // first page only for demo

  const issues = data?.data || [];

  const open = issues.filter((i) => i.status === "open").length;
  const inProgress = issues.filter((i) => i.status === "in_progress").length;
  const done = issues.filter((i) => i.status === "done").length;

  return (
    <div className="flex gap-6 mb-6">
      <Stat label="Open" value={open} color="blue" />
      <Stat label="In Progress" value={inProgress} color="yellow" />
      <Stat label="Done" value={done} color="green" />
    </div>
  );
};

function Stat({ label, value, color }: any) {
  return (
    <div className="bg-white p-4 rounded-xl shadow-sm border">
      <p className="text-sm text-gray-500">{label}</p>
      <p className={`text-2xl font-bold text-${color}-600`}>{value}</p>
    </div>
  );
}
