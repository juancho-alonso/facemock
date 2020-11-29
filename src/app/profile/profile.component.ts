import { Component, OnInit, Inject, Input } from '@angular/core';
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


  // Route name variable
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
  // Add a friend card boolean
  showAddFriendCard:boolean = false;
  // Side column boolean
  showCol:boolean;
  

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
    // Recall functions to subscribe to route changes
    this.recallFunctions();
    // Parse url
    this.parseUrl();
    // Get image details using the file service
    this.fileService.getImageDetailList();
    // Assign profile and cover images
    this.assignImages();
    // Assign avatars to users
    this.assignAvatars();
    // Hides the add friend card if the current user is already a friend of that user
    this.hideAddFriendCard();
    // Scrolls to the top
    window.scrollTo(0, 0);
  }

  parseUrl(){
    // Takes the url name
    this.routeName = this.route.snapshot.params['name'];
    // Splits the url in two strings, divided by the dot
    var urlSplit = this.routeName.split(".")
    // Adds a space in between the name and the surname of the url
    urlSplit.splice(1, 0, ' ')
    // Joins the first name and surname into a single string
    this.profileUrl = urlSplit.join('')
  }

  onComment(message){
    // Assigns the comment message to the var 'userComment'
    this.userComment = message;
  }

  assignImages(){
    // Checks if the current url corresponds to the current user or to some other user
    if (this.profileUrl == this.currentUser.firstname + " " + this.currentUser.surname) {
      // Assigns the 'curProfile' to the current user
      this.curProfile = this.currentUser;
    } else {
      // Assigns the 'curProfile' to some other user
      for (let i = 0; i < this.usersList.users.length; i++) {
        // Loops over the users list and assigns the current user to 'curProfile'
       if (this.usersList.users[i].firstname + " " + this.usersList.users[i].surname == this.profileUrl) {
        this.curProfile = this.usersList.users[i];
       }    
      }
    }

    for (let i = 0; i < this.usersList.users.length; i++) {
      // Loops over the list of users to assign the corresponding profile and cover pictures, stored in 'assets'
      if (this.profileUrl == `${this.usersList.users[i].firstname} ${this.usersList.users[i].surname}`) {
        // Assigns the pictures to users other than the current user
        this.profilePic = "../../assets/" + this.usersList.users[i].firstname + this.usersList.users[i].surname + "/profile.jpg"
        this.coverPic = "../../assets/" + this.usersList.users[i].firstname + this.usersList.users[i].surname + "/cover.jpg"
        return
      } else {
        // Assigns default pictures to the current user
        this.profilePic = "../../assets/avatar-anonym.jpg"
        this.coverPic = "../../assets/skyline.jpg"
      } 
    }

  }

  assignAvatars(){
    //Go through current friends array
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

  showColumn(toggle){
    this.showCol = toggle;
  }
}
