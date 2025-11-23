import * as d3 from 'd3'
const colorScale = d3.scaleOrdinal()
    .range(['#5C0C31', '#1B5C0C'])
    .domain(['apple', 'lemon'])

const radiusScale = d3.scaleOrdinal()
    .range([17, 30])
    .domain(['lemon', 'apple'])

export function fruitBowl (selection, props) {
    const { fruits, height, width } = props;

    const bowl = selection.selectAll('rect')
        .data([null])
        .enter()
        .append('rect')
        .attr('y', 0)
        .attr('fill', '#eee')
        .attr('width', width)
        .attr('height', height)
        .attr('rx', 50)
        .attr('ry', 50);

    const groups = selection
        .selectAll('g')
        .data(fruits, (d, i) => { return d.id});

    const groupEnter = groups
        .enter()
        .append('g');

    groupEnter
        .merge(groups)
        .transition()
        .duration(1000)
        .attr(
            'transform',
            (d, i) => `translate(${i * 120 + 60},${height / 2})`,
        );

    groups
        .exit()
        .remove();

    groupEnter
        .append('circle')
        .attr('r', 0)
        .merge(groups.select('circle'))
        .attr('fill', (d) => colorScale(d.type))
        .transition()
        .duration(1000)
        .attr('r', (d) => radiusScale(d.type));

    groupEnter
        .append('text')
        .style('opacity', 0)
        .merge(groups.select('text'))
        .transition()
        .duration(1000)
        .style('opacity', 1)
        .text((d) => d.type)
        .attr('y', 80);
    ;

}