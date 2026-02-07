import { useState } from "react";
import { useIssues } from "../issues/issueQueries";
import { useUsers } from "../users/userQueries";
import { useSelector } from "react-redux";
import type { RootState } from "../../store/store";

export default function IssueList() {
  const [page, setPage] = useState(1);

  const status = useSelector((state: RootState) => state.filters.status);

  const { data, isLoading, isError } = useIssues(
    page,
    status === "all" ? undefined : status,
  );

  const { data: users } = useUsers();

  if (isLoading) return <p>Loading issues...</p>;
  if (isError) return <p>Error loading...</p>;

  return (
    <div className="space-y-3">
      {data?.data.map((issue) => {
        const assignee = users?.find((user) => user.id === issue.assigneeId);

        return (
          <div key={issue.id} className="bg-white p-4 rounded shadow">
            <h3 className="font-medium">{issue.title}</h3>
            <p className="text-sm text-gray-500">Status: {issue.status}</p>
            <p className="text-sm text-gray-500">
              Assignee: {assignee?.name || "Unassigned"}
            </p>
          </div>
        );
      })}

      <div className="flex gap-2 mt-4">
        <button
          className="px-3 py-1 bg-gray-200 rounded"
          onClick={() => setPage((p) => Math.max(1, p - 1))}
        >
          Prev
        </button>
        <button
          className="px-3 py-1 bg-gray-200 rounded"
          onClick={() => setPage((p) => p + 1)}
        >
          Next
        </button>
      </div>
    </div>
  );
}
