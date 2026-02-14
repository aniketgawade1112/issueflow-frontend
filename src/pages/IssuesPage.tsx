import { useState } from "react";
import IssueList from "../features/components/IssueList";
import StatusFilter from "../features/filters/StatusFilter";
import IssueForm from "../features/issues/components/IssueForm";
import { IssueStats } from "../features/issues/components/IssueStats";
import { useDebounce } from "../hooks/useDebounce";

export default function IssuesPage() {
  const [search, setSearch] = useState("");
  const debouncedSearch = useDebounce(search);

  return (
    <div>
      <h1 className="text-2xl font-semibold mb-4">Issues</h1>
      <input
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Search issues..."
        className="border px-3 py-2 rounded mb-4 w-full"
      />
      <IssueStats />
      <IssueForm />
      <StatusFilter />
      <IssueList search={debouncedSearch} />
    </div>
  );
}
