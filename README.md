## 기능 설명

### 사용한 차트 라이브러리

- react-chartjs-2 사용
- Example이 리액트 컴포넌트 형태로 되어 있어서 그대로 사용하거나 커스터마이징이 편리해서 선택했습니다.

### 기능 설명

- changeDataForm 함수를 이용해서 서버에서 받아온 데이터를 가공했습니다.
- 반복적으로 사용하는 상수는 CHARTITEM_COLOR 등의 객체로 관리하여 오류 발생 가능성을 줄였습니다.
- 필요에 따라 커스텀 타입을 만들어 사용했습니다 e.g. ChartDataType
- 오른쪽 상단의 지역 이름으로 만들어진 버튼을 클릭하면 해당 지역의 데이터만 필터링하여 Bar 차트의 색상을 변경하였습니다

```javascript
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
        /* 생략 */
    }

    return (
        /* 생략 */
        <AreaButton
              onClick={onClickAreaButton}
              type={"button"}
              name={AREA.default.name}
              value={AREA.default.value}
            />
    )
```

- 그래프 캔버스 내부의 Area를 클릭하면 해당 Area와 지역 이름이 일치하는 데이터가 필터링되어 Bar 차트의 색상이 변경됩니다.

```javascript
const onClickCanvas = (event: MouseEvent<HTMLCanvasElement>) => {
  const { current: chart } = chartRef;
  if (!chart) {
    return;
  }
  changeBackgroundColor(getElementAtEvent(chart, event));
};

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
```

- 요구사항에 맞춰 툴팁과 x축, y축, y1축을 커스터마이징 했습니다.
