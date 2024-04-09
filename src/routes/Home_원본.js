import React, { useState } from "react";
import axios from "axios";
import Card from "../components/Card";
import "./Home.css";

class Home extends React.Component {
  state = {
    isLoading: true,
    cards: [],
    value: "공항패션",
  };

  getCards = async () => {
    const [searchVal, setSearch] = useState("공항패션");

    const ID_KEY = "ueU7QWg_KNRJCSAPrXEV";
    const SECRET_KEY = "kWtNdymZiG";
    const search = this.state.value;

    try {
      if (search === "") {
        this.setState({ cards: [], isLoading: false });
      } else {
        const {
          data: { items },
        } = await axios.get("/api/v1/search/image", {
          params: {
            query: search,
            display: 100,
          },
          headers: {
            "X-Naver-Client-Id": ID_KEY,
            "X-Naver-Client-Secret": SECRET_KEY,
          },
        });

        this.setState({ cards: items, isLoading: false });
      }
    } catch (error) {
      console.log(error);
    }
  };

  componentDidMount() {
    this.getCards();
  }

  handleChange = (e) => {
    this.setState({ value: e.target.value });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    this.getCards();
  };

  render() {
    const { isLoading, cards } = this.state;

    return (
      <section className="container">
        {isLoading ? (
          <div className="loader">
            <span className="loader_text">Loading...</span>
          </div>
        ) : (
          <form onSubmit={this.handleSubmit}>
            <div className="input_div">
              <h1>검색</h1>
              <input
                className="input_search"
                type="text"
                value={this.state.value}
                onChange={this.handleChange}
                placeholder="검색해 보세요."
              />
            </div>
            <div className="cards">
              {cards.map((card) => (
                <Card
                  id="1"
                  title={card.title}
                  thumbnail={card.thumbnail}
                  link={card.link}
                  sizeheight={card.sizeheight}
                  sizewidth={card.sizewidth}
                />
              ))}
            </div>
            <div
              id="observer"
              style={{ height: "10px", border: "solid" }}
            ></div>
          </form>
        )}
      </section>
    );
  }
}

export default Home;
