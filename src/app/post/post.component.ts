import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { Post } from '../shared/interface';
import { PostsService } from '../shared/posts.service';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent implements OnInit, OnDestroy {

  post$: Observable<Post>
  uSub: Subscription
  pSub: Subscription
  post: Post
  @ViewChild('toUp') toUp: ElementRef;

  constructor(
    private router: Router,
    private activRout: ActivatedRoute,
    private postsService: PostsService
  ) { }

  ngOnInit() {

    window.addEventListener('scroll', this.scroll, true)
    this.pSub = this.activRout.params.pipe(
      switchMap((params: Params) => {
        return this.postsService.getPostById(params['id'])
      })
    ).subscribe(
      res => {
        this.post = res
      }
    )
  }


  scroll = (): void => {
    let scrolled = window.pageYOffset
    let coords = document.documentElement.clientHeight;

    if (scrolled > coords) {
      this.toUp.nativeElement.classList.add('back_to_top-show');
    }
    if (scrolled < coords) {
      this.toUp.nativeElement.classList.remove('back_to_top-show');
    }


  };

  goToUp() {
    let scrolled
    let timer = setInterval(() => {
      scrolled = window.pageYOffset
      window.scrollBy(0, -80);
      if (scrolled <= 10) {
        clearInterval(timer)
      }
    }, 10)

  }

  toMain() {
    this.router.navigate(['/'])
  }

  ngOnDestroy() {
    window.removeEventListener('scroll', this.scroll, true);
  }

}
