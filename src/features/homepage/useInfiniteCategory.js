import { useInfiniteQuery } from "@tanstack/react-query";

export default function useInfiniteCategory(
  queryKey,
  fetchPage,
  staleTime = 5 * 60 * 1000
) {
  return useInfiniteQuery({
    queryKey,
    queryFn: ({ pageParam = 1, signal }) => fetchPage(pageParam, signal),
    getNextPageParam: (lastPage) =>
      lastPage.page < lastPage.total_pages ? lastPage.page + 1 : undefined,
    staleTime,
    cacheTime: 30 * 60 * 1000,
    refetchOnWindowFocus: false,
  });
}
