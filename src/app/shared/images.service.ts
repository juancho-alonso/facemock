import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';

@Injectable({
    providedIn: 'root'
})

export class ImagesService {

    constructor(private firebase: AngularFireDatabase){
        
    }
    imageDetailList:AngularFireList<any>;
   

    getImageDetailList(){
        this.imageDetailList = this.firebase.list('imageDetails');
    }

    insertImageDetails(imageDetails){
        this.imageDetailList.push(imageDetails);
        console.log("DATABASE " + this.imageDetailList)
    }
}