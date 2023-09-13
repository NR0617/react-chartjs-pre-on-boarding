import { MouseEvent, useRef } from "react";
import type { InteractionItem } from "chart.js";
import styled from "styled-components";
import { SpinnerContainer, SpinnerOverlay } from "../assets/LoadingSpinner";
import {
  Chart as ChartJS,
  LinearScale,
  CategoryScale,
  BarElement,
  PointElement,
  LineElement,
  Legend,
  Tooltip,
  Filler,
  Title,
} from "chart.js";
import { Chart, getElementAtEvent } from "react-chartjs-2";
ChartJS.register(
  LinearScale,
  CategoryScale,
  BarElement,
  PointElement,
  LineElement,
  Legend,
  Title,
  Filler,
  Tooltip
);
interface ChartDataType {
  backgroundColor: string;
  borderColor: { default: string; name: string; fill: string };
  id: string;
  value_area: number;
  value_bar: number;
  x: string;
}
export const CHARTITEM_COLOR = {
  bar: {
    focus: "rgb(87, 65, 192)",
    default: "rgb(87, 65, 192, 0.6)",
    name: "value bar",
  },
  line: {
    default: "rgb(249, 119, 139)",
    name: "value area",
    fill: "rgb(249, 119, 139, 0.8)",
  },
};
const ChartComponent = ({ chartData, setchartData, isLoading }: any) => {
  const data = {
    datasets: [
      {
        type: "line" as const,
        label: "value_area",
        borderColor: CHARTITEM_COLOR.line.default,
        borderWidth: 1,
        fill: true,
        backgroundColor: CHARTITEM_COLOR.line.fill,
        data: chartData,
        yAxisID: "y",
        parsing: {
          xAxisKey: "x",
          yAxisKey: "value_area",
        },
      },
      {
        type: "bar" as const,
        label: "value_bar",
        backgroundColor: chartData.map((el: any) => el.backgroundColor),
        data: chartData,
        yAxisID: "y1",
        parsing: {
          xAxisKey: "x",
          yAxisKey: "value_bar",
        },
        borderColor: "white",
        borderWidth: 0,
      },
    ],
  };

  const chartRef = useRef<ChartJS>(null);
  const changeBackgroundColor = (element: InteractionItem[]) => {
    if (!element.length) return;

    const { datasetIndex, index } = element[0];
    const id = data.datasets[datasetIndex].data[index].id;
    const dataArray = chartData.map((el: any) => {
      const newElm = { ...el };
      if (el.id === id) {
        newElm.backgroundColor = CHARTITEM_COLOR.bar.focus;
      } else {
        newElm.backgroundColor = CHARTITEM_COLOR.bar.default;
      }
      return newElm;
    });
    setchartData(dataArray);
  };
  const onClickCanvas = (event: MouseEvent<HTMLCanvasElement>) => {
    const { current: chart } = chartRef;
    if (!chart) {
      return;
    }
    changeBackgroundColor(getElementAtEvent(chart, event));
  };

  const AREA = {
    default: { name: "init", value: "해제" },
    중랑구: { name: "JL", value: "중랑구" },
    성북구: { name: "SB", value: "성북구" },
    강남구: { name: "GN", value: "강남구" },
    노원구: { name: "NW", value: "노원구" },
  };
  const onClickAreaButton = (event: MouseEvent<HTMLInputElement>) => {
    const { current: chart } = chartRef;
    if (!chart) {
      return;
    }
    let result;
    switch (event.currentTarget.name) {
      case AREA.default.name:
        result = chartData.map((el: ChartDataType) => {
          const newElm = { ...el };
          newElm.backgroundColor = CHARTITEM_COLOR.bar.default;
          return newElm;
        });
        setchartData(result);
        break;
      case AREA.강남구.name:
        result = chartData.map((el: ChartDataType) => {
          const newElm = { ...el };
          if (el.id === AREA.강남구.value) {
            newElm.backgroundColor = CHARTITEM_COLOR.bar.focus;
          } else {
            newElm.backgroundColor = CHARTITEM_COLOR.bar.default;
          }
          return newElm;
        });
        setchartData(result);
        break;
      case AREA.노원구.name:
        result = chartData.map((el: ChartDataType) => {
          const newElm = { ...el };
          if (el.id === AREA.노원구.value) {
            newElm.backgroundColor = CHARTITEM_COLOR.bar.focus;
          } else {
            newElm.backgroundColor = CHARTITEM_COLOR.bar.default;
          }
          return newElm;
        });
        setchartData(result);
        break;
      case AREA.성북구.name:
        result = chartData.map((el: ChartDataType) => {
          const newElm = { ...el };
          if (el.id === AREA.성북구.value) {
            newElm.backgroundColor = CHARTITEM_COLOR.bar.focus;
          } else {
            newElm.backgroundColor = CHARTITEM_COLOR.bar.default;
          }
          return newElm;
        });
        setchartData(result);
        break;
      case AREA.중랑구.name:
        result = chartData.map((el: ChartDataType) => {
          const newElm = { ...el };
          if (el.id === AREA.중랑구.value) {
            newElm.backgroundColor = CHARTITEM_COLOR.bar.focus;
          } else {
            newElm.backgroundColor = CHARTITEM_COLOR.bar.default;
          }
          return newElm;
        });
        setchartData(result);
        break;
      default:
        return chartData;
    }
  };

  return (
    <ChartLayout>
      {isLoading ? (
        <SpinnerOverlay>
          <SpinnerContainer />
        </SpinnerOverlay>
      ) : (
        <>
          <ButtonContainer>
            <AreaButton
              onClick={onClickAreaButton}
              type={"button"}
              name={AREA.default.name}
              value={AREA.default.value}
            />
            <AreaButton
              onClick={onClickAreaButton}
              type={"button"}
              name={AREA.중랑구.name}
              value={AREA.중랑구.value}
            />
            <AreaButton
              onClick={onClickAreaButton}
              type={"button"}
              name={AREA.강남구.name}
              value={AREA.강남구.value}
            />
            <AreaButton
              onClick={onClickAreaButton}
              type={"button"}
              name={AREA.노원구.name}
              value={AREA.노원구.value}
            />
            <AreaButton
              onClick={onClickAreaButton}
              type={"button"}
              name={AREA.성북구.name}
              value={AREA.성북구.value}
            />
          </ButtonContainer>
          <div style={{ width: "1000px", height: "500px" }}>
            <Chart
              ref={chartRef}
              type="line"
              onClick={onClickCanvas}
              options={options}
              data={data}
              updateMode={"none"}
            />
          </div>
        </>
      )}
    </ChartLayout>
  );
};

export default ChartComponent;

// chart options
const options: any = {
  scales: {
    x: {
      title: {
        type: "linear" as const,
        display: true,
        text: "Time",
        font: {
          family: "Times",
          size: 20,
          style: "normal",
          lineHeight: 1.2,
        },
      },
      beginAtZero: false,
      ticks: {
        callback: function (this: any, index: number): any {
          if ((index - 1) % 7 === 0) {
            return this.chart.data.labels[index];
          } else if (index === 0) {
            return "";
          }
        },
        // maxTicksLimit: 15,
      },
    },
    y: {
      type: "linear" as const,
      display: true,
      position: "left" as const,
      beginAtZero: true,
      min: 0,
      max: 200,
      ticks: {
        stepSize: 50,
      },
      title: {
        display: true,
        text: CHARTITEM_COLOR.line.name,
        color: CHARTITEM_COLOR.line.default,
        font: {
          family: "Times",
          size: 20,
          style: "normal",
          lineHeight: 1.2,
        },
        padding: { top: 30, left: 0, right: 0, bottom: 0 },
      },
    },
    y1: {
      type: "linear" as const,
      display: true,
      position: "right" as const,
      beginAtZero: true,
      mmin: 0,
      max: 20000,
      ticks: {
        stepSize: 5000,
      },
      grid: {
        drawOnChartArea: false,
      },
      title: {
        display: true,
        text: CHARTITEM_COLOR.bar.name,
        color: CHARTITEM_COLOR.bar.default,
        font: {
          family: "Times",
          size: 20,
          style: "normal",
          lineHeight: 1.2,
        },
        padding: { top: 30, left: 0, right: 0, bottom: 0 },
      },
    },
  },
  responsive: true,
  interaction: {
    mode: "index" as const,
    intersect: false,
  },
  stacked: false,
  pointStyle: false,
  plugins: {
    legend: {
      position: "top" as const,
      labels: {
        generateLabels: function () {
          return [
            {
              text: CHARTITEM_COLOR.line.name,
              fillStyle: CHARTITEM_COLOR.line.default,
              fontColor: CHARTITEM_COLOR.line.default,
              lineWidth: 0,
            },
            {
              text: CHARTITEM_COLOR.bar.name,
              fillStyle: CHARTITEM_COLOR.bar.default,
              fontColor: CHARTITEM_COLOR.bar.focus,
              lineWidth: 0,
            },
          ];
        },
      },
    },
    title: {
      display: true,
      text: "Chart",
    },
    tooltip: {
      callbacks: {
        beforeTitle: (tooltipItems: any) => {
          return tooltipItems[0].dataset.data[tooltipItems[0].dataIndex].id;
        },
        title: (): string | void | string[] => {
          return "";
        },
      },
    },
  },
};

// Styles

const ChartLayout = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
const ButtonContainer = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  width: 1000px;
  margin-left: 100px;
`;

const AreaButton = styled.input`
  width: 70px;
  height: 30px;
  border-radius: 15px;
  border: 1px solid black;
  color: black;
  background-color: white;
  font-size: 12px;
  margin-left: 10px;
  padding: 3px;
  text-align: center;
  &:active {
    background-color: lightgray;
  }
`;
