import { useMemo } from "react";
import { useInfiniteIssues, useUpdateIssue } from "../issues/issueQueries";
import { useUsers } from "../users/userQueries";
import { useSelector } from "react-redux";
import type { RootState } from "../../store/store";

export default function IssueList({ search }: { search: string }) {
  const status = useSelector((state: RootState) => state.filters.status);
  const role = useSelector((state: RootState) => state.auth.user.role);

  const { mutate: updateIssueMutate } = useUpdateIssue();

  const {
    data,
    isLoading,
    isError,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useInfiniteIssues(status === "all" ? undefined : status, search);

  const { data: users } = useUsers();

  // 🔥 Flatten all pages into one issues array
  const issues = data?.pages.flatMap((page) => page.data) ?? [];

  // 🔥 O(1) lookup map for users (performance optimization)
  const usersMap = useMemo(() => {
    if (!users) return {};

    const map: Record<string, string> = {};
    users.forEach((u) => {
      map[u.id] = u.name;
    });

    return map;
  }, [users]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case "open":
        return "bg-blue-100 text-blue-700";
      case "in_progress":
        return "bg-yellow-100 text-yellow-700";
      case "done":
        return "bg-green-100 text-green-700";
      default:
        return "bg-gray-100 text-gray-600";
    }
  };

  if (isLoading) return <p className="text-gray-500">Loading issues...</p>;
  if (isError) return <p className="text-red-500">Error loading issues</p>;

  return (
    <div className="space-y-4">
      {issues.map((issue) => {
        const assigneeName = issue.assigneeId
          ? usersMap[issue.assigneeId]
          : null;

        return (
          <div
            key={issue.id}
            className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm hover:shadow-md transition"
          >
            {/* Title + Meta */}
            <div className="flex items-start justify-between">
              <div>
                <h3 className="text-lg font-semibold text-gray-800">
                  {issue.title}
                </h3>

                <div className="flex items-center gap-3 mt-2">
                  <span
                    className={`text-xs px-2 py-1 rounded-full font-medium ${getStatusColor(
                      issue.status,
                    )}`}
                  >
                    {issue.status.replace("_", " ")}
                  </span>

                  <span className="text-sm text-gray-500">
                    {assigneeName || "Unassigned"}
                  </span>
                </div>
              </div>
            </div>

            {/* Controls — only for Leads */}
            {role === "lead" && (
              <div className="flex gap-4 mt-4">
                {/* Status Dropdown */}
                <div className="flex flex-col">
                  <label className="text-xs text-gray-500 mb-1">Status</label>
                  <select
                    value={issue.status}
                    onChange={(e) =>
                      updateIssueMutate({
                        id: issue.id,
                        updates: {
                          status: e.target.value as any,
                        },
                      })
                    }
                    className="border rounded px-2 py-1 text-sm"
                  >
                    <option value="open">Open</option>
                    <option value="in_progress">In Progress</option>
                    <option value="done">Done</option>
                  </select>
                </div>

                {/* Assignee Dropdown */}
                <div className="flex flex-col">
                  <label className="text-xs text-gray-500 mb-1">Assignee</label>
                  <select
                    value={issue.assigneeId || ""}
                    onChange={(e) =>
                      updateIssueMutate({
                        id: issue.id,
                        updates: {
                          assigneeId: e.target.value || null,
                        },
                      })
                    }
                    className="border rounded px-2 py-1 text-sm"
                  >
                    <option value="">Unassigned</option>
                    {users?.map((user) => (
                      <option key={user.id} value={user.id}>
                        {user.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            )}
          </div>
        );
      })}

      {/* Load More Button */}
      {hasNextPage && (
        <button
          onClick={() => fetchNextPage()}
          className="mt-4 px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-md text-sm"
        >
          {isFetchingNextPage ? "Loading..." : "Load More"}
        </button>
      )}
    </div>
  );
}
