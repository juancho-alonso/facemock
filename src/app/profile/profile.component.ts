import { Component, OnInit, Inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UsersService } from '../users.service';
import { AngularFireStorage } from '@angular/fire/storage';
import { UploadingService } from '../shared/uploading.service';
import { finalize } from "rxjs/operators";


@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
  providers: [UsersService, UploadingService]
})
export class ProfileComponent implements OnInit {

  name:any;
  userComment:any;
  userRouteName:any;
  profileUrl:any;
  curProfile:any;
  currentUser = JSON.parse(localStorage.getItem('curUser'));
  selectedImage: any = null;
  url:string;
  id:string;
  file:string;
  profilePic:any;
  coverPic:any;
 


  constructor(private route: ActivatedRoute,
              public usersList:UsersService, 
              @Inject(AngularFireStorage) private storage: AngularFireStorage,
              @Inject(UploadingService) private fileService: UploadingService) { }

  ngOnInit(): void {
    this.fileService.getImageDetailList();
    this.name = this.route.snapshot.params['name'];
    var url = window.location.href;
    var changedUrl = url.substring(url.lastIndexOf('/') + 1)
    var urlSplit = changedUrl.split(".")
    urlSplit.splice(1, 0, ' ')
    this.profileUrl = urlSplit.join('')
    if (this.profileUrl == this.currentUser.firstname + " " + this.currentUser.surname) {
      this.curProfile = this.currentUser;
    } else {
      for (let i = 0; i < this.usersList.users.length; i++) {
       if (this.usersList.users[i].firstname + " " + this.usersList.users[i].surname == this.profileUrl) {
        this.curProfile = this.usersList.users[i];
       }    
      }
    }


    for (let i = 0; i < this.usersList.users.length; i++) {
      if (this.profileUrl == `${this.usersList.users[i].firstname} ${this.usersList.users[i].surname}`) {
        this.profilePic = "../../assets/" + this.usersList.users[i].firstname + this.usersList.users[i].surname + "/profile.jpg"
        this.coverPic = "../../assets/" + this.usersList.users[i].firstname + this.usersList.users[i].surname + "/cover.jpg"
        return
      } else {
        this.profilePic = "../../assets/avatar-anonym.jpg"
        this.coverPic = "../../assets/avatar-anonym.jpg"
      } 
    }

  }

  onComment(message){
    this.userComment = message;
  }

  showPreview(event: any) {
    this.selectedImage = event.target.files[0];
    var dataId = event.target.dataset.id;
    this.save(dataId);
    setTimeout(() => {
      this.view(dataId)
    }, 5000);    
  }

  save(id) {
    var name = this.selectedImage.name;
    var filePath = `${this.currentUser.firstname}${this.currentUser.surname}/${name.split('.').slice(0, -1).join('.')}_${new Date().getTime()}`

    const fileRef = this.storage.ref(filePath);
    this.storage.upload(filePath, this.selectedImage).snapshotChanges().pipe(
      finalize(() => {
        fileRef.getDownloadURL().subscribe((url) => {
          this.url = url;
          this.fileService.insertImageDetails(id,this.url);
          alert('Upload Successful');
        })
      })
    ).subscribe();
  }

  view(id){
    if (id == 'profile' && this.url != undefined) {
      this.profilePic = this.url;
    } else if (id === 'cover') {
      this.coverPic = this.url
    }
  }
  
}
