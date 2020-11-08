import { Component, OnDestroy, OnInit } from '@angular/core';
import { Post } from 'src/app/shared/interface';
import { PostsService } from 'src/app/shared/posts.service';
import { SearchPostPipe } from 'src/app/admin/shared/search-post.pipe'
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.css']
})
export class BoardComponent implements OnInit, OnDestroy {

  posts: Post[] = []
  search: string = ""
  loaded: boolean = false
  modal: boolean = false
  titleToDelete: Post
  pSub: Subscription
  dSub: Subscription

  alowed: boolean = false

  constructor(
    private postsService: PostsService
  ) { }

  ngOnInit(): void {
    this.pSub = this.postsService.getPosts().subscribe(
      res => {
        this.posts = res

        this.posts.sort((a, b) => {
          if (a.date > b.date) return -1;
          if (a.date < b.date) return 1;
        })

        this.loaded = true
      }
    )
    setTimeout(()=> {
      if(!this.posts.length){
        this.loaded = true
      }
    },10000)
  }

  deleteBtn(post: Post) {
    this.titleToDelete = post
    this.modal = true

  }
  delete(post: Post) {
    
      this.dSub = this.postsService.removePostById(post.id).subscribe(() => {
      this.posts = this.posts.filter(p => p.id !== post.id)
      this.modal = false
      })
    

  }


  ngOnDestroy() {
    if (this.pSub) {
      this.pSub.unsubscribe()
    }

    if (this.dSub) {
      this.dSub.unsubscribe()
    }
  }

}
