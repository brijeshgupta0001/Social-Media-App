import { useContext } from "react";
import { MdDelete } from "react-icons/md";
import { ListOfPost } from "../store/Post-list-store";
const Post = ({ post }) => {
  const { deletePost } = useContext(ListOfPost);
  return (
    <div className="card post-card" style={{ width: "93%" }}>
      <div className="card-body">
        <h5 className="card-title">
          {post.title}

          <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
            <MdDelete onClick={() => deletePost(post.id)} />
          </span>
        </h5>
        <p className="card-text">{post.body}</p>

        {Array.isArray(post.tags) &&
          post.tags.length > 0 &&
          post.tags.map((tag) => (
            <span key={tag} className="badge text-bg-primary hashtag">
              {tag}
            </span>
          ))}

        <div className="alert alert-success reactions" role="alert">
          This post has been liked by {post.reactions.likes} people and disliked
          by {post.reactions.dislikes} peaple.
        </div>
      </div>
    </div>
  );
};
export default Post;
