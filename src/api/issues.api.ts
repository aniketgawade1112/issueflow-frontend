import type { Issue } from "../features/issues/issueTypes";
import { delay } from "../utils/delay";

const issues: Issue[] = [
  {
    id: "1",
    title: "Login page bug",
    status: "open",
    assigneeId: "1",
    createdAt: new Date().toISOString(),
  },
  {
    id: "2",
    title: "Dashboard slow load",
    status: "in_progress",
    assigneeId: "2",
    createdAt: new Date().toISOString(),
  },
];

const PAGE_SIZE = 5;

export const getIssues = async (page: number, status?: string) => {
  await delay(600);

  let filtered = issues;

  if (status) {
    filtered = issues.filter((i) => i.status === status);
  }

  const start = (page - 1) * PAGE_SIZE;
  const paginated = filtered.slice(start, start + PAGE_SIZE);

  return {
    data: paginated,
    total: filtered.length,
  };
};

export const createIssues = async (title: string) => {
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
