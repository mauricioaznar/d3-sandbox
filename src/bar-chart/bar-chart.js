import '../style.css'
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


const margin =  { top: 150, right: 100, bottom: 150,  left: 300}
const outerHeight = window.innerHeight
const innerHeight = window.innerHeight - margin.bottom - margin.top
const outerWidth = window.innerWidth - 100
const innerWidth = window.innerWidth - margin.left - margin.right - 50

const svg = d3
    .select('body')
    .append('svg')
    .attr('width', outerWidth)
    .attr('height', outerHeight)

const yValue = d => d.city
const xValue = d => d.population
const title = 'Cities vs Population'

const g = svg
    .append('g')
    .attr('width', innerWidth)
    .attr('height', innerHeight)
    .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');

const yScale = d3.scaleBand()
    .range([0, innerHeight])
    .domain(data.map(yValue))
    .padding(0.2);

const xScale = d3
    .scaleLinear()
    .range([0, innerWidth])
    .domain([0, 42000000]).nice() ;

const xGroup = g.append('g').attr('transform', 'translate(0,' + innerHeight + ')')
const yGroup = g.append('g');

const xAxis = d3.axisBottom()
    .scale(xScale)
    .tickFormat(n => d3.format('.2s')(n))
    .tickSize(-innerHeight)
const yAxis = d3.axisLeft()
    .scale(yScale);


xGroup.call(xAxis).selectAll('.domain').remove()
yGroup.call(yAxis).selectAll('.domain, .tick line').remove();

xGroup
    .append('text')
    .attr('class','subtitle')
    .text('Population')
    .attr('x', innerWidth / 2)
    .attr('y', 100);

yGroup
    .append('text')
    .attr('class','subtitle')
    .text('Cities')
    .attr('y', -220)
    .attr('x', -innerHeight / 2)
    .attr('transform', "rotate(-90)")

xGroup
    .append('text')
    .attr('class','title')
    .attr('x', innerWidth / 2)
    .text(title)
    .attr('y', -innerHeight - 50)

g
    .selectAll('.bar')
    .data(data)
    .enter()
    .append('rect')
    .attr('class', 'bar')
    .attr('y', d => yScale(yValue(d)))
    .attr('width', d => xScale(xValue(d)))
    .attr('height', yScale.bandwidth())
    .attr('fill', 'steelblue');
