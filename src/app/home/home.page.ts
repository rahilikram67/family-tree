import { Component, ElementRef, signal, ViewChild } from '@angular/core';
import * as d3 from 'd3';
@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  index = signal(0)
  svg!: d3.Selection<SVGSVGElement, unknown, HTMLElement, any>

  constructor() { }
  ngOnInit() {
    this.createGrid()
  }

  createGrid(): void {

    

    this.svg = d3.select(".grid")
      .append("svg")
      .attr("width", "100%")
      .attr("height", "100%");
    // Use setTimeout to delay the dimension calculations
    setTimeout(() => {
      const node = this.svg.node()!.getBoundingClientRect();
      const width = node.width;
      const height = node.height;
      const cellSize = 10;

      console.log(width, height); // Check the dimensions

      const rows = Math.ceil(height / cellSize);
      const cols = Math.ceil(width / cellSize);

      for (let i = 0; i < rows; i++) {
        for (let j = 0; j < cols; j++) {
          this.svg.append("rect")
            .attr("x", j * cellSize)
            .attr("y", i * cellSize)
            .attr("width", cellSize)
            .attr("height", cellSize)
            .attr("class","fill-white stroke-gray-400")
        }
      }
    },0); // Delay the execution by a few milliseconds to ensure DOM update
  }

  dragged(event: DragEvent) {
    // Move the SVG container by updating its transform attribute
    const x = event.x;
    const y = event.y;
    this.svg.attr("transform", `translate(${x}, ${y})`);
  }



}
