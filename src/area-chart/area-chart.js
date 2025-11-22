import '../style.css'
import * as d3 from 'd3'
import myData from './Merida-Population-Total-Population.csv'

function render (data) {

    const margin =  { top: 100, right: 50, bottom: 120,  left: 280}
    const outerHeight = window.innerHeight
    const innerHeight = window.innerHeight - margin.bottom - margin.top
    const outerWidth = window.innerWidth - 100
    const innerWidth = window.innerWidth - margin.left - margin.right - 50

    const svg = d3
        .select('body')
        .append('svg')
        .attr('width', outerWidth)
        .attr('height', outerHeight)
        .attr('margin-top', '120')

    const yValue = d => d.temperature
    const xValue = d => d.time
    const yLabel = 'People'
    const xLabel = 'Year'
    const title = 'Mérida\'s Population'

    const g = svg
        .append('g')
        .attr('width', innerWidth)
        .attr('height', innerHeight)
        .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');

    const yScale = d3.scaleLinear()
        .range([innerHeight, 0])
        .domain([0, d3.max(data, yValue)])
        .nice();

    const xScale = d3
        .scaleTime()
        .range([0, innerWidth])
        .domain(d3.extent(data, xValue))
        .nice();


    const areaGenerator = d3
        .area()
        .x(d => xScale(xValue(d)))
        .y0(d => innerHeight)
        .y1(d => yScale(yValue(d)))
        .curve(d3.curveBasis)

    g
        .selectAll('.line-path')
        .data(data)
        .enter()
        .append('path')
        .attr('class', 'line-path')
        .attr('d', areaGenerator(data))
        .attr('stroke', 'none')
        .attr('fill', '#2F4F4F')
        .attr('stroke-width', 5)
        .attr('stroke-linejoin', 'round')
        .attr('opacity', '0.3');


    const xGroup = g
        .append('g')
        .attr('transform', 'translate(0,' + innerHeight + ')')
    const yGroup = g
        .append('g');




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
        .attr('y', -200)
        .attr('x', -innerHeight / 2)
        .attr('transform', "rotate(-90)")

    xGroup
        .append('text')
        .attr('class','title')
        .attr('x', innerWidth / 2)
        .text(title)
        .attr('y', -innerHeight - 30)

}


render(myData.map(d => {
    return {
        ...d,
        time: new Date(d.year),
        temperature: Number(d.population),
    }
}))