import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { queryKeys } from "../../constants/queryKeys";
import { getIssues } from "../../api/issues.api";

export const useIssues = (page: number, status?: string) => {
  return useQuery({
    queryKey: queryKeys.issues(page, status),
    queryFn: () => getIssues(page, status),
    placeholderData: keepPreviousData,
  });
};
