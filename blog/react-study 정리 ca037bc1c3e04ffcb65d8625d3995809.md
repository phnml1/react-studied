# react-study 정리

# 1. react study 1주(~Array and object)

App.js에서 코딩

### jsx문법

jsx문법을 js에서 html대용으로 사용가능 return 문 안에서 div는 한개만 있어야한다. 

jsx 문법 1 ) class를 넣고싶을땐 className사용

ex) className=”App”

jsx 문법 2) 변수를 html안에 넣고싶을때는 {} 중괄호 사용

ex) let post = ‘강남 우동 맛집’;

…return(<div>{post}</div>)

jsx 문법 3) style을 넣을때는 이런식으로

<h4 style={ {color: ‘red’, fontSize: ‘16px’} }>

블로그임</h4>

### state

state는 많이 변경되는 자료를 쉽게 관리하기위해서 사용

let [a,b] = useState(’’);

a : state이름 b: state변경함수

1. 버튼에 기능개발 & 리액트 state 변경하는법

```
<h4>{ 글제목[0]}<span onClick={() => {따봉변경(따봉+1)} }>👍</span> {따봉} </h4>
```

html 태그에 onClick속성안에 변경함수를 넣어줌으로써 클릭할때마다 state를 변경 시킬 수 있다 .

```jsx
let [따봉,따봉변경] = useState(0); //오른쪽은 state변경함수
```

state에 0을넣었고 onclick속성에 변경함수에 (state+1)을 넣었으므로 클릭할때마다 1씩 증가한다. 

### array. object state는 어떻게 변경할까?

array와 object와 같은 자료형은 이와같은 자료형을 담은 변수에는 화살표(주소)만 저장이된다.

```jsx
<button onClick = {()=> {
        let copy = 글제목;
        copy[0] = '여자코트추천';
        글제목변경(copy);
      }}>글제목변경</button>
```

와같이 button을 만들고 나중에 글제목을 바꾸려고해도 바뀌지않는이유는 글제목에 저장되있던거는 화살표만을 저장하므로 copy를 바꾸려고해도 화살표는 바뀌지않으므로 소용이없는 것이다. 

console.log(글제목==copy)를 해보아도 변수가 담고있는 것(화살표)이 같으므로 변경이 되지 않는 것이다.  

따라서 

```jsx
<button onClick = {()=> {
        let copy = [...글제목];
        copy[0] = '여자코트추천';
        글제목변경(copy);
      }}>글제목변경</button>
```

[…글제목]으로 별개의 복사본을 만들어서 copy에 저장한다음 그것을 변경함수에 넣으면 된다

정리하자면, array나 object와 같은 state는 복사본을 만들어서 수정해야한다!

과제) 가나다순정렬버튼만들기

```jsx
<button onClick={()=>{
        let copy=[...글제목];
        copy.sort(); //array정렬함수
        글제목변경(copy);//변경함수에 변경한 독립적카피본 copy를 넣음
      }}>가나다순정렬</button>
```

## 2. react  스터디 2주(~props)

### 컴포넌트

복잡한 html을 한단어로 치환가능

ex)

```jsx
<div className='modal'>
        <h4>제목</h4>
        <p>날짜</p>
        <p>상세내용</p>
      </div>
```

을

<Modal></Modal>로 치환가능

.

```jsx
function Modal(){
  return (
    <div className="modal">
      <h4>제목</h4>
      <p>날짜</p>
      <p>상세내용</p>
    </div>
  )
}
```

함수로 따로만들어야(App말고)

return안에 <> </>로도 div들 묶기가능

ex)

```jsx
function Modal(){
  return (
		<>
    <div className="modal">
      <h4>제목</h4>
      <p>날짜</p>
      <p>상세내용</p>
    </div>
		</>
  )
}
```

보통 영어대문자로 작문하며, <컴포넌트></컴포넌트>나 <컴포넌트/>나 노상관

언제 컴포넌트>

1. 반복적인 html축약
2. 큰페이지
3. 자주 변경되는것

컴포넌트의 단점: state가져다쓸때 문제생김(다른함수에있으므로)

컴포넌트 만드는 문법2 ) 

let(const) modal = () ⇒ {

return(); } (arrow function사용가능)

### 동적 UI 만드는법

Modal창을 보이고싶을때 보이게하고, 안보이고 싶을때 안보이게하는 동적인Ui로만들기

```jsx
{
        modal? <Modal/>: null
      }
```

이런식으로 app function안에 데이터바인딩으로 코드 넣기 modal은 state로

```jsx
let [modal,setModal] = useState(false);
```

이런식으로 위에 만들었고 현재는 false라 보이지않지만 true라면 modal창이 화면에보이게된다.

이걸이용해서 제목을 클릭했을때 모달창이보이게하려면,

```jsx
<div className='list'>
        <h4 onClick={() => {setModal(true) }}>{글제목[2]}</h4>
        <p>{date[2]}</p>
      </div>
```

