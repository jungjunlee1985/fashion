import React, { useState, useEffect } from "react";
import axios from "axios";
import Card from "../components/Card";
import "./Home.css";

const Home = () => {
  const [search, setSearch] = useState("공항패션");
  const [loading, setLoading] = useState(false);
  const [cards, setCards] = useState([]);

  const ID_KEY = "ueU7QWg_KNRJCSAPrXEV";
  const SECRET_KEY = "kWtNdymZiG";

  useEffect(() => {
    fetchData();
  }, []); // 의존성 배열에 빈 배열 전달하여 컴포넌트가 처음 마운트될 때 한 번만 실행

  const fetchData = async () => {
    setLoading(true);
    try {
      if (search === "") {
        setCards([]);
        setLoading(false);
      } else {
        const {
          data: { items },
        } = await axios.get("/api/v1/search/image", {
          params: {
            query: search,
            display: 10,
          },
          headers: {
            "X-Naver-Client-Id": ID_KEY,
            "X-Naver-Client-Secret": SECRET_KEY,
          },
        });
        setCards(items);
        setLoading(false);
      }
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  const handleSearch = (e) => {
    e.preventDefault(); // 폼 제출의 기본 동작을 방지하여 페이지 새로고침을 막음
    fetchData(); // 검색 요청
  };

  const handleChange = (event) => {
    setSearch(event.target.value);
  };
  return (
    <section className="container">
      {loading ? (
        <div className="loader">
          <span className="loader_text">Loading...</span>
        </div>
      ) : (
        <form onSubmit={handleSearch}>
          <div className="input_div">
            <h1>검색</h1>
            <input
              className="input_search"
              type="text"
              value={search}
              onChange={handleChange}
              placeholder="검색해 보세요."
            />
          </div>
          <div className="cards">
            {cards.map((card, index) => (
              <Card
                key={index}
                id={index}
                title={card.title}
                thumbnail={card.thumbnail}
                link={card.link}
                sizeheight={card.sizeheight}
                sizewidth={card.sizewidth}
              />
            ))}
          </div>
          <div id="observer" style={{ height: "10px", border: "solid" }}></div>
        </form>
      )}
    </section>
  );
};

export default Home;
