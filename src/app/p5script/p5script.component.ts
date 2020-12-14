import { Component, Input, OnInit } from '@angular/core';
import { stringToKeyValue } from '@angular/flex-layout/extended/typings/style/style-transforms';
import p5 from '../../scripts/p5';
import { ProcessedNode } from '../models/Node';
@Component({
  selector: 'app-p5script',
  templateUrl: './p5script.component.html',
  styleUrls: ['./p5script.component.css']
})
export class P5scriptComponent implements OnInit {

  private p5canvas;

  constructor() { }

  ngOnInit(): void {
    this.createCanvas();
  }

  private createCanvas() {
    this.p5canvas = new p5(this.sketch);
  }

  @Input() Mn: ProcessedNode[];
  @Input() Md: ProcessedNode[];


  private sketch = (p: any) => {

    let magnifier = 5;

    p.setup = () => {
      let canvas = p.createCanvas(800, 600);
      canvas.parent("canvasParent");
      p.textAlign(p.CENTER);
      console.log(this.Mn);
    };
    
    p.draw = () => {
      p.clear()
      p.translate(200, 0);
      p.background(255);
      for (let n of this.Mn){
        p.drawNodeN(n);
      }
      for (let n of this.Md){
        p.drawNodeD(n);
      }
    };

    p.drawNodeN = (node) => {
      p.stroke(0, 150, 0);
      p.text(node.name, node.x*magnifier, node.y*magnifier);
    }

    p.drawNodeD = (node) => {
      p.stroke(0, 0, 150);
      p.text(node.name+"("+parseFloat(node.distance).toFixed(1)+")", node.x*magnifier, node.y*magnifier);
    }
  }

}
