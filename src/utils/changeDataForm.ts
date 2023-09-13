import { CHARTITEM_COLOR } from "../components/ChartComponent";
const changeDataForm = (data: any) => {
  const xData = Object.keys(data);
  const yData = Object.values(data);
  const resultArray = yData.map((el: any, idx) => {
    const result = { ...el };
    if (!!xData[idx]) {
      const time = new Date(xData[idx]);
      const FIRSTNUMBER_OF_SECONDS = "0";
      const xAxisKey =
        time.getHours() +
        ":" +
        time.getMinutes() +
        ":" +
        `${
          String(time.getSeconds()).length === 1
            ? FIRSTNUMBER_OF_SECONDS + time.getSeconds()
            : time.getSeconds()
        }`;
      result.x = xAxisKey;
      result.borderColor = CHARTITEM_COLOR.line;
      result.backgroundColor = CHARTITEM_COLOR.bar.default;
    }
    return result;
  });
  return { resultArray };
};

export default changeDataForm;
