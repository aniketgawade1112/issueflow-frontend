export const queryKeys = {
  issues: (page: number, status?: string) => ["issues", page, status],
  users: ["users"],
};
