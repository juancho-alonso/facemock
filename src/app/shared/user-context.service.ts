import { Injectable, Inject, RendererStyleFlags2 } from '@angular/core';
import { AngularFireList, AngularFireDatabase } from '@angular/fire/database';
import { UsersService } from '../users.service';


@Injectable({
  providedIn: 'root'
})

export class UserContextService {

    constructor(public usersList:UsersService, @Inject(AngularFireDatabase) private firebase: AngularFireDatabase){}

    profileUrl;
    curProfile;
    profilePic;
    profileAvatar;
    coverPic;
    currentUser = JSON.parse(localStorage.getItem('curUser'));

        
    parseUrl(url){
        // Transform url to string
        var changedUrl = url.substring(url.lastIndexOf('/') + 1);

        // Split url string by the dot
        var urlSplit = changedUrl.split(".");

        // Splice url string with a space
        urlSplit.splice(1, 0, ' ');

        // Join back the string and assign it to current profile
        this.profileUrl = urlSplit.join('');

        return this.profileUrl
    }

    detectProfile(currentUser){
        if (this.profileUrl == currentUser.firstname + " " + currentUser.surname) {
            this.curProfile = currentUser;
          } else {
            for (let i = 0; i < this.usersList.users.length; i++) {
             if (this.usersList.users[i].firstname + " " + this.usersList.users[i].surname == this.profileUrl) {
              this.curProfile = this.usersList.users[i];
             }    
            }
          }
        return this.curProfile;
    }

    createProfilePic(user){
        //Goes through users array
        for (let i = 0; i < this.usersList.users.length; i++) {
            //Checks if current user (in parameter) is equal to current user in array

            if (user == `${this.usersList.users[i].firstname} ${this.usersList.users[i].surname}`) {
                //Sets image url using current user in array
              var profilePic = "../../assets/" + this.usersList.users[i].firstname + this.usersList.users[i].surname + "/profile.jpg"
              return profilePic
             
            }
          }

          //Sets image url using placeholder avatar 
           var profileAvatar = "../../assets/avatar-anonym.jpg"  
             return profileAvatar
          
      
    }

    createCoverPic(user){
        var pic = [];
    }


}