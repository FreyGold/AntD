import { useQuery } from "@tanstack/react-query";
import { getPosts } from "./posts.api";

export const GET_POSTS_QUERY_KEY = "/posts";

export const useGetPostsQuery = () => {
   return useQuery({
      queryKey: [GET_POSTS_QUERY_KEY],
      queryFn: getPosts,
   });
};
