import { useContext, useEffect, useState } from "react";
import { ListOfPost } from "../store/Post-list-store";
import Post from "./Post";
import WelcomeMessage from "./WelcomeMessage";
import LoadingSpinner from "./LoadingSpinner";

const PostList = () => {
  const { fetching, postList } = useContext(ListOfPost);

  if (fetching) {
    return <LoadingSpinner />;
  } else if (!fetching && postList.length === 0) {
    return <WelcomeMessage />;
  } else {
    return (
      <>
        {postList.map((post) => {
          return <Post key={post.id} post={post} />;
        })}
        ;
      </>
    );
  }
};
export default PostList;
