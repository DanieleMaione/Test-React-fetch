import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getPlaceHolderObjectType } from "./HomePage";

interface TComments {
  postId: number;
  id: number;
  name: string;
  email: string;
  body: string;
}

export const Description = () => {
  const [posts, setPosts] = useState<Array<getPlaceHolderObjectType>>([]);
  const [comments, setComments] = useState<Array<TComments>>([]);
  const [favorites, setFavorites] = useState([""]);

  const getPlaceHolderAPI = async () => {
    const result = await fetch("https://jsonplaceholder.typicode.com/posts");
    const data = await result.json();
    setPosts(data);
  };
  const getPlaceHolderAPIComments = async () => {
    const result = await fetch("https://jsonplaceholder.typicode.com/comments");
    const data = await result.json();
    setComments(data);
  };

  useEffect(() => {
    getPlaceHolderAPI();
    getPlaceHolderAPIComments();
  }, []);

  const { id } = useParams();

  const getFavId = localStorage.getItem("idFav");
  useEffect(() => {
    setFavorites([getFavId || ""]);
  }, [getFavId]);

  const newFav = [];

  newFav.push(favorites);

  console.log(newFav);

  const onSetFav = () => {
    localStorage.setItem("idFav", id || "");
  };

  return (
    <div>
      {posts.map((post: getPlaceHolderObjectType) => {
        if (post.id.toString() === id) {
          return (
            <div key={id}>
              <button
                style={{ background: "red", color: "white" }}
                onClick={onSetFav}
              >
                Aggiungi ai preferiti
              </button>
              <h1>Title: {post.title}</h1>
              <h3>Description: {post.body}</h3>

              <h2>COMMENTI</h2>
              {comments.map((comment: TComments) => {
                if (comment.postId.toString() === id)
                  return (
                    <div
                      key={comment.id}
                      style={{ margin: "30px 0", border: "1px solid black" }}
                    >
                      <h3 key={"name"}>Name: {comment.name}</h3>
                      <h3 key={"email"}>Email: {comment.email}</h3>
                      <h3 key={"comment"}>Comment: {comment.body}</h3>
                    </div>
                  );
                else return "";
              })}
            </div>
          );
        } else return "";
      })}
    </div>
  );
};
