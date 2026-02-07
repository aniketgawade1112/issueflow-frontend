import { useQuery } from "@tanstack/react-query";
import { queryKeys } from "../../constants/queryKeys";
import { getUsers } from "../../api/users.api";

export const useUsers = () => {
  return useQuery({
    queryKey: queryKeys.users,
    queryFn: getUsers,
  });
};
