import { clientApi } from "@/services/api/clientApi";

export const getPosts = async () => {
   const res = await clientApi.get("/posts");
   return res.data;
};

export interface IPostForm {
   title: string;
   body: string;
   userId: number;
}

export const createPost = async (post: IPostForm) => {
   const res = await clientApi.post("/posts", post);
   return res.data;
};

export const updatePost = async (post: Partial<IPostForm>, id: string) => {
   const res = await clientApi.put(`/posts/${id}`, post);
   return res.data;
};

export const deletePost = async (id: string) => {
   const res = await clientApi.delete(`/posts/${id}`);
   return res.data;
};
