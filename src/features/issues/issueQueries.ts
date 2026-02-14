import {
  keepPreviousData,
  useInfiniteQuery,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import { queryKeys } from "../../constants/queryKeys";
import { createIssue, getIssues, updateIssue } from "../../api/issues.api";
import type { Issue } from "../../features/issues/issueTypes";

export const useIssues = (page: number, status?: string) => {
  return useQuery({
    queryKey: queryKeys.issues(page, status),
    queryFn: () => getIssues(page, status),
    placeholderData: keepPreviousData,
  });
};

export const useCreateIssue = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createIssue,

    // 🔥 Optimistic update
    onMutate: async (title: string) => {
      await queryClient.cancelQueries({ queryKey: ["issues"] });

      const previousData = queryClient.getQueriesData({
        queryKey: ["issues"],
      });

      const optimisticIssue = {
        id: Date.now().toString(),
        title,
        status: "open",
        assigneeId: null,
        createdAt: new Date().toISOString(),
      };

      queryClient.setQueriesData({ queryKey: ["issues"] }, (old: any) => {
        if (!old) return old;

        return {
          ...old,
          data: [optimisticIssue, ...old.data],
        };
      });

      return { previousData };
    },

    // rollback if error
    onError: (_err, _title, context) => {
      if (context?.previousData) {
        context.previousData.forEach(([key, value]) => {
          queryClient.setQueryData(key, value);
        });
      }
    },

    // always refetch to sync
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["issues"] });
    },
  });
};

export const useUpdateIssue = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, updates }: { id: string; updates: Partial<Issue> }) =>
      updateIssue(id, updates),

    onSuccess: (updatedIssue) => {
      queryClient.setQueriesData({ queryKey: ["issues"] }, (old: any) => {
        if (!old) return old;

        return {
          ...old,
          data: old.data.map((issue: any) =>
            issue.id === updatedIssue.id ? updatedIssue : issue,
          ),
        };
      });
    },
  });
};

export const useInfiniteIssues = (status?: string, search?: string) => {
  return useInfiniteQuery({
    queryKey: ["issues", "infinite", status, search],

    queryFn: ({ pageParam = 1 }) => getIssues(pageParam, status, search),

    getNextPageParam: (lastPage, pages) => {
      if (!lastPage.hasMore) return undefined;
      return pages.length + 1;
    },

    staleTime: 1000 * 60 * 2,
    refetchOnWindowFocus: false,
  });
};
