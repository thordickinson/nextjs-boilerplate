import React from 'react';
import ReactDOM from 'react-dom';
import ChartistGraph from 'react-chartist';


export default function Chartist() {

    //donut values
    const data = {
        labels: ['Lunes', 'Martes', 'Miercoles', 'Jueves', 'Viernes', 'Sabado', 'Domingo'],
        series: [20, 10, 30, 40, 10, 15, 6]
      };
  
      var options = {
        donut: true,
        donutWidth: 150,
        startAngle: 263,
        total: 150,
        height: 400
      };

    const type = 'Pie'

    //Bar & line values

    var dataLine = {
      labels: ['W1', 'W2', 'W3', 'W4', 'W5', 'W6', 'W7', 'W8', 'W9', 'W10'],
      series: [
        [1, 2, 4, 8, 6, -2, -1, -4, -6, -2]
      ]
    };

    var optionsLine = {
      width: 800,
      height:400,
      high: 10,
      low: -10,
      axisX: {
        labelInterpolationFnc: function(value, index) {
          return index % 1 === 0 ? value : null;
        }
      }
    };

    var typeLine = 'Bar'

    return (
      <>
        <div>
            <ChartistGraph className=".ct-chart" data={data} options={options} type={type}/>
        </div>
        <div>
          <ChartistGraph data={dataLine} options={optionsLine} type={typeLine} />
        </div>
        <div>
          <ChartistGraph data={dataLine} options={optionsLine} type="Line" />
        </div>
      </>
    )
}