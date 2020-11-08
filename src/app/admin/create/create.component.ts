import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Post } from '../../shared/interface';
import { PostsService } from '../../shared/posts.service'

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent implements OnInit, OnDestroy {

  form:FormGroup
  newPost:Post
  submited:boolean = false
  pSub: Subscription

  constructor(
    private postsService: PostsService,
    private router:Router
  ) { }

  ngOnInit(): void {
    this.form = new FormGroup({
      title: new FormControl(null, Validators.required),
      text: new FormControl(null, Validators.required)
    })
  }

  quillStyle(){
    if(this.form.get('text').invalid && this.form.get('text').touched ){
      return {'border':'3px solid red'}
    }
    else if (this.form.get('text').touched){
      return {'border':'3px solid green'}
    }
  }

  onSubmit(form){
    
    if(form.invalid){
      return
    }
    this.submited = true
    
    const newPost = {
      title: form.value.title.trim() ? form.value.title.trim(): "- - -",
      text: form.value.text,
      date: new Date()
    } 
    
    this.pSub = this.postsService.create(newPost).subscribe(()=>{
      form.reset()
      this.submited = false
      this.router.navigate(['/admin','board'])
    })

    
  }

  ngOnDestroy(){
    if(this.pSub){
      this.pSub.unsubscribe()
    }
  }

}
