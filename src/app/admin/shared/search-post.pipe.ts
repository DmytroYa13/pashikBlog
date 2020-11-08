import { Pipe, PipeTransform } from '@angular/core';
import { Post } from 'src/app/shared/interface';

@Pipe({
  name: 'searchPost'
})
export class SearchPostPipe implements PipeTransform {

  transform(posts: Post[], value: string): Post[] {

    if (!value.trim()) {
      return posts
    }
    else {
      return posts.filter(p => p.title.toLowerCase().includes(value.toLowerCase().trim()))
    }
  }

}
