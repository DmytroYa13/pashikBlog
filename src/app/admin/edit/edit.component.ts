import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { Post } from 'src/app/shared/interface';
import { PostsService } from 'src/app/shared/posts.service';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit, OnDestroy {

  formEdit: FormGroup
  post: Post
  submitted = false

  uSub: Subscription
  pSub: Subscription

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private postsService: PostsService
  ) {
  }

  ngOnInit() {
    this.pSub = this.route.params.pipe(
      switchMap((params: Params) => {
        return this.postsService.getPostById(params['id'])
      })
    ).subscribe((post: Post) => {
      this.post = post
      this.formEdit = new FormGroup({
        title: new FormControl(post.title, Validators.required),
        text: new FormControl(post.text, Validators.required)
      })
    })
  }


  quillStyle(){
    if(this.formEdit.get('text').invalid ){
      console.log(this.formEdit.get('text').invalid);
      return {'border':'3px solid red'}
    }
    else if (this.formEdit.get('text').dirty){
      return {'border':'3px solid green'}
    }
  }
 

  submit() {
    if (this.formEdit.invalid) {
      return
    }

    this.submitted = true

    this.uSub = this.postsService.update({
      ...this.post,
      title: this.formEdit.value.title,
      text: this.formEdit.value.text
      
    }).subscribe(() => {
      this.submitted = false
     
    })
    this.formEdit.reset()
    this.router.navigate(['/admin','board'])
  }


  ngOnDestroy() {

    if (this.pSub) {
      this.pSub.unsubscribe()
    }
  }
}
