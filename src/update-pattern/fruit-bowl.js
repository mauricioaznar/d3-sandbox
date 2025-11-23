import * as d3 from 'd3'
const colorScale = d3.scaleOrdinal()
    .range(['#5C0C31', '#1B5C0C'])
    .domain(['apple', 'lemon'])

const radiusScale = d3.scaleOrdinal()
    .range([17, 30])
    .domain(['lemon', 'apple'])

export function fruitBowl (selection, { fruits }) {
    const circles = selection
        .selectAll('circle')
        .data(fruits, d => d.id)

    circles.enter()
        .append('circle')
        .attr('cx', (d, i) => (i * 100) + 60)
        .attr('cy', 90)
        .attr('r', 0)
        .attr('fill', function (d){ return colorScale(d.type)})


    circles
        .attr('fill', function (d){ return colorScale(d.type)})
        .transition().duration(1000)
        .attr('cx', (d, i) => (i * 100) + 60)
        .attr('r', function(d) { return radiusScale(d.type)} )

    circles.exit().transition().duration(1000).attr('r', 0).remove()

}