import { Injectable, Inject } from '@angular/core';
import { AngularFireList, AngularFireDatabase } from '@angular/fire/database';
@Injectable({
  providedIn: 'root'
})
export class UploadingService {

  // Image detail List for Firebase  
  imageDetailList: AngularFireList<any>;

  // Files array to be pushed to database
  fileList: any[];

  // Data Model
  dataSet: Data = {
    id:'',
    url:''
  };

  // Image (set to error by default)
  msg:string = 'error';


  constructor(@Inject(AngularFireDatabase) private firebase: AngularFireDatabase) { }

  // Retrieve image details from Firebase list
  getImageDetailList() {
    this.imageDetailList = this.firebase.list('imageDetails');
  }

  // Assign image details for Firebase list
  insertImageDetails(id,url) {
    this.dataSet = {
      id : id,
      url: url
    };
    // Push details to the model
    this.imageDetailList.push(this.dataSet);
  }


  // Get Image from List
  getImage(value){
    // Subscribe to details changes  
    this.imageDetailList.snapshotChanges().subscribe(
      list => {
        this.fileList = list.map(item => { return item.payload.val();  });
        this.fileList.forEach(element => {
          // Compare local value with img ID  
          if(element.id===value)
          // Assign element URL to this msg
          this.msg = element.url;
        });
        // Error Handling
        if(this.msg==='error')
        // No record found
          alert('No record found');
        else {
          //window.open(this.msg);
          console.log(this.msg)
          this.msg = 'error';
        }
      }
    );
  }
}

export interface Data{
  id:string;
  url:string;
}