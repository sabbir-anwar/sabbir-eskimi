import { Component, OnInit } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {getHost} from '../config';
import sort from 'fast-sort';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  
  itemdetail=null;
  //data
  data=<any>[];
  numberOfpages=0;
  pages=[];
  numberOfItemsPerPage=25;
  currentPage=0 ;
  currentPageData=[];
  selectedItemIndex=-1;

  sortBy='id';
  sortOrder='asc';
  constructor(private http:HttpClient) { }

  
 
  ngOnInit() {
    this.getAllData();
   
  }

  changeSortProperty(property)
  {
    console.log(this.sortBy+"-----"+property);
    if( this.sortBy!=property)
    {
      this.sortBy=property;
      this.sortOrder = 'asc';

      if(this.sortBy == 'id')
      {
        this.sortByIdAsc();
      }
      else if(this.sortBy == 'name')
      {
         this.sortByNameAsc();
      }
      else if(this.sortBy == 'lan')
      {
        this.sortByLanguageAsc(); 
      }
      else if(this.sortBy == 'type')
      {
         this.sortByTypeAsc();
      }
      else if(this.sortBy == 'rating')
      {
         this.sortByRatingAsc();
      }
      
    }
    else
   {
     console.log("I am here");
     if(this.sortOrder =='asc')
     {
         this.sortOrder='desc';
         if(this.sortBy == 'id')
      {
        this.sortByIdDesc();
      }
      else if(this.sortBy == 'name')
      {
       
         this.sortByNameDesc();
      }
      else if(this.sortBy == 'lan')
      {
         console.log("Des");
        this.sortBylanguageDesc(); 
      }
      else if(this.sortBy == 'type')
      {
         this.sortByTypeDesc();
      }
      else if(this.sortBy == 'rating')
      {
         this.sortByRatingDesc();
      }
     }
     else
     {
       this.sortOrder='asc';
       if(this.sortBy == 'id')
      {
        this.sortByIdAsc();
      }
      else if(this.sortBy == 'name')
      {
         this.sortByNameAsc();
      }
      else if(this.sortBy == 'lan')
      {
        this.sortByLanguageAsc(); 
      }
      else if(this.sortBy == 'type')
      {
         this.sortByTypeAsc();
      }
      else if(this.sortBy == 'rating')
      {
         this.sortByRatingAsc();
      } 
     }
   }
   this.fetchCurrentPagedata();

  }
  
  getAllData()
  {
   this.http.get(getHost()).subscribe( (response) =>{
     this.data=response; 
     this.countNumberOfPages();
     this.fetchCurrentPagedata();
   });
  }
  countNumberOfPages()
  {
    this.numberOfpages = this.data.length/this.numberOfItemsPerPage;

    for(let c=1;c<=this.numberOfpages;c++)
    {
     this.pages.push(c);
    }
  }
  fetchCurrentPagedata()
  {
    let cursor=this.currentPage*this.numberOfItemsPerPage;
    let index=0;
    for(let c=cursor;c<cursor+this.numberOfItemsPerPage;c++)
    {
      if(c>=this.data.length) break;
      this.currentPageData[index]=this.data[c];
      index++;
    }
  }
  onPagenationBtnClick(number)
  {
    this.currentPage=parseInt(number)-1;
    this.fetchCurrentPagedata();

  }
  next()
  {
    
   this.currentPage=this.currentPage+1;
    if(this.currentPage>=this.numberOfpages)
    {
      this.currentPage=0;
    }
    console.log(this.currentPage);
    this.fetchCurrentPagedata();
  }
  prev()
  {
    this.currentPage=this.currentPage-1;
    if(this.currentPage<0)
    {
      this.currentPage=this.numberOfpages-1;
    }
    this.fetchCurrentPagedata();

  }

  sortByIdDesc()
  {
    sort(this.data).desc(d=>d.id);
    
  }
  sortByIdAsc()
  {
    sort(this.data).asc(d=>d.id);
   
  }

  sortByNameDesc()
  {
    sort(this.data).desc(d=>d.name);
    
  }
  sortByNameAsc()
  {
    sort(this.data).asc(d=>d.name);
   
  }

  sortBylanguageDesc()
  {
    sort(this.data).desc(d=>d.language);
  
  }
  sortByLanguageAsc()
  {
    sort(this.data).asc(d=>d.language);
    
  }
  sortByTypeDesc()
  {
    sort(this.data).desc(d=>d.type);
   
  }
  sortByTypeAsc()
  {
    sort(this.data).asc(d=>d.type);
    
  }
  sortByRatingDesc()
  {
    sort(this.data).desc(d=>d.rating.average);
    
  }
  sortByRatingAsc()
  {
    sort(this.data).asc(d=>d.rating.average);
    
  }
  onSelectItem(id)
  {
    this.selectedItemIndex=parseInt(id);
  }
  seeDetailView(item) {
    this.itemdetail=item;
    console.log("seedetailview"+item);
    console.log(item);
  }

  cancel(){
    this.itemdetail = null;
  }
}
