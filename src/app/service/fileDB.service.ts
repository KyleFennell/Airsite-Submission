import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Node } from '../models/Node';
@Injectable({
    providedIn: 'root'
})

export class FileDBService {
    inputFolder: string = '/assets/inputData/';

    constructor(private http: HttpClient){}

    loadFile(fileName: string){
        const headers = new HttpHeaders({ 'Content-Type': 'application/json' })
        let nodes = this.http.get(this.inputFolder+fileName, { headers });
        return [
            {
              "name": "Buckingham",
              "x": 36,
              "y": 34,
              "connections": ["Kings Point", "Icehouse Canyon", "Newtown"]
            },
          
            {
              "name": "Kings Point",
              "x": 26,
              "y": 76,
              "connections": ["Newtown"]
            },
            {
              "name": "Newtown",
              "x": 34,
              "y": 93,
              "connections": ["Kings Point", "Townsend"]
            },
            {
              "name": "Icehouse Canyon",
              "x": 17,
              "y": 21,
              "connections": ["Bucks Lake", "Townsend", "Buckingham"]
            },
            {
              "name": "Bucks Lake",
              "x": 10,
              "y": 14,
              "connections": ["Kealakekua", "Buckingham"]
            },
            {
              "name": "Kealakekua",
              "x": 41,
              "y": 24,
              "connections": ["Buckingham", "Icehouse Canyon"]
            },
            {
              "name": "Venice",
              "x": 11,
              "y": 37,
              "connections": ["Townsend", "Buckingham", "Zurich"]
            },
            {
              "name": "Townsend",
              "x": 10,
              "y": 36,
              "connections": ["Bucks Lake"]
            },
            {
              "name": "Zurich",
              "x": 23,
              "y": 44,
              "connections": ["Newtown"]
            }
          ];
    }
}