import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs';
import { fbCreateResponse, Post } from './interface';
import { environment } from '../../environments/environment'
import { map } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class PostsService {

    posts:Post[]

    constructor(
        private http: HttpClient
    ) { }

    create(post: Post): Observable<Post> {
        return this.http.post(`${environment.fbDbUrl}/posts.json`, post)
            .pipe(map((res: fbCreateResponse) => {
                return {
                    ...post,
                    id: res.name,
                    date: new Date(post.date)
                }
            })
            )
    }


    getPosts(): Observable<Post[]> {
        return this.http.get<Post[]>(`${environment.fbDbUrl}/posts.json`)

        .pipe(map((response: {[key: string]: any}) => {
            return Object
              .keys(response)
              .map(key => ({
                ...response[key],
                id: key,
                date: new Date(response[key].date)
              }))
          }))
    }

    getPostById(id: string): Observable<Post>{
        return this.http.get<Post>(`${environment.fbDbUrl}/posts/${id}.json`)
        .pipe(map((post: Post) => {
            return {
              ...post, id,
              date: new Date(post.date)
            }
          }))
    }

    removePostById(id:string): Observable<void>{
        return this.http.delete<void>(`${environment.fbDbUrl}/posts/${id}.json`)
    }

    update(post: Post): Observable<Post> {
        return this.http.patch<Post>(`${environment.fbDbUrl}/posts/${post.id}.json`, post)
      }

}