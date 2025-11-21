import '../style.css'
import * as d3 from 'd3'
import myData from './auto-mpg.csv'

function render (data) {

    console.log(data)

    const margin =  { top: 100, right: 50, bottom: 150,  left: 250}
    const outerHeight = window.innerHeight
    const innerHeight = window.innerHeight - margin.bottom - margin.top
    const outerWidth = window.innerWidth - 100
    const innerWidth = window.innerWidth - margin.left - margin.right - 50

    const svg = d3
        .select('body')
        .append('svg')
        .attr('width', outerWidth)
        .attr('height', outerHeight)

    const yValue = d => d.weight
    const xValue = d => d.mpg
    const xLabel = 'MPG'
    const yLabel = 'Weight'

    const g = svg
        .append('g')
        .attr('width', innerWidth)
        .attr('height', innerHeight)
        .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');

    const yScale = d3.scaleLinear()
        .range([innerHeight, 0])
        .domain(d3.extent(data, yValue))
        .nice();

    const xScale = d3
        .scaleLinear()
        .range([0, innerWidth])
        .domain(d3.extent(data, xValue))
        .nice() ;

    const xGroup = g.append('g').attr('transform', 'translate(0,' + innerHeight + ')')
    const yGroup = g.append('g');

    const xAxis = d3.axisBottom()
        .scale(xScale)
        .tickSize(-innerHeight)
        .tickPadding(20)
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
        .attr('y', 120);

    yGroup
        .append('text')
        .attr('class','subtitle')
        .text(yLabel)
        .attr('y', -150)
        .attr('x', -innerHeight / 2)
        .attr('transform', "rotate(-90)")

    g
        .selectAll('.circle')
        .data(data)
        .enter()
        .append('circle')
        .attr('class', 'circle')
        .attr('r', 10)
        .attr('cy', d => yScale(yValue(d)))
        .attr('cx', d => xScale(xValue(d)))
        .attr('fill', 'red')
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
        acceleration: Number(d.acceleration),
        cylinders: Number(d.cylinders),
        displacement: Number(d.displacement),
        horsepower: Number(d.horsepower),
        weight: Number(d.weight),
        origin: Number(d.origin),
        mpg: Number(d.mpg),
        year: Number(d['model year'])
    }
}))