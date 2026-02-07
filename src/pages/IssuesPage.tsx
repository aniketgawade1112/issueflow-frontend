import IssueList from "../features/components/IssueList";
import StatusFilter from "../features/filters/StatusFilter";
import IssueForm from "../features/issues/components/IssueForm";

export default function IssuesPage() {
  return (
    <div>
      <h1 className="text-2xl font-semibold mb-4">Issues</h1>
      <IssueForm />
      <StatusFilter />
      <IssueList />
    </div>
  );
}
