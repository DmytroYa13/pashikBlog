import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


import { AdminLayoutComponent } from './shared/component/admin-layout/admin-layout.component';
import { CreateComponent } from './create/create.component';
import { EditComponent } from './edit/edit.component';
import { BoardComponent } from './board/board.component';
import { LoginComponent } from './login/login.component';
import { SharedModule } from '../shared/shared.module';
import { AuthService } from './shared/service/auth.service';
import { AuthGuard } from './shared/service/auth.guard';
import { SearchPostPipe } from './shared/search-post.pipe';
import { ModalWindowComponent } from './shared/component/modal-window/modal-window.component'

const routes: Routes = [
    {
        path: "", component: AdminLayoutComponent, children: [
            { path: "", redirectTo: "/admin/login", pathMatch: "full" },
            { path: "login", component: LoginComponent },
            { path: "edit/:id", component: EditComponent, canActivate:[AuthGuard]  },
            { path: "create", component: CreateComponent, canActivate:[AuthGuard] },
            { path: "board", component: BoardComponent, canActivate:[AuthGuard]  },
        ]
    }
]

@NgModule({
    declarations: [
        AdminLayoutComponent,
        CreateComponent,
        EditComponent,
        BoardComponent,
        LoginComponent,
        SearchPostPipe,
        ModalWindowComponent
    ],
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        RouterModule.forChild(routes),
        SharedModule
    ],
    exports: [RouterModule],
    providers:[ AuthGuard]
})
export class AdminModule { }
