import React, { useState, useContext } from "react";
import { AppContext } from "../../context/AppContext";  // 경로 수정

const SetBudget = () => {
  const { budget, setBudget } = useContext(AppContext);
  const [newBudget, setNewBudget] = useState<string>("");  // 초기값을 빈 문자열로 설정

  const handleBudgetChange = () => {
    const budgetValue = Number(newBudget);  // 문자열을 숫자로 변환
    if (!isNaN(budgetValue) && newBudget !== "") {  // 입력 값이 숫자일 때만 처리
      setBudget(budgetValue);
    }
  };

  return (
    <div className="card p-3 mb-3">
      <h3 className="mb-3">Current Budget: ${budget}</h3>
      <div className="input-group">
        <input
          type="number"
          className="form-control"
          value={newBudget}
          onChange={(e) => setNewBudget(e.target.value)}  // 문자열로 처리
          placeholder="Enter your budget"
        />
        <button className="btn btn-primary" onClick={handleBudgetChange}>
          Update Budget
        </button>
      </div>
    </div>
  );
};

export default SetBudget;