이런 식으로 하면 버튼을 클릭했을때 state가 바뀌므로, 구현이가능하다.

숙제)  글제목 누를때마다 모달 사라지고 나타나게하기

내가푼풀이)

```jsx
<div className='list'>
        <h4 onClick={() => {
          let a = count;
          a++;
          setCount(a)}}>{글제목[2]}</h4>
        <p>{date[2]}</p>
      </div>
//중략
{
     count%2!==0? <Modal/>: null
  }
```

틀린건아니고, 구현도 되나, count라는 state를 굳이하나 더만들어줘야하고, count는 무한정증가하므로, 비효율적

모범답안)

```jsx
function App (){

  let [modal, setModal] = useState(false);
  return (
    <div>
      (생략)
      <button onClick={ ()=>{ setModal(!modal) } }> {글제목[0]} </button>
      { 
         modal == true ? <Modal></Modal> : null
      }
    </div>
  )
}
```

누를때마다 true/false만 바뀌므로 효율적

### map: 많은 div를 반복문형식으로

map함수:

array.map(function(a,i){

return(div태그)

}

여기서 a는 array안의 자료 i는 자동적으로 0부터 1씩증가하는 정수

따라서,

```jsx
{
        글제목.map(function(a, i) {
          return (
          <div className='list'>
            <h4>{ 글제목[i] }</h4>//글제목은 array로한 state
            <p>{date[i]}</p> // date도 마찬가지
          </div>
          )  
        })
        
      }
```

출력결과

![캡처.PNG](react-study%20%E1%84%8C%E1%85%A5%E1%86%BC%E1%84%85%E1%85%B5%20ca037bc1c3e04ffcb65d8625d3995809/%25EC%25BA%25A1%25EC%25B2%2598.png)

결론은 map 함수는

왼쪽 array자료만큼 내부코드실행해주고, return안에있는것을 array로 담아준다. 

각자의 기능이있는 두개의 파라미터를 유용하게사용가능하다.

 숙제) 따봉갯수 개별로 기록하기

```jsx
{
        글제목.map(function(a, i) {
          return (
          <div className='list'>
            <h4>{ 글제목[i] } <span onClick={() => {
              let copy = [...따봉];
              copy[i]+=1;
              따봉변경(copy);
            } }>👍</span> {따봉[i]}</h4>
            <p>{date[i]}</p>
          </div>
          )  
        })
      }
```

### props

왜필요한가? 서로다른 컴포넌트에서 state를 쓰고싶은데 그건 불가능

props를통해가능! 단, 컴포넌트끼리 부모,자식 관계인 경우에만 가능하다! 

step1 자식컴포넌트 사용하는데에가서 <자식컴포넌트 작명={state이름}>

step2 자식컴포넌트를 만드는 function으로 간다음 props라는 파라미터 등록후 props.작명사용한다

ex)

```jsx
function App (){
  let [글제목, 글제목변경] = useState(['남자코트 추천', '강남 우동맛집', '파이썬독학']);
  return (
    <div>
      <Modal 글제목={글제목}></Modal>
    </div>
  )
}

function Modal(props){
  return (
    <div className="modal">
      <h4>{ props.글제목[0] }</h4>
      <p>날짜</p>
      <p>상세내용</p>
    </div>
  )
}
```

1. 자식컴포넌트 사용하는 곳에 가서 **<자식컴포넌트 작명={state이름} />**

2. 자식컴포넌트 만드는 곳에 가서 props라는 파라미터 등록 후 **props.작명** 사용

⚠️오로지, 부모→자식만 가능!

숙제) 글제목변경버튼 props통해생성

```jsx
{
      modal == true ?<Modal 글제목 = {글제목} 글제목변경 = {글제목변경}/>: null
      }

function Modal(props){
//중략
<button onClick = {()=>{
          let copy = [...props.글제목];
          copy[0] = '여자 코트 추천';
          props.글제목변경(copy);
        }}>글수정</button>
}
```

### props를 통해 상세페이지생성

0번 글을 누르면 0번 글제목이 모달창안에 등장하고

1번 글을 누르면 1번 글제목이 모달창안에 등장하고 이런식으로 동작할려면

step3(복습) 1.html/css 2. UI의상태를 state로 3.state종류에따라 UI가 어떻게보일지 작성

title이란 스위치를 0,1,2로바꿔주고,button에다가 onClick넣어주면됨

```jsx
//버튼들
<div>
      <button onClick={()=>{ setTitle(0) }}> 0번글 </button>
      <button onClick={()=>{ setTitle(1) }}> 1번글 </button>
      <button onClick={()=>{ setTitle(2) }}> 2번글 </button>
      <Modal 어쩌구/>
    </div>
```

```jsx
//모달창안
<h4>{ props.글제목[props.title] }</h4>
        <p>날짜</p>
        <p>상세내용</p>
```