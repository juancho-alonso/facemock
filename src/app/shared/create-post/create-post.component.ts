import { Component, OnInit, ViewChild, Output, EventEmitter } from '@angular/core';
import { UsersService } from 'src/app/users.service';
import { NG_ASYNC_VALIDATORS } from '@angular/forms';

@Component({
  selector: 'app-create-post',
  templateUrl: './create-post.component.html',
  styleUrls: ['./create-post.component.scss'],
  providers:[UsersService]
})
export class CreatePostComponent implements OnInit {

  // Get the input element
  @ViewChild('inputPost') inputPost;
  // Access local storage for current User
  currentUser = JSON.parse(localStorage.getItem('curUser')); 
  // Expose the posts Array
  @Output() comment = new EventEmitter<any>();
  // Store the posts Array
  userInput = [
    { 
      id:1,
      post:'What a nice day!',
      author: this.usersList.users[2].firstname + ' ' + this.usersList.users[2].surname,
      comments:[{
        message:'Amazing sunshine',
        publisher: this.usersList.users[1].firstname + ' ' + this.usersList.users[1].surname,
        avatar: ''
      },{
        message:'I totally agree!',
        publisher: this.usersList.users[0].firstname + ' ' + this.usersList.users[0].surname,
        avatar: ''
      }]
    },
    { 
      id:2,
      post:'Stay positive people!',
      author: this.usersList.users[1].firstname + ' ' + this.usersList.users[1].surname,
      comments:[{
        message:'Well said, I know no other way',
        publisher: this.usersList.users[10].firstname + ' ' + this.usersList.users[10].surname,
        avatar: ''
      },{
        message:'Love you! Always inspiring words',
        publisher: this.usersList.users[7].firstname + ' ' + this.usersList.users[7].surname,
        avatar: ''
      }]
    },
    { 
      id:3,
      post:'Hello everybody :)',
      author: this.usersList.users[4].firstname + ' ' + this.usersList.users[4].surname,
      comments:[{
        message:'What\'s up Paul?',
        publisher: this.usersList.users[12].firstname + ' ' + this.usersList.users[12].surname,
        avatar: ''
      }]
    },
    { 
      id:4,
      post:'Working on some new material',
      author: this.usersList.users[5].firstname + ' ' + this.usersList.users[5].surname,
      comments:[{
        message:'Can\'t wait to listen to it',
        publisher: this.usersList.users[9].firstname + ' ' + this.usersList.users[9].surname,
        avatar: ''
      },{
        message:'I absolutely loved your last song, keep it up!',
        publisher: this.usersList.users[6].firstname + ' ' + this.usersList.users[6].surname,
        avatar: ''
      }]
    },
    { 
      id:5,
      post:'Anyone up for coffee this afternoon?',
      author: this.usersList.users[6].firstname + ' ' + this.usersList.users[6].surname,
      comments:[{
        message:'Not today, let\'s do it tommorrow, r u free?',
        publisher: this.usersList.users[0].firstname + ' ' + this.usersList.users[0].surname,
        avatar: ''
      },{
        message:'I am!',
        publisher: this.usersList.users[11].firstname + ' ' + this.usersList.users[11].surname,
        avatar: ''
      },{
        message:'Me too!',
        publisher: this.usersList.users[8].firstname + ' ' + this.usersList.users[8].surname,
        avatar: ''
      }]
    },
    { 
      id:6,
      post:'Have you listened to my last album yet?',
      author: this.usersList.users[7].firstname + ' ' + this.usersList.users[7].surname,
      comments:[{
        message:'Absolutely! It is soooo good',
        publisher: this.usersList.users[14].firstname + ' ' + this.usersList.users[14].surname,
        avatar: ''
      }]
    },
    { 
      id:7,
      post:'Did you notice how your knees hurt in humid days? Gettin old :(',
      author: this.usersList.users[9].firstname + ' ' + this.usersList.users[9].surname,
      comments:[{
        message:'You are not alone buddy',
        publisher: this.usersList.users[4].firstname + ' ' + this.usersList.users[4].surname,
        avatar: ''
      },{
        message:'You know that living by the ocean doesn\'t help, right?',
        publisher: this.usersList.users[12].firstname + ' ' + this.usersList.users[12].surname,
        avatar: ''
      }]
    },
    { 
      id:8,
      post:'Somethimes it feels futile writing new songs when everyone is gonna ask you to sing those 3 old songs over and over again, doesn\'t it? They\'re almost making me tired of "suddenly I see"',
      author: this.usersList.users[8].firstname + ' ' + this.usersList.users[8].surname,
      comments:[{
        message:'Tell me about it.',
        publisher: this.usersList.users[4].firstname + ' ' + this.usersList.users[4].surname,
        avatar: ''
      }]
    },
    { 
      id:9,
      post:'I can\'t be bothered anymore about giving songs titles.',
      author: this.usersList.users[10].firstname + ' ' + this.usersList.users[10].surname,
      comments:[{
        message:'Titles should be optional',
        publisher: this.usersList.users[0].firstname + ' ' + this.usersList.users[0].surname,
        avatar: ''
      }]
    },
    { 
      id:10,
      post:'I appreciate good work no matter where it\'s coming from.',
      author: this.usersList.users[11].firstname + ' ' + this.usersList.users[11].surname,
      comments:[{
        message:'We all should',
        publisher: this.usersList.users[1].firstname + ' ' + this.usersList.users[1].surname,
        avatar: ''
      }]
    },
    { 
      id:11,
      post:'I always play barefoot. I can\'t play with shoes on.',
      author: this.usersList.users[12].firstname + ' ' + this.usersList.users[12].surname,
      comments:[{
        message:'I might try that!',
        publisher: this.usersList.users[7].firstname + ' ' + this.usersList.users[7].surname,
        avatar: ''
      },{
        message:'It reminds me of some friends back in the 70s',
        publisher: this.usersList.users[4].firstname + ' ' + this.usersList.users[4].surname,
        avatar: ''
      },{
        message:'I\'d rather keep my fans alive! Shoes on at all times for me',
        publisher: this.usersList.users[13].firstname + ' ' + this.usersList.users[13].surname,
        avatar: ''
      }]
    },
    { 
      id:12,
      post:'One thing I hear a lot is, "Dude, my mom loves your record", or "I got it for my dad for Christmas." I\'m essentially doing dad rock. Which is great, because I love Steely Dan, you know? Nothing wrong with dad rock!',
      author: this.usersList.users[13].firstname + ' ' + this.usersList.users[13].surname,
      comments:[{
        message:'Never heard of such a thing xD',
        publisher: this.usersList.users[4].firstname + ' ' + this.usersList.users[4].surname,
        avatar: ''
      },{
        message:'Wow, you can take every blow dude',
        publisher: this.usersList.users[9].firstname + ' ' + this.usersList.users[9].surname,
        avatar: ''
      },{
        message:'I\'ve had worse',
        publisher: this.usersList.users[5].firstname + ' ' + this.usersList.users[5].surname,
        avatar: ''
      }]
    },
    { 
      id:13,
      post:'Failure isn\'t an option. I\'ve erased the word "fear" from my vocabulary, and I think when you erase fear, you can\'t fail.',
      author: this.usersList.users[14].firstname + ' ' + this.usersList.users[14].surname,
      comments:[{
        message:'100% spot on',
        publisher: this.usersList.users[3].firstname + ' ' + this.usersList.users[3].surname,
        avatar: ''
      }]
    },
    { 
      id:14,
      post:'I don’t want to make money; I want to make a difference.',
      author: this.usersList.users[3].firstname + ' ' + this.usersList.users[3].surname,
      comments:[]
    },
    { 
      id:15,
      post:'Technology is a big destroyer of emotion and truth. Auto-tuning doesn’t do anything for creativity. Yeah, it makes it easier and you can get home sooner, but it doesn’t make you a more creative person. That’s the disease we have to fight in any creative field: ease of use.',
      author: this.usersList.users[0].firstname + ' ' + this.usersList.users[0].surname,
      comments:[]
    }
  ];
  // Keep count of the current post id
  idCount:number = this.userInput.length - 1;
  

  constructor(private usersList: UsersService) { }

  ngOnInit(): void {
    // Emit posts Array
    this.comment.emit(this.userInput)
  }

  onComment(event){ 
    if(event.key === "Enter" && this.inputPost.nativeElement.value !== '') {
    // Create a post model
    var model = { 
      id:0,
      post:'',
      author:'',
      comments:[],
    };

    // Increment id Counter  
    this.idCount++

    // Assign input value to the current post
    model.post = this.inputPost.nativeElement.value;

    // Assign current user to posts
    model.author = this.currentUser.firstname + ' ' + this.currentUser.surname;

    // Assign id to the current post
    model.id = this.idCount;

    // Push object to posts Array
    this.userInput.push(model)

    // Emit posts Array
    this.comment.emit(this.userInput)

    // Clean input value
    this.inputPost.nativeElement.value = ''
    }
  }
}
