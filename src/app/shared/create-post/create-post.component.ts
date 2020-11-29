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
      img:"https://i2.wp.com/q8allinone.com/wp-content/uploads/2014/03/Beautiful-London-Sunrise.jpg?ssl=1",
      video:"",
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
      img:"https://images.squarespace-cdn.com/content/v1/53343cd4e4b092d4150f796f/1596277637248-JL0LSTYVI7XDKUOL8NT6/ke17ZwdGBToddI8pDm48kFPMNY03bGZs-Wog5bUWXdd7gQa3H78H3Y0txjaiv_0fDoOvxcdMmMKkDsyUqMSsMWxHk725yiiHCCLfrh8O1z4YTzHvnKhyp6Da-NYroOW3ZGjoBKy3azqku80C789l0r9YoV8ytu8SWDj21Bt3yU8BZDJa5tYs7kJJr9iCUTPQgnHXtkpJWa5JAFrPHCH8nw/image-asset.jpeg",
      video:"",
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
      img:"https://faroutmagazine.co.uk/static/uploads/2019/09/Revisiting-McCartney-II-the-experimental-second-solo-album-of-Paul-McCartney.jpg",
      video:"",
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
      img:"https://img.maximummedia.ie/joe_ie/eyJkYXRhIjoie1widXJsXCI6XCJodHRwOlxcXC9cXFwvbWVkaWEtam9lLm1heGltdW1tZWRpYS5pZS5zMy5hbWF6b25hd3MuY29tXFxcL3dwLWNvbnRlbnRcXFwvdXBsb2Fkc1xcXC8yMDE4XFxcLzEwXFxcLzE2MTgyOTU3XFxcL21vbmtleXMtbWFpbi0xMDI0eDU3Ni5wbmdcIixcIndpZHRoXCI6NzAwLFwiaGVpZ2h0XCI6MzcwLFwiZGVmYXVsdFwiOlwiaHR0cHM6XFxcL1xcXC93d3cuam9lLmllXFxcL2Fzc2V0c1xcXC9pbWFnZXNcXFwvam9lXFxcL25vLWltYWdlLnBuZz9pZD00M2JjYTlkZTdlYjI2OTczN2EwZlwiLFwib3B0aW9uc1wiOltdfSIsImhhc2giOiI4YmE5ZDg0MjI2Y2Q4N2Y3ODQwM2U1NWRlYTRjYTA5MzE5Y2MwM2UzIn0=/monkeys-main-1024x576.png",
      video:"",
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
      img:"",
      video:"",
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
      img:"",
      video:"",
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
      img:"https://jackjohnsonmusic.com/images/social/instagram/1.jpg",
      video:"",
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
      img:"",
      video:"",
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
      img:"https://ichef.bbci.co.uk/images/ic/560xn/p013v574.jpg",
      video:"",
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
      img:"",
      video:"",
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
      img:"https://pbs.twimg.com/media/EIGTJVjVAAEr6L_.jpg",
      video:"",
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
      img:"",
      video:"",
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
      img:"",
      video:"",
      comments:[{
        message:'100% spot on',
        publisher: this.usersList.users[3].firstname + ' ' + this.usersList.users[3].surname,
        avatar: ''
      }]
    },
    { 
      id:14,
      post:'I don’t want to make money; I want to make a difference. Help people affected by the California fires.',
      author: this.usersList.users[3].firstname + ' ' + this.usersList.users[3].surname,
      img:"https://pbs.twimg.com/media/Dr74jx2U4AA7Ibi.jpg",
      video:"",
      comments:[]
    },
    { 
      id:15,
      post:'Technology is a big destroyer of emotion and truth. Auto-tuning doesn’t do anything for creativity. Yeah, it makes it easier and you can get home sooner, but it doesn’t make you a more creative person. That’s the disease we have to fight in any creative field: ease of use.',
      author: this.usersList.users[0].firstname + ' ' + this.usersList.users[0].surname,
      img:"",
      video:"",
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
      img:'',
      video:'',
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
