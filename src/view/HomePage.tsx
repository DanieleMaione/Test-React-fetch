import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export type getPlaceHolderObjectType = {
  userid: number;
  id: number;
  title: string;
  body: string;
};

const HomePage = () => {
  const [posts, setPosts] = useState<Array<getPlaceHolderObjectType>>([]);
  const navigate = useNavigate();

  const getPlaceHolderAPI = async () => {
    const result = await fetch("https://jsonplaceholder.typicode.com/posts");
    const data = await result.json();
    setPosts(data);
  };

  useEffect(() => {
    getPlaceHolderAPI();
  }, []);

  const onChangePage = (id: number) => {
    return navigate(`/Document/${id}`);
  };
  return (
    <div className="App">
      {posts.map((elements) => {
        return (
          <h5 key={elements.id} onClick={() => onChangePage(elements.id)}>
            {elements.id}-{elements.title}
          </h5>
        );
      })}
    </div>
  );
};

export default HomePage;
