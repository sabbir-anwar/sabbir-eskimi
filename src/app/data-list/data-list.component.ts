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

  items=<any>[];
  itemdetail=null;
  numberOfpages=0;
  pages=[];
  numberOfItemsPerPage=35;
  currentPage=0 ;
  currentPageData=[];
  selectedItemIndex=-1;

  constructor(private http:HttpClient,private router:Router) { }

  ngOnInit() {
    this.getAllItem();
  }

  getAllItem(){
    this.http.get(getHost()).subscribe((res)=>{
      console.log(res); 
      this.items=res;
      this.countNumberOfPages();
    });
  }
  countNumberOfPages()
  {
    this.numberOfpages = this.items.length/this.numberOfItemsPerPage;

    for(let c=1;c<this.numberOfpages;c++)
    {
     this.pages.push(c);
    }
  }
  fetchCurrentPageData(){
    let cursor = this.currentPage*this.numberOfItemsPerPage;
    let index = 0;
    for(let i=cursor;i<cursor+this.numberOfItemsPerPage;i++){
      if(i>=this.items.length) break;
      this.currentPageData[index] = this.items[i];
      index++;
    }
  }
  onPagenationBtnClick(number)
  {
    this.currentPage=parseInt(number)-1;
    this.fetchCurrentPageData();

  }
  next()
  {
    
   this.currentPage=this.currentPage+1;
    if(this.currentPage>=this.numberOfpages)
    {
      this.currentPage=0;
    }
    console.log(this.currentPage);
    this.fetchCurrentPageData();
  }
  prev(){
    this.currentPage=this.currentPage-1;
    if(this.currentPage<0){
      this.currentPage=this.numberOfpages-1;
    }
    this.fetchCurrentPageData();
  }
  seeDetailView(item) {
    this.itemdetail=item;
    console.log("seedetailview"+item);
    console.log(item);
  }
}
