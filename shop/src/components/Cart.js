import { memo, useState } from "react";
import { Table } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { changeName, changeAge } from "../store/userSlice.js";
import { increaseCount, deleteproduct } from "../store/productSlice.js";
let Child = memo(function () {
  console.log("재렌더링됨");
  return <div>자식임</div>;
});
function Cart() {
  let state = useSelector((state) => state);
  let dispatch = useDispatch();
  let [count, setCount] = useState(0);
  return (
    <>
      <Child></Child>
      <button
        onClick={() => {
          setCount(count + 1);
        }}
      >
        +
      </button>
      <h6>
        {state.user.name} {state.user.age}의 장바구니
      </h6>
      <button
        onClick={() => {
          dispatch(changeAge(100));
        }}
      >
        버튼
      </button>

      <Table>
        <thead>
          <tr>
            <th>#</th>
            <th>상품명</th>
            <th>수량</th>
            <th>변경하기</th>
            <th>삭제하기</th>
          </tr>
        </thead>
        <tbody>
          {state.product.map(function (a, i) {
            return (
              <tr>
                <td>{state.product[i].id}</td>
                <td>{state.product[i].name}</td>
                <td>{state.product[i].count}</td>
                <td>
                  <button
                    onClick={() => {
                      dispatch(increaseCount(state.product[i].id));
                    }}
                  >
                    +
                  </button>
                </td>
                <td>
                  <button
                    onClick={() => {
                      dispatch(deleteproduct(state.product[i].id));
                    }}
                  >
                    삭제
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </Table>
    </>
  );
}

export default Cart;
