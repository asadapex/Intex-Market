import { getRequest } from "@/service/getRequest";
import { useQuery } from "@tanstack/react-query";

export const getQueryData = (
  url: string,
  actions: { data: any[] },
  queryKey: string
) => {
  const { data, isLoading, error } = useQuery({
    queryKey: [queryKey],
    queryFn: () => getRequest(url),
    initialData: actions,
  });
  return { data, isLoading, error };
};
