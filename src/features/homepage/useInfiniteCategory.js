import { useInfiniteQuery } from "@tanstack/react-query";

export default function useInfiniteCategory(key, fetchPageFn) {
  return useInfiniteQuery({
    queryKey: [key],
    queryFn: ({ pageParam = 1, signal }) => fetchPageFn(pageParam, signal),
    getNextPageParam: (lastPage) =>
      lastPage.page < lastPage.total_pages ? lastPage.page + 1 : undefined,
    staleTime: 5 * 60 * 1000, // 5m cache
    cacheTime: 30 * 60 * 1000, // keep unused data for 30m
    refetchOnWindowFocus: false,
  });
}
