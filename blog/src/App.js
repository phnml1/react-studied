import logo from './logo.svg';
import './App.css';
import React, { useState } from 'react';
//dasda
function App() {
  
  let [글제목, 글제목변경] = useState(['남자 코트 추천','강남 우동맛집', '파이썬독학']); //destructuring 변수생성 문법
  let [따봉,따봉변경] = useState([0,0,0]); //오른쪽은 state변경함수
  let [modal,setModal] = useState(false);
  let [title,setTitle] = useState(0);
  let [입력값,입력값변경] = useState('');

  //자동렌더링
  return(
    <>
    {
    글제목.map(function(a,i) {
      return(
        <div className='list'>
          <h4 onClick={()=>{setModal(true)}}>{글제목[i]}
          <span onClick={()=>{
            let copy = [...따봉];
            copy[i]+=1;
            따봉변경(copy)
          }}>굿 </span>{따봉[i]}</h4>
          <p>2월 17일 발행</p>
          <button onClick={()=>{
            let copy = [...글제목]
            copy.splice(i,1)
            글제목변경(copy)
          }}>삭제</button>
        </div>
      ) 
    }
    )
    }
    {
    글제목.map(function (a,i){
      return (
        <button onClick={()=>{
          setTitle(i)
        }}>글제목{i}</button>
      )
    })
    }
    <input type="text" onChange={(e)=>{입력값변경(e.target.value)}}/>
    <button onClick={()=>{
      let copy1 = [...글제목]
      let copy2 = [...따봉]
      copy1.push(입력값)
      copy2.push(0)
      글제목변경(copy1)
      따봉변경(copy2)
    }}>글발행</button>
    {
      modal==true? <Modal title = {title} 글제목 = {글제목} 글제목변경 = {글제목변경}/>: null
    }
    </>
  )
}

//스터디 범위까지완료!
function Modal(props) {
  return (
    <div className="modal" >
        <h4>{ props.글제목[props.title] }</h4>
        <p>날짜</p>
        <p>상세내용</p>
        <button onClick = {()=>{
          props.글제목변경('여자코트추천','강남우동맛집','파이썬독학')
        }}>글수정</button>
      </div>
  )
}
class Modal2 extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      name : "kim",
      age :20
    }
  }
  render() {
    return(
      <div>안녕 {this.state.age}
      <button onClick={()=>{
        this.setState({age:21})
      }}>버튼</button>
      </div>
    )
  }
}
export default App;

