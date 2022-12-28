import logo from "./logo.svg";
import { lazy, Suspense, createContext, useState, useEffect } from "react";
import {
  Button,
  Navbar,
  Container,
  Nav,
  Row,
  Col,
  NavLink,
} from "react-bootstrap";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import data from "./data.js";
import { Card, About, Event, Loading } from "./components/components.js";
//import Detail from "./components/detail.js";
import { Routes, Route, Link, useNavigate, Outlet } from "react-router-dom";
import axios from "axios";
import {
  QueryClient,
  QueryClientProvider,
  useQuery,
} from "@tanstack/react-query";
//import Cart from "./components/Cart.js";

export let Context1 = createContext();

const Detail = lazy(() => import("./components/detail.js"));
const Cart = lazy(() => import("./components/Cart.js"));
function App() {
  let obj = { name: "kim" };

  let [shoes, shoesch] = useState(data);
  let [재고] = useState([10, 11, 12]);
  let [load, setLoad] = useState(false);
  let navigate = useNavigate();

  let [cnt, setCnt] = useState(0);
  let a = JSON.parse(localStorage.getItem("watched"));
  let result = useQuery(["작명"], () =>
    axios.get("https://codingapple1.github.io/userdata.json").then((a) => {
      return a.data;
    })
  );
  useEffect(() => {
    if (a == null || a == [])
      localStorage.setItem("watched", JSON.stringify([]));
  }, []);

  return (
    <div className="App">
      <Navbar bg="light" variant="light">
        <Container>
          <Navbar.Brand href="#home">shop of jy</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link
              onClick={() => {
                navigate("/");
              }}
            >
              Home
            </Nav.Link>
            <Nav.Link
              onClick={() => {
                navigate("/detail");
              }}
            >
              Detail
            </Nav.Link>
            <Nav.Link
              onClick={() => {
                navigate("/cart");
              }}
            >
              Cart
            </Nav.Link>
          </Nav>
          <Nav className="ms-auto">
            {result.isLoading && "로딩중"}
            {result.error && "에러남"}
            {result.data && result.data.name}
          </Nav>
        </Container>
      </Navbar>
      <Suspense fallback={<div>로딩중임</div>}>
        <Routes>
          <Route
            path="/"
            element={
              <>
                <div
                  className="main-bg"
                  style={{
                    backgroundImage: `url(${
                      process.env.PUBLIC_URL + "/img/bg.jpg"
                    })`,
                  }}
                ></div>
                <div className="container">
                  <div className="row">
                    {shoes.map(function (a, i) {
                      return <Card shoes={shoes[i]} i={i} key={i} />;
                    })}
                  </div>
                </div>
                {load == true ? <Loading /> : null}
                <button
                  onClick={() => {
                    let copy = [...shoes];
                    copy.sort((a, b) =>
                      a.title.toLowerCase() < b.title.toLowerCase() ? -1 : 1
                    );
                    shoesch(copy); //변경함수에 변경한 독립적카피본 copy를 넣음
                  }}
                >
                  가나다순정렬
                </button>
                <button
                  onClick={() => {
                    setCnt(++cnt);
                    if (cnt == 1) {
                      axios
                        .get("https://codingapple1.github.io/shop/data2.json")
                        .then((result) => {
                          setLoad(true);
                          let copy = [...shoes, ...result.data];
                          shoesch(copy);
                          setLoad(false);
                        })
                        .catch(() => {
                          console.log("실패함");
                          setLoad(false);
                        });
                    } else if (cnt == 2) {
                      axios
                        .get("https://codingapple1.github.io/shop/data3.json")
                        .then((result) => {
                          setLoad(true);
                          let copy = [...shoes, ...result.data];
                          shoesch(copy);
                          setLoad(false);
                        })
                        .catch(() => {
                          console.log("실패함");
                        });
                    } else {
                      setLoad(true);
                      alert("상품더없음");
                      setLoad(false);
                    }
                  }}
                >
                  더보기
                </button>
              </>
            }
          />

          <Route
            path="/detail/:id"
            element={
              <Context1.Provider value={{ 재고, shoes }}>
                <Detail shoes={shoes} />
              </Context1.Provider>
            }
          />
          <Route path="/cart" element={<Cart />} />
          <Route path="*" element={<>없는페이지임</>} />
        </Routes>
      </Suspense>
    </div>
  );
}

export default App;
