import { useQuery } from "@tanstack/react-query";
import { fetchPersonDetails } from "../services/apiTmdb";

function usePerson(id) {
  return useQuery({
    queryKey: ["person", id],
    queryFn: ({ signal }) => fetchPersonDetails(id, signal),
    staleTime: 1000 * 60 * 5,
  });
}

export default usePerson;
