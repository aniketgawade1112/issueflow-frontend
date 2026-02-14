import type { Issue } from "../features/issues/issueTypes";
import { delay } from "../utils/delay";

const issues: Issue[] = Array.from({ length: 25 }, (_, i) => ({
  id: (i + 1).toString(),
  title: `Issue ${i + 1}`,
  status: i % 3 === 0 ? "open" : i % 3 === 1 ? "in_progress" : "done",
  assigneeId: i % 2 === 0 ? "1" : "2",
  createdAt: new Date().toISOString(),
}));

const PAGE_SIZE = 5;

export const getIssues = async (
  page: number,
  status?: string,
  search?: string,
) => {
  await delay(600);

  let filtered = issues;

  if (status) {
    filtered = issues.filter((i) => i.status === status);
  }

  if (search) {
    filtered = filtered.filter((i) =>
      i.title.toLowerCase().includes(search.toLowerCase()),
    );
  }

  const start = (page - 1) * PAGE_SIZE;
  const paginated = filtered.slice(start, start + PAGE_SIZE);

  return {
    data: paginated,
    total: filtered.length,
    hasMore: start + PAGE_SIZE < filtered.length,
  };
};

export const createIssue = async (title: string) => {
  await delay(500);

  const newIssue: Issue = {
    id: Date.now().toString(),
    title,
    status: "open",
    assigneeId: null,
    createdAt: new Date().toISOString(),
  };

  issues.unshift(newIssue);

  return newIssue;
};

export const updateIssue = async (id: string, updates: Partial<Issue>) => {
  await delay(600);

  const issue = issues.find((i) => i.id === id);
  if (!issue) throw new Error("Issue not found");

  Object.assign(issues, updates);

  return issues;
};
