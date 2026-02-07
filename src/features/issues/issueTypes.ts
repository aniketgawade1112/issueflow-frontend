export type IssueStatus = "open" | "in_progress" | "done";

export interface Issue {
  id: string;
  title: string;
  status: IssueStatus;
  assigneeId: string | null;
  createdAt: string;
}
