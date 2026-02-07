import {
  keepPreviousData,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import { queryKeys } from "../../constants/queryKeys";
import { createIssues, getIssues } from "../../api/issues.api";

export const useIssues = (page: number, status?: string) => {
  return useQuery({
    queryKey: queryKeys.issues(page, status),
    queryFn: () => getIssues(page, status),
    placeholderData: keepPreviousData,
  });
};

export const useCreateIssues = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createIssues,

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["issues"],
      });
    },
  });
};
