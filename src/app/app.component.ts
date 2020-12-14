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

	public errors = {						// model for reporting errors to the UI
		file: null	
	}
	
	public params = {						// model for the html form
		fileName: "nodes.json",
		station: "",						// string to match against station names
		distance: 0							// cut off distance
	}

	public drawParams = {					// other parameters relating to rendering
		magnify: 3,							// allows zooming on data
		xOffset: 50,						// allows translation of the canvas
		yOffset: 50
	}
	
	private nodes: Node[] = [];				// list of nodes retrieved from the service
	private pNodes: ProcessedNode[] = [];	// nodes that have been processed (each connection has had it's distance calculated)
	public Mn: ProcessedNode[] = [];		// list of nodes containing the params.station string
	public Md: ProcessedNode[] = [];		// list of nodes within params.distance of the nodes in Mn excluding the nodes in Mn.
	
	onFileNameChange(){
		this.errors.file = null; //clear the file error
		this.fileService.loadFile(this.params.fileName).subscribe(nodes => {
			this.nodes = nodes;
			this.pNodes = this.nodes.map(node => {		// preprocessing distance from each node to its connections
				let pConnections = [];
				for (let c of node.connections){
					let nodeC = this.nodes.find(node => {return node.name === c});	// getting the full node from the connection name
					pConnections.push({
						name: c,
						distance: this.dist(node.x, node.y, nodeC.x, nodeC.y)		// calculating distance from current node to the connected node
					});
				}
				return {		// all the same information as the original node but with updated connections
					...node,
					connections: pConnections
				};
			});
			
			this.onStationNameChange();
			this.onDistanceChange();
		}, error => {		// if no file was found or something else went wrong
			this.errors.file = "file not found. Please select vaild .json from src/assets/inputData."
		});
	}
	
	onStationNameChange(){
		this.Mn = this.pNodes.filter(node => {return node.name.includes(this.params.station)});	// filter each station by its name
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
			for (let c of current.connections){
				if (current.distance+c.distance < this.params.distance){
					// this node is within the correct distance
					let neighbour = this.pNodes.find(node => {return node.name == c.name});
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
			if (!this.Mn.includes(current)){	// only add the final node to Md if it's not a starting point
				this.Md.push(current);
			}
		}
	}

	private clearErrors(){
		for (let e in this.errors){
			this.errors[e] = null;
		}
	}
	
	private dist(x1, y1, x2, y2){
		let xDist = x1-x2;
		let yDist = y1-y2;
		return Math.sqrt(xDist*xDist + yDist*yDist);
	}
	
}
