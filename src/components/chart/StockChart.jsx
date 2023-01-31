import React from "react";

import Chart from "./Chart";

export default function StockChart(props) {
  const { data } = props;
  const chart_width = 500;
  const chart_height = 300;

  return (
    <div>
      <div>
        <div>
          {data && <Chart data={data} width={chart_width} height={chart_height} />}
        </div>
      </div>
    </div>
  );
}
