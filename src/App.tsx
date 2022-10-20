import userEvent from "@testing-library/user-event";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Routes, Route, useNavigate } from "react-router-dom";
import "./App.css";
import { Post } from "./components/Post";

type getPlaceHolderObjectType = {
  userid: number;
  id: number;
  title: string;
  body: string;
};

const App = () => {
  const [posts, setPosts] = useState<Array<getPlaceHolderObjectType>>([]);
  const [Identify, getIdentify] = useState<number>();
  const [active, setActive] = useState("HomePage");
  const [opened, setOpened] = useState(false);
  const [openedPost, setOpenedPost] = useState<getPlaceHolderObjectType>();

  const getPlaceHolderAPI = async () => {
    const result = await fetch("https://jsonplaceholder.typicode.com/posts");
    const data = await result.json();
    setPosts(data);
  };

  const getBody = async (id: number) => {
    const result = await fetch(
      `https://jsonplaceholder.typicode.com/posts/${id}`
    );
    const ident = await result.json();
    getIdentify(ident);
  };

  useEffect(() => {
    getPlaceHolderAPI();
  }, []);

  console.log(posts);
  return (
    <div className="App">
      {posts.map((elements) => {
        return (
          <div>
            <button onClick={() => setActive("HomePage")}>HomePage</button>
            <button onClick={() => setActive("SecondPage")}>BodyPage</button>
            {active === "HomePage" && `${elements.id}-${elements.title}`}
            {active === "SecondPage" && `${elements.body}`}
          </div>
        );
      })}
    </div>
  );
};

export default App;
