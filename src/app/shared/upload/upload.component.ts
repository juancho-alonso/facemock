import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { FormGroup, FormControl, Validators} from '@angular/forms';


@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.scss']
})
export class UploadComponent implements OnInit {
  
  myFiles:string [] = [];

  myForm = new FormGroup({
   name: new FormControl('', [Validators.required, Validators.minLength(3)]),
   file: new FormControl('', [Validators.required])
 });

 constructor(private http: HttpClient) { }

 get f(){
   return this.myForm.controls;
 }

 onFileChange(event) {

       for (var i = 0; i < event.target.files.length; i++) { 
           this.myFiles.push(event.target.files[i]);
       }
 }

 submit(){
   const formData = new FormData();

   for (var i = 0; i < this.myFiles.length; i++) { 
     formData.append("file[]", this.myFiles[i]);
   }

   this.http.post('http://localhost:8001/uploads.php', formData)
     .subscribe(res => {
       console.log(res);
       alert('Uploaded Successfully.');
     })
 }
  
 
  ngOnInit(): void {
  }

}
