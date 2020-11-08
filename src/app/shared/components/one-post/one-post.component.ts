import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Post } from '../../interface';
import { PostsService } from '../../posts.service';

@Component({
  selector: 'app-one-post',
  templateUrl: './one-post.component.html',
  styleUrls: ['./one-post.component.css']
})
export class OnePostComponent implements OnInit {

  @Input() post:Post

  constructor(
    private router:Router
  ) { }

  ngOnInit(): void {
   
  }

  openPost(){
    this.router.navigate(['/post', this.post.id ])
  }

}
