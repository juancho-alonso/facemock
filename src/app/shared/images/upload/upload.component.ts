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

  showPreview(event: any) {
    this.selectedImage = event.target.files[0];
    this.save();
  }

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

  view(){
    this.fileService.getImage(this.file);
  }

//   formTemplate = new FormGroup({
//     imageUrl: new FormControl('', Validators.required)
//   })

//   currentUser = JSON.parse(localStorage.getItem('curUser'));
//   imgSrc:string = "../../../../assets/iconfriends.png";
//   isSubmitted:boolean;
//   selectedImage = null;

//  constructor(private storage: AngularFireStorage,
//             private service: ImagesService) { }

//  showPreview(event:any) {
//    console.log(event.target.files)
//    if (event.target.files && event.target.files[0]) {
//      const reader = new FileReader();
//      reader.onload = (e:any) => this.imgSrc = e.target.result;
//      reader.readAsDataURL(event.target.files[0]);
//      this.selectedImage = event.target.files[0];
//    } else {
//      this.selectedImage = null;
//    }
//  }

//  onSubmit(formValue) {
//    console.log("FORM VALUE" + formValue['imageUrl'] )
//    this.isSubmitted = true;
//    if (this.formTemplate.valid) {
//     var filePath = `${this.currentUser.firstname}${this.currentUser.surname}/${this.selectedImage.name.split('.').slice(0, -1).join('.')}_${new Date().getTime()}`
//     const fileRef = this.storage.ref(filePath);
//     this.storage.upload(filePath, this.selectedImage).snapshotChanges().pipe(
//       finalize(()=>{
//         fileRef.getDownloadURL().subscribe((url)=>{
//           formValue['imageUrl'] = url;
//           this.service.insertImageDetails(formValue);
//           this.resetForm();
//         })
//       })
//     ).subscribe();
//    }
//  }

//  get formControls(){
//    return this.formTemplate['controls'];
//  }

//  resetForm(){
//    this.formTemplate.reset();
//    this.formTemplate.setValue({
//      imageUrl:''
//    });
//    this.isSubmitted = false;
//    this.selectedImage = null;
//  }

// ---------------------- LAST CODE -----------------------------------


// image = document.createElement("img")

// img = new Image;

//  onFileSelected(event) {
//     // this.selectedFile = event.target.files[0];
//     // console.log(this.selectedFile)
//     // var reader:any  = new FileReader();
//     // // it's onload event and you forgot (parameters)
//     // reader.onload = function(e)  {
//     //     // the result image data
//     //     console.log(this.image)
//     //     this.image.src = e.target.result;
//     //     document.body.appendChild(this.image);
//     //  }
//     //  // you have to declare the file loading
//     //  reader.readAsDataURL(this.selectedFile);


//      var selectedFile = event.target.files[0];
//   var reader = new FileReader();

//   var imgtag:any = document.getElementById("myimage");
//   imgtag.title = selectedFile.name;

//   reader.onload = function(event) {
//     imgtag.src = event.target.result;
//   };

//   reader.readAsDataURL(selectedFile);

// //-----------------------------------------

//   var myImage:any = document.getElementById("myimage")

//     var imgCanvas = document.createElement("canvas"),
//         imgContext = imgCanvas.getContext("2d");

//     // Make sure canvas is as big as the picture
//     imgCanvas.width = myImage.width;
//     imgCanvas.height = myImage.height;

//     // Draw image into canvas element
//     imgContext.drawImage(myImage, 0, 0, myImage.width, myImage.height);

//     // Get canvas contents as a data URL
//     var imgAsDataURL = imgCanvas.toDataURL("image/png");
//     console.log(imgAsDataURL)
//     var myImage2:any = document.getElementById("myimage2")
//     myImage2.style.backgroundImage = "url(imgAsDataURL)";
    
//     // Save image into localStorage
//     try {
//         localStorage.setItem("myImage", imgAsDataURL);
//     }
//     catch (e) {
//         console.log("Storage failed: " + e);
//     }
//    var imageData:any = localStorage.getItem("myImage")
    

//     var img = new Image;
//     img.onload = function(){
//     imgContext.drawImage(img,0,0); // Or at whatever offset you like
//     };
//     img.src = imgAsDataURL;
//     // insertAdjacentHTML(img, myImage2)
    
//     console.log(img)

//     var divImg:any = document.getElementById("divImg")

//     divImg.insertAdjacentHTML('afterend', img.src)

    
//  }

  // ngOnInit(): void {
  //   this.resetForm();
  // }

  // onUpload(){

  // }
}
