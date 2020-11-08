import { Component, OnInit } from '@angular/core';
import { Post } from '../shared/interface';
import { PostsService } from '../shared/posts.service';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.css']
})
export class PostsComponent implements OnInit {

  posts:Post[]
  loaded:boolean = false

  constructor(
    private postsServics: PostsService
  ) { }

  ngOnInit(): void {
    this.postsServics.getPosts().subscribe(posts => {
      this.posts = posts,
      this.posts.sort((a, b) => {
        if (a.date > b.date) return -1;
        if (a.date < b.date) return 1;
      })
      this.loaded = true
    })

    setTimeout(()=> {
      if(!this.posts){
        this.loaded = true
      }
    },10000)


  }

}
