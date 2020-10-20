import { Component, OnInit, Inject } from '@angular/core';
import { ActivatedRoute, Router, NavigationStart, Event as NavigationEvent, Params, NavigationEnd } from '@angular/router';
import { UsersService } from '../users.service';
import { AngularFireStorage } from '@angular/fire/storage';
import { UploadingService } from '../shared/uploading.service';
import { filter, finalize } from "rxjs/operators";
import { UserContextService } from '../shared/user-context.service';


@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
  providers: [UsersService, UploadingService, UserContextService]
})
export class ProfileComponent implements OnInit {


  routeName:any;
  userComment:any;
  profileUrl:any;
  curProfile:any;
  currentUser = JSON.parse(localStorage.getItem('curUser'));
  selectedImage: any = null;
  url:string;
  id:string;
  file:string;
  profilePic:any;
  coverPic:any;
  curFriends = this.currentUser.friends 
  profilePicArr = [];
  currentFriend: any;
  showBtn:boolean = true;
  routerSubscription: any;
  showAddFriendCard:boolean = false;
  

  constructor(private route: ActivatedRoute,
              public router: Router,
              public usersList:UsersService,
              public userCtx: UserContextService, 
              @Inject(AngularFireStorage) private storage: AngularFireStorage,
              @Inject(UploadingService) private fileService: UploadingService) {
                  this.route.paramMap.subscribe(params => {
                    this.ngOnInit();
                });
               }

  ngOnInit(): void {
    this.recallFunctions();
    this.parseUrl();
    this.fileService.getImageDetailList();
    this.assignImages();
    this.assignAvatars();
    this.hideAddFriendCard();
    window.scrollTo(0, 0);
  }

  parseUrl(){
    this.routeName = this.route.snapshot.params['name'];
    var urlSplit = this.routeName.split(".")
    urlSplit.splice(1, 0, ' ')
    this.profileUrl = urlSplit.join('')
  }

  onComment(message){
    this.userComment = message;
  }

  assignImages(){
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

  assignAvatars(){
    //Go through current frineds array
    for (let i = 0; i < this.curFriends.length; i++) {
      //Passes array's elements one by one to the service
      this.currentFriend = this.userCtx.createProfilePic(this.curFriends[i]);
      this.profilePicArr.push(this.currentFriend)
    }
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
  
  hideProfileBtn(){
    if (this.profileUrl != `${this.currentUser.firstname} ${this.currentUser.surname}`) {
      this.showBtn = false;
    } else {
      this.showBtn = true;
    }
  }

  hideAddFriendCard() {
    if(!this.curFriends.includes(this.profileUrl)) {
      this.showAddFriendCard = true;
    } else {
      this.showAddFriendCard = false;
    }
  }

  recallFunctions() {
    this.routerSubscription = this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe(event => {
        this.hideProfileBtn();
        this.hideAddFriendCard();
      });
  }

  addFriend(){
    this.curFriends.push(this.profileUrl)
    var newUserFriends = this.currentUser
    localStorage.setItem("curUser", JSON.stringify(newUserFriends))
    this.showAddFriendCard = false;
  }
}
