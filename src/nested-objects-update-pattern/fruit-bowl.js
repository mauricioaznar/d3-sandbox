import * as d3 from 'd3'
const colorScale = d3.scaleOrdinal()
    .range(['#5C0C31', '#1B5C0C'])
    .domain(['apple', 'lemon'])

const radiusScale = d3.scaleOrdinal()
    .range([17, 30])
    .domain(['lemon', 'apple'])

export function fruitBowl (selection, { fruits }) {
    const selectionGroup = selection
        .selectAll('g')
        .data(fruits)

    const selectionGroupEnter = selectionGroup.enter().append('g')


    selectionGroupEnter
        .append('circle')
        .merge(selectionGroup.select('circle'))
        .attr('cx', (d, i) => (i * 100) + 60)
        .attr('cy', 90)
        .attr('r', 0)
        .attr('fill', function (d){ return colorScale(d.type)})
        .transition().duration(1000)
        .attr('cx', (d, i) => (i * 100) + 60)
        .attr('r', function(d) { return radiusScale(d.type)} )

    selectionGroup.exit().remove()

}