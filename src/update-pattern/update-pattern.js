import * as d3 from 'd3'



function render () {
    const svg = d3
        .select('body').append('svg')
    svg
        .append('circle')
        .attr('cx', 30)
        .attr('cy', 30)
        .attr('r', 30)
        .attr('fill', 'red')
}

render()