import { useInfiniteQuery } from "@tanstack/react-query";

export default function useInfiniteCategory(key, fetchPageFn) {
  return useInfiniteQuery({
    queryKey: [key],
    queryFn: ({ pageParam = 1, signal }) => fetchPageFn(pageParam, signal),
    getNextPageParam: (lastPage) => {
      if (lastPage.page < lastPage.total_pages) {
        return lastPage.page + 1;
      }
      return undefined;
    },
  });
}
