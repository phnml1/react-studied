import { useContext, useEffect, useState } from "react";
import {
  Routes,
  Route,
  Link,
  useNavigate,
  Outlet,
  useParams,
} from "react-router-dom";
import { Button, Navbar, Nav, NavLink, NavItem } from "react-bootstrap";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { addproduct } from "../store/productSlice.js";
import { Context1 } from "./../App.js";

function Detail(props) {
  let { 재고 } = useContext(Context1);
  let { shoes } = useContext(Context1);
  let [aler, setAler] = useState(true);

  let [count, setCount] = useState(0);
  let [탭, 탭변경] = useState(1);
  const url = props.shoes.image;
  let { id } = useParams();
  let prodid = props.shoes.findIndex((i) => i.id == id);
  let [ivalue, setIvalue] = useState("");
  let [fade, setFade] = useState("");

  let state = useSelector((state) => state);
  let dispatch = useDispatch();
  let navigate = useNavigate();
  useEffect(() => {
    let a;
    a = JSON.parse(localStorage.getItem("watched"));
    a.push(parseInt(id));
    a = new Set(a);
    a = Array.from(a);
    localStorage.setItem("watched", JSON.stringify(a));
    console.log(id);
  });
  useEffect(() => {
    let a = setTimeout(() => {
      setAler(false);
    }, 2000);
    console.log(1);
    return () => {
      console.log(2);
      clearTimeout(a); //useEffect동작하기전에 특정코드실행(기존데이터요청충돌방지),unmount시에실행
    };
  }, []); //count변할때만실행[count], [] mount시에만실행
  useEffect(() => {
    if (isNaN(ivalue) == true) {
      alert("그러지마세요");
    }
  }, [ivalue]);

  useEffect(() => {
    setTimeout(() => {
      setFade("end");
    }, 100); //automatic batching 기능 state변경하고 마지막에 재렌더링
    return () => {
      setFade("");
    };
  }, []);

  return (
    <div className={"container start " + fade}>
      {aler ? (
        <div className="alert alert-warning">2초이내 구매시 할인</div>
      ) : null}
      <button
        onClick={() => {
          setCount(count + 1);
        }}
      >
        버튼
      </button>
      <div className="row">
        <div className="col-md-6">
          <img
            src={"https://codingapple1.github.io/shop/shoes1.jpg"}
            alt="shoes img"
            width="100%"
          />
        </div>
        <input
          type="text"
          onChange={(event) => setIvalue(event.target.value)}
        ></input>
        <div className="col-md-6">
          <h4 className="pt-5">{props.shoes[prodid].title}</h4>
          <p>{props.shoes[prodid].content}</p>
          <p>{props.shoes[prodid].price}원</p>
          <button
            className="btn btn-danger"
            onClick={() => {
              dispatch(addproduct(props.shoes[prodid]));
              navigate("/cart");
            }}
          >
            주문하기
          </button>
        </div>
      </div>

      <Nav variant="tabs" defaultActiveKey="link0">
        <Nav.Item>
          <Nav.Link
            onClick={() => {
              탭변경(0);
            }}
            eventKey="link0"
          >
            버튼0
          </Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link
            onClick={() => {
              탭변경(1);
            }}
            eventKey="link1"
          >
            버튼1
          </Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link
            onClick={() => {
              탭변경(2);
            }}
            eventKey="link2"
          >
            버튼2
          </Nav.Link>
        </Nav.Item>
      </Nav>
      <TabContent 탭={탭} />
    </div>
  );
  function TabContent({ 탭 }) {
    let [fade, setFade] = useState("");
    let { 재고 } = useContext(Context1); //context api 중첩해서쓰는 컴포넌트들이많을때 쓰기편함

    useEffect(() => {
      setTimeout(() => {
        setFade("end");
      }, 10); //automatic batching 기능 state변경하고 마지막에 재렌더링
      return () => {
        setFade("");
      };
    }, [탭]);

    return (
      <div className={`start ${fade}`}>
        {[<div>{shoes[0].title}</div>, <div></div>, <div>내용2</div>][탭]}
      </div>
    );
  }
}
export default Detail;
