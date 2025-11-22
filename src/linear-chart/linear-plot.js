import '../style.css'
import * as d3 from 'd3'
import myData from './merida-yuc-may-2024.csv'

function render (data) {

    console.log(data)

    const margin =  { top: 100, right: 50, bottom: 150,  left: 170}
    const outerHeight = window.innerHeight
    const innerHeight = window.innerHeight - margin.bottom - margin.top
    const outerWidth = window.innerWidth - 100
    const innerWidth = window.innerWidth - margin.left - margin.right - 50

    const svg = d3
        .select('body')
        .append('svg')
        .attr('width', outerWidth)
        .attr('height', outerHeight)

    const yValue = d => d.temperature
    const xValue = d => d.time
    const yLabel = 'Temperature'
    const xLabel = 'Time'
    const title = 'Yucatán temperature May 2024'

    const g = svg
        .append('g')
        .attr('width', innerWidth)
        .attr('height', innerHeight)
        .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');

    const yScale = d3.scaleLinear()
        .range([innerHeight, 0])
        .domain([d3.min(data, yValue), d3.max(data, yValue)])

    const xScale = d3
        .scaleTime()
        .range([0, innerWidth])
        .domain(d3.extent(data, xValue))

    const xGroup = g.append('g').attr('transform', 'translate(0,' + innerHeight + ')')
    const yGroup = g.append('g');

    const xAxis = d3.axisBottom()
        .scale(xScale)
        .tickSize(-innerHeight)
        .tickPadding(20)
        .ticks(6)
    const yAxis = d3.axisLeft()
        .scale(yScale)
        .tickSize(-innerWidth)
        .tickPadding(20)
    ;

    const lineGenerator = d3
        .line()
        .x(d => xScale(xValue(d)))
        .y(d => yScale(yValue(d)))
        .curve(d3.curveBasis)

    xGroup.call(xAxis).selectAll('.domain').remove()
    yGroup.call(yAxis).selectAll('.domain').remove();

    xGroup
        .append('text')
        .attr('class','subtitle')
        .text(xLabel)
        .attr('x', innerWidth / 2)
        .attr('y', 100);

    yGroup
        .append('text')
        .attr('class','subtitle')
        .text(yLabel)
        .style('text-anchor', 'middle')
        .attr('y', -100)
        .attr('x', -innerHeight / 2)
        .attr('transform', "rotate(-90)")

    xGroup
        .append('text')
        .attr('class','title')
        .attr('x', innerWidth / 2)
        .text(title)
        .attr('y', -innerHeight - 30)

    g
        .selectAll('.line-path')
        .data(data)
        .enter()
        .append('path')
        .attr('class', 'line-path')
        .attr('d', lineGenerator(data))
        .attr('stroke', 'mediumturquoise ')
        .attr('fill', 'none')
        .attr('stroke-width', 5)
        .attr('stroke-linejoin', 'round')
        .attr('opacity', '0.3');

}

/*
    acceleration: "12"
    "car name": "chevrolet chevelle malibu"
    cylinders: "8"
    displacement: "307"
    horsepower: "130"
    "model year": "70"
    mpg: "18"
    origin: "1"
    weight: "3504"
 */



render(myData.map(d => {
    return {
        ...d,
        time: new Date(d.time),
        temperature: Number(d.temperature),
    }
}))