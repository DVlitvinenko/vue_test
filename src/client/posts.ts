import { Post } from "@typesDir/Post";
import axios from "axios";

interface Answer {
  posts: Post[];
  pageCount: number;
}

const getPosts = async (
  limit: number = 10,
  page: number = 1
): Promise<Answer> => {
  const url = "https://jsonplaceholder.typicode.com/posts";

  try {
    const response = await axios.get(url, {
      params: {
        _limit: limit,
        _page: page,
      },
    });
    const posts = response.data;
    const pageCount = Math.ceil(response.headers["x-total-count"] / limit);
    return { posts, pageCount };
  } catch (error: any) {
    console.error(error.message);
    return { posts: [], pageCount: 0 };
  }
};

export { getPosts };
