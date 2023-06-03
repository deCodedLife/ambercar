import { NgModule } from '@angular/core';
import {RouterModule, Routes} from "@angular/router";
import {HomeComponent} from "./pages/default/home/home.component";
import {CatalogComponent} from "./pages/default/catalog/catalog.component";
import {ProductPageComponent} from "./pages/default/product-page/product-page.component";
import {AuthComponent} from "./pages/default/auth/auth.component";
import {ProfileComponent} from "./pages/default/profile/profile.component";
import {NewUserComponent} from "./pages/default/new-user/new-user.component";
import {AuthAdminComponent} from "./pages/admin/auth-admin/auth.component";
import {DashboardComponent} from "./pages/admin/dashboard/dashboard.component";
import {PagesComponent} from "./pages/admin/pages/pages.component";
import {SettingsComponent} from "./pages/admin/settings/settings.component";
import {PageComponent} from "./pages/admin/page/page.component";
import {AddPageComponent} from "./pages/admin/add-page/add-page.component";
import {UniversalComponent} from "./pages/default/universal/universal.component";

const routes: Routes = [

  {
    path: '',
    component: HomeComponent
  },
  {
    path: 'catalog/:type',
    component: CatalogComponent
  },
  {
    path: 'product/:type/:id',
    component: ProductPageComponent
  },
  {
    path: 'profile/auth',
    pathMatch: "full",
    component: AuthComponent
  },
  {
    path: "profile",
    component: ProfileComponent
  },
  {
    path: "newUser",
    component: NewUserComponent
  },
  {
    path: "admin/signIn",
    component: AuthAdminComponent
  },
  {
    path: "admin/dashboard",
    component: DashboardComponent
  },
  {
    path: "admin/pages",
    component: PagesComponent
  },
  {
    path: "admin/settings",
    component: SettingsComponent
  },
  {
    path: "admin/page/:id",
    component: PageComponent
  },
  {
    path: "admin/newPage",
    component: AddPageComponent
  },
  {
    path: ':page',
    component: UniversalComponent
  }
];

@NgModule({
  declarations: [],
  imports: [ RouterModule.forRoot(
    routes,
    {
      scrollPositionRestoration: "top"
    })
  ],
  exports: [ RouterModule ]
})
export class AppRoutingModule { }
