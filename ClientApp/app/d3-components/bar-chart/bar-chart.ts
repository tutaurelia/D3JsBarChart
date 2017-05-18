import { bindable } from "aurelia-framework";
import * as d3 from "d3";

export class BarChart {
  @bindable chartData: Array<any>;
  @bindable chartWidth: number;
  @bindable chartHeight: number;
  margin: any = { top: 20, bottom: 20, left: 40, right: 20 };
  chart: any;
  xScale: any;
  yScale: any;
  colors: any;
  xAxis: any;
  yAxis: any;
  plotArea: any;
  svg: any;
  isAttached = false;

  attached() {
    this.createChart();
    this.updateChart();
    this.isAttached = true;
  }

  chartDataChanged() {
    if (this.isAttached) {
      this.updateChart();
    }
  }

  createChart() {
    this.svg = d3.select("#chart").append("svg").attr("width", this.chartWidth).attr("height", this.chartHeight);

    //chart plot area
    this.plotArea = this.svg.append("g").attr("class", "bars")
      .attr("transform", `translate(${this.margin.left}, ${this.margin.top})`);

    //define X & Y domains
    const xDomain = this.chartData.map(d => d[0]);
    const yDomain = [0, d3.max(this.chartData, d => d[1])];

    //create scales
    this.xScale = d3.scaleBand().padding(0.1).domain(xDomain).range([0, this.chartWidth - this.margin.left]);
    this.yScale = d3.scaleLinear().domain(yDomain).range([this.chartHeight, 0]);

    //bar colors
    this.colors = d3.scaleLinear().domain([0, this.chartData.length]).range(<any[]>["orange", "green"]);

    //yaxis
    this.yAxis = this.svg.append("g").attr("class", "axis axis-y")
      .attr("transform", `translate(${this.margin.left} , ${-this.margin.bottom})`).call(d3.axisLeft(this.yScale));

    //xaxis
    this.xAxis = this.svg.append("g").attr("class", "axis axis-x")
      .attr("transform", `translate(${this.margin.left}, ${this.chartHeight - (this.margin.top)})`)
      .call(d3.axisBottom(this.xScale));
  }

  updateChart() {
    //update scales & axis
    this.xScale.domain(this.chartData.map(d => d[0]));
    this.yScale.domain([0, d3.max(this.chartData, d => d[1])]);
    this.colors.domain([0, this.chartData.length]);
    this.xAxis.transition().call(d3.axisBottom(this.xScale));
    this.yAxis.transition().call(d3.axisLeft(this.yScale));

    const update = this.plotArea.selectAll(".bar").data(this.chartData);

    //remove exiting bars
    update.exit().remove();

    //update existing bars
    const calcHeight = d => {
      let number = this.chartHeight - this.yScale(d[1]);
      if (number < 0) number = 0;
      return number;
    };

    this.plotArea.selectAll(".bar").transition()
      .attr("x", d => this.xScale(d[0]))
      .attr("y", d => this.yScale(d[1]) - (2 * this.margin.top)).attr("width", () => this.xScale.bandwidth())
      .attr("height", calcHeight).style("fill", (d, i) => this.colors(i));

    //add new bars
    update.enter().append("rect").attr("class", "bar")
      .attr("x", d => this.xScale(d[0]))
      .attr("y", d => this.yScale(d[1]))
      .attr("width", this.xScale.bandwidth())
      .attr("height", 0).style("fill", (d, i) => this.colors(i)).transition().delay((d, i) => i * 10)
      .attr("y", d => this.yScale(d[1]) - (2 * this.margin.top)).attr("height", calcHeight);
  }
}