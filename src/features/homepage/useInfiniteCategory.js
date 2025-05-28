import { useInfiniteQuery } from "@tanstack/react-query";

export default function useInfiniteCategory(queryKey, fetchFn) {
  return useInfiniteQuery({
    queryKey,
    queryFn: ({ pageParam = 1, signal }) => fetchFn(pageParam, signal),
    getNextPageParam: (lastPage) =>
      lastPage.page < lastPage.total_pages ? lastPage.page + 1 : undefined,
  });
}
