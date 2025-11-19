import './style.css'
import * as d3 from 'd3'

const data = [
    {
        "rank": 1,
        "city": "Tokyo",
        "country": "Japan",
        "population": 37036200
    },
    {
        "rank": 2,
        "city": "Delhi",
        "country": "India",
        "population": 34665600
    },
    {
        "rank": 3,
        "city": "Shanghai",
        "country": "China",
        "population": 30482100
    },
    {
        "rank": 4,
        "city": "Dhaka",
        "country": "Bangladesh",
        "population": 24652900
    },
    {
        "rank": 5,
        "city": "Cairo",
        "country": "Egypt",
        "population": 23074200
    },
    {
        "rank": 6,
        "city": "Sao Paulo",
        "country": "Brazil",
        "population": 22990000
    },
    {
        "rank": 7,
        "city": "Mexico City",
        "country": "Mexico",
        "population": 22752400
    },
    {
        "rank": 8,
        "city": "Beijing",
        "country": "China",
        "population": 22596500
    },
    {
        "rank": 9,
        "city": "Mumbai",
        "country": "India",
        "population": 21356500
    },
    {
        "rank": 10,
        "city": "Osaka",
        "country": "Japan",
        "population": 19031500
    }
]


const margin =  { top: 50, right: 50, bottom: 50,  left: 50}
const outerHeight = window.innerHeight
const innerHeight = window.innerHeight - margin.bottom - margin.top
const outerWidth = window.innerWidth
const innerWidth = window.innerWidth - margin.left - margin.right

const svg = d3
    .select('body')
    .append('svg')
    .attr('width', outerWidth)
    .attr('height', outerHeight)

const g = svg
    .append('g')
    .attr('width', innerWidth)
    .attr('height', innerHeight)
    .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');

g.append('rect').attr('width', 50)
    .attr('height', 50).attr('fill', 'steelblue')



const yScale = d3.scaleBand()
    .range([innerHeight, 0])
    .domain(data.map(i => i.city))
    .padding(0.2);

const xScale = d3
    .scaleLinear()
    .range([0, innerWidth])
    .domain([0, 40000000]) ;

//
// g
//     .selectAll('.bar')
//     .data(data)
//     .append('rect')
//     .enter()
//     .attr('class', 'bar')
//     .attr('x', d => 0)
//     .attr('y', d => 0)
//     .attr('width', d => xScale(d.population))
//     .attr('height', yScale.bandwidth())
//     .attr('fill', 'steelblue');






console.log(svg)