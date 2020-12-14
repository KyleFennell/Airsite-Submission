import { Component, OnInit } from '@angular/core';

import { FileDBService } from './service/fileDB.service'
import { Node, ProcessedNode } from './models/Node'

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit {
	
	constructor(private fileService: FileDBService) { }
	
	ngOnInit(): void {
		this.onFileNameChange()
	}
	
	public params = {
		fileName: "nodes.js",
		station: "",
		distance: 0
	}
	
	private nodes: Node[] = [];
	private pNodes: ProcessedNode[] = [];
	public Mn: ProcessedNode[] = [];
	public Md: ProcessedNode[] = [];
	
	onFileNameChange(){
		let newNodes = this.fileService.loadFile(this.params.fileName)
		
		if (newNodes){
			this.nodes = newNodes;
			this.pNodes = this.nodes.map(node => {		// preprocessing distances
				let pConnections = [];
				for (let c of node.connections){
					let nodeC = this.nodes.find(node => {return node.name === c});
					pConnections.push({
						name: c,
						distance: this.dist(node.x, node.y, nodeC.x, nodeC.y)
					});
				}
				return {
					...node,
					connections: pConnections
				};
			});
		}
		else {
			//invalid file name
		}
		console.log(this.nodes);
		this.onStationNameChange();
		this.onDistanceChange();
	}
	
	onStationNameChange(){
		this.Mn = this.pNodes.filter(node => {return node.name.includes(this.params.station)});
		this.onDistanceChange();
	}
	
	onDistanceChange(){
		this.pNodes.forEach(node => {return node.distance = null}); //clear all distance values from previous run
		this.Md = [];
		let edgeNodes = [];
		for (let n of this.Mn){	
			//add all start nodes to the edge nodes array
			n.distance = 0;
			edgeNodes.push(n);
		}
		while (edgeNodes.length !== 0){
			let current:ProcessedNode = edgeNodes.pop();
			console.log("processing: " + current.name);
			for (let c of current.connections){
				console.log("connection: "+c);
				if (current.distance+c.distance < this.params.distance){
					// this node is within the correct distance
					let neighbour = this.pNodes.find(node => {return node.name == c.name});
					console.log(c.name+" "+neighbour);
					if (neighbour.distance == null || neighbour.distance > current.distance+c.distance){
						// this node doesn't have a distance or this new path is shorter than an old one
						neighbour.distance = current.distance+c.distance;
						//update distance
					}
					if (!edgeNodes.includes(neighbour) && !this.Md.includes(neighbour) && !this.Mn.includes(neighbour)){
						//if the neighbour isnt already in the edge nodes, add it
						edgeNodes.push(neighbour);
					}
				}
			}
			if (!this.Mn.includes(current)){
				this.Md.push(current);
			}
		}
	}
	
	private dist(x1, y1, x2, y2){
		let xDist = x1-x2;
		let yDist = y1-y2;
		return Math.sqrt(xDist*xDist + yDist*yDist);
	}
	
}
