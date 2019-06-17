import { Component, OnInit } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {getHost} from '../config';
import {Router} from '@angular/router';

@Component({
  selector: 'app-data-list',
  templateUrl: './data-list.component.html',
  styleUrls: ['./data-list.component.css']
})
export class DataListComponent implements OnInit {

  items=null;
  itemdetail=null;
  constructor(private http:HttpClient,private router:Router) { }

  ngOnInit() {
    this.http.get(getHost()).subscribe((res)=>{
      console.log("res");
      console.log(res); 
      this.items=res;
    },(err)=>{
      console.log("error")
      console.log(err)
    }) 
  }

  seeDetailView(item) {
    this.itemdetail=item;
    console.log("seedetailview"+item);
    console.log(item);
}
}
