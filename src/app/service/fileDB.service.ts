import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Node } from '../models/Node';
import { Observable } from 'rxjs';
@Injectable({
    providedIn: 'root'
})

export class FileDBService {
    inputFolder: string = '/assets/inputData/';

    constructor(private http: HttpClient){}

    // loads the specified file from src/assets/inputData and assumes it to be json.
    loadFile(fileName: string): Observable<Node[]>{
        const headers = new HttpHeaders({ 'Content-Type': 'application/json' })
        let nodes = this.http.get<Node[]>(this.inputFolder+fileName, { headers });
        return nodes;
    }
}