import { BrowserModule } from '@angular/platform-browser';
import { NgModule, Provider } from '@angular/core';

import { SharedModule } from './shared/shared.module'
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MainLayoutComponent } from './shared/components/main-layout/main-layout.component';
import { PostsComponent } from './posts/posts.component';
import { PostComponent } from './post/post.component';
import { AdminModule } from './admin/admin.module';
import { OnePostComponent } from './shared/components/one-post/one-post.component'
import { AuthInterceptop } from './shared/auth.interceptor'
import { HTTP_INTERCEPTORS } from '@angular/common/http';

const INTERCEPTOR: Provider = {
  provide: HTTP_INTERCEPTORS,
  multi: true,
  useClass: AuthInterceptop
  
}


@NgModule({
  declarations: [
    AppComponent,
    MainLayoutComponent,
    PostsComponent,
    PostComponent,
    OnePostComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    SharedModule
 
  ],
  providers: [AuthInterceptop, INTERCEPTOR],
  bootstrap: [AppComponent]
})
export class AppModule { }
