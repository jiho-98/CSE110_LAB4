import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { AppProvider } from "./context/AppContext";
import { MyBudgetTracker } from "./views/MyBudgetTracker";
import SetBudget from "./components/Budget/SetBudget"; 

const App = () => {
  return (
    <AppProvider>
      <SetBudget /> 
      <MyBudgetTracker />
    </AppProvider>
  );
};

export default App;