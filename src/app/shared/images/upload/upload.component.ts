import { Component, OnInit, Inject } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/storage';
import { finalize } from "rxjs/operators";
import { UploadingService } from '../../uploading.service';

@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.scss']
})
export class UploadComponent implements OnInit {
  
  selectedImage: any = null;
  url:string;
  id:string;
  file:string;
  currentUser = JSON.parse(localStorage.getItem('curUser'));


  constructor( @Inject(AngularFireStorage) private storage: AngularFireStorage, @Inject(UploadingService) private fileService: UploadingService) { }
  
  ngOnInit():void {
    this.fileService.getImageDetailList();
  }

  // Show image
  showPreview(event: any) {
    this.selectedImage = event.target.files[0];
    this.save();
  }

  // Upload image to database
  save() {
    var name = this.selectedImage.name;
    var filePath = `${this.currentUser.firstname}${this.currentUser.surname}/${name.split('.').slice(0, -1).join('.')}_${new Date().getTime()}`

    const fileRef = this.storage.ref(filePath);
    this.storage.upload(filePath, this.selectedImage).snapshotChanges().pipe(
      finalize(() => {
        fileRef.getDownloadURL().subscribe((url) => {
          this.url = url;
          this.fileService.insertImageDetails(this.id,this.url);
          alert('Upload Successful');
        })
      })
    ).subscribe();
  }

  // Get image from database
  view(){
    this.fileService.getImage(this.file);
  }
}
