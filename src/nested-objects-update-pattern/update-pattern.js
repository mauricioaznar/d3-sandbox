import * as d3 from 'd3'
import {fruitBowl} from "./fruit-bowl.js";
const makeFruit = type => {
    return {
        type,
        id: Math.random()
    }
}
const margin =  { top: 100, right: 0, bottom: 150,  left: 200}
const innerHeight = (window.innerHeight - margin.bottom - margin.top) / 3
const innerWidth = window.innerWidth - margin.left - margin.right - 50

let fruits = d3
    .range(5)
    .map((_, i) => makeFruit('apple'))

const svg = d3
    .select('body')
    .append('svg')
    .attr('width', innerWidth)
    .attr('height', innerHeight)


function render () {
    fruitBowl(svg, { fruits })
}

render()

setTimeout(function() {
    fruits[1].type = 'lemon'
    render()
}, 2000)


setTimeout(function() {
    fruits = fruits.filter((_, i) => i !== 0)
    render()
}, 4000)
