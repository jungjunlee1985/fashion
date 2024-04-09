import React from "react";
import { useLocation } from "react-router-dom";

function Detail() {
  // 1. useLocation 훅 취득
  const location = useLocation();
  console.log("location.state     " + location.state);
  // 2. location.state 에서 파라미터 취득
  const id = location.state.id;
  const title = location.state.title;
  const link = location.state.link;
  const sizeheight = location.state.sizeheight;
  const sizewidth = location.state.sizewidth;

  return (
    <div>
      <div>
        <p>title: {title}</p>
      </div>
      <div style={{ display: "flex" }}>
        <img src={link} height={800} width={540} />

        <div>
          <h4>sizeheight: {sizeheight}</h4>
          <h4>sizewidth: {sizewidth}</h4>
          <p>사과</p>
          <p>바나나</p>
          <p>포도</p>
        </div>
      </div>
    </div>
  );
}

export default Detail;
