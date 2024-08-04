import { useContext, useRef, useState } from "react";
import { ListOfPost } from "../store/Post-list-store";
import WelcomeMessage from "./WelcomeMessage";

const CreatePost = ({ setselectedTab }) => {
  const { addPost } = useContext(ListOfPost);
  const userIdElement = useRef();
  const postTitleElement = useRef();
  const postBodyElement = useRef();
  const likesElement = useRef();
  const dislikesElement = useRef();
  const tagsElement = useRef();

  const handleSubmit = (event) => {
    event.preventDefault();
    const userId = userIdElement.current.value;
    const postTitle = postTitleElement.current.value;
    const postBody = postBodyElement.current.value;
    const likes = likesElement.current.value;
    const dislikes = dislikesElement.current.value;
    const tags = tagsElement.current.value.split(" ");

    userIdElement.current.value = "";
    postTitleElement.current.value = "";
    postBodyElement.current.value = "";
    likesElement.current.value = "";
    dislikesElement.current.value = "";
    tagsElement.current.value = "";

    fetch("https://dummyjson.com/posts/add", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        title: postTitle,
        userId: userId,
        reactions: {
          likes: likes,
          dislikes: dislikes,
        },
        tags: tags,
        body: postBody,
        /* other post data */
      }),
    })
      .then((res) => res.json())
      .then((resObj) => addPost(resObj));

    setselectedTab("Home");
  };

  // title: postTitle,
  //         userId: userId,
  //         likes: likes,
  //         dislikes: dislikes,
  //         tags: tags,
  //         body: postBody,

  return (
    <>
      <form className="create-post" onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="userId" className="form-label">
            Enter Your UserId Here
          </label>
          <input
            ref={userIdElement}
            type="text"
            className="form-control"
            id="userId"
            placeholder="your UserId"
          />
        </div>
        <div className="mb-3">
          <label htmlFor="title" className="form-label">
            Post Title
          </label>
          <input
            ref={postTitleElement}
            type="text"
            className="form-control"
            id="title"
            placeholder="How are you feeling today..."
          />
        </div>
        <div className="mb-3">
          <label htmlFor="body" className="form-label">
            Post Content
          </label>
          <textarea
            ref={postBodyElement}
            rows="4"
            type="text"
            className="form-control"
            id="body"
            placeholder="Tell us something about it..."
          />
        </div>
        <div className="mb-3">
          <label htmlFor="reactions" className="form-label">
            No. Of Likes
          </label>
          <input
            ref={likesElement}
            type="text"
            className="form-control"
            id="reactions"
            placeholder="how many Like this post..."
          />
        </div>
        <div className="mb-3">
          <label htmlFor="reactions" className="form-label">
            No. Of Dislikes
          </label>
          <input
            ref={dislikesElement}
            type="text"
            className="form-control"
            id="reactions"
            placeholder="how many Dislike this post..."
          />
        </div>
        <div className="mb-3">
          <label htmlFor="tags" className="form-label">
            Enter Your Hashtags Here
          </label>
          <input
            ref={tagsElement}
            type="text"
            className="form-control"
            id="tags"
            placeholder="Please enter tags using space..."
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Post
        </button>
      </form>
    </>
  );
};
export default CreatePost;
