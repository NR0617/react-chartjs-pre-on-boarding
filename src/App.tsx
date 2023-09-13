import "./App.css";
import { useEffect, useState } from "react";
import { param, getData } from "./api/api";
import ChartComponent from "./components/ChartComponent";
import changeDataForm from "./utils/changeDataForm";

function App() {
  const [chartData, setchartData] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    getData(param).then((res) => {
      const result = changeDataForm(res);
      setchartData(result?.resultArray);
      setIsLoading(false);
    });
  }, []);
  return (
    <>
      <div className="App">
        <ChartComponent
          chartData={chartData}
          setchartData={setchartData}
          isLoading={isLoading}
        />
      </div>
    </>
  );
}

export default App;
