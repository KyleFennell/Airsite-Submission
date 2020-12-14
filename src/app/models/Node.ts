export interface Node {
    name: string;
    x: number;
    y: number;
    connections: string[];
}

export interface ProcessedNode {
    name: string;
    x: number;
    y: number;
    connections: Connection[];
    distance?: number;
}

export interface Connection {
    name: string; 
    distance: number;
}