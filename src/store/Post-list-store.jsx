import { createContext, useEffect, useReducer, useState } from "react";

export const ListOfPost = createContext({
  postList: [],
  addPost: () => {},
  fetching: false,
  deletePost: () => {},
});

const PostListReducer = (currPostList, action) => {
  let newPostList = currPostList;
  if (action.type === "DELETE_POST") {
    newPostList = currPostList.filter(
      (post) => post.id !== action.payload.postId
    );
  } else if (action.type === "ADD_INITIAL_POSTS") {
    newPostList = action.payload.posts;
  } else if (action.type === "ADD_POST") {
    newPostList = [action.payload.post, ...currPostList];
  }

  return newPostList;
};

const PostListProvider = ({ children }) => {
  const [postList, dispatchPostList] = useReducer(PostListReducer, []);
  const addPost = (post) => {
    dispatchPostList({
      type: "ADD_POST",
      payload: {
        post,
      },
    });
  };

  const addInitialPosts = (posts) => {
    dispatchPostList({
      type: "ADD_INITIAL_POSTS",
      payload: {
        posts,
      },
    });
  };

  const deletePost = (postId) => {
    dispatchPostList({
      type: "DELETE_POST",
      payload: {
        postId,
      },
    });
  };

  const [fetching, setfetching] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    setfetching(true);
    const controller = new AbortController();
    const signal = controller.signal;

    const fetchData = async () => {
      try {
        const res = await fetch("https://dummyjson.com/posts", { signal });
        if (!res.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await res.json();

        addInitialPosts(data.posts);

        setfetching(false);
      } catch (err) {
        if (err.name !== "AbortError") {
          setError(err.message);
          setfetching(false);
        }
      }
    };

    fetchData();

    return () => {
      controller.abort();
    };
  }, []);

  return (
    <ListOfPost.Provider
      value={{
        postList,
        addPost,
        fetching,
        deletePost,
      }}
    >
      {children}
    </ListOfPost.Provider>
  );
};
export default PostListProvider;
