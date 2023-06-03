import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import {RouterOutlet} from "@angular/router";
import { AppRoutingModule } from './app-routing.module';
import { HomeComponent } from './pages/default/home/home.component';
import { HeaderComponent } from './pages/default/header/header.component';
import { ButtonComponent } from './components/button/button.component';
import {HttpClient, HttpClientModule} from "@angular/common/http";
import {TranslateLoader, TranslateModule} from "@ngx-translate/core";
import {TranslateHttpLoader} from "@ngx-translate/http-loader";
import { UserLogoComponent } from './components/user-logo/user-logo.component';
import {MatIconModule} from "@angular/material/icon";
import { CatalogComponent } from './pages/default/catalog/catalog.component';
import { StyledTextComponent } from './components/styled-text/styled-text.component';
import { FiltersComponent } from './pages/default/filters/filters.component';
import { ProductComponent } from './components/product/product.component';
import { ComboboxComponent } from './components/combobox/combobox.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { DateTimeComponent } from './components/date-time/date-time.component';
import {MatInputModule} from "@angular/material/input";
import {MatDatepickerModule} from "@angular/material/datepicker";
import {MatNativeDateModule} from "@angular/material/core";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import { IconComponent } from './components/icon/icon.component';
import { RangeDropdownComponent } from './components/range-dropdown/range-dropdown.component';
import {MatSliderModule, MatSliderThumb, MatSliderVisualThumb} from "@angular/material/slider";
import {MatSlideToggleModule} from "@angular/material/slide-toggle";
import {MatSnackBarModule} from "@angular/material/snack-bar";
import { FooterComponent } from './pages/default/footer/footer.component';
import {ProductPageComponent} from "./pages/default/product-page/product-page.component";
import { CarouselComponent } from './components/carousel/carousel.component';
import {MatSidenavModule} from "@angular/material/sidenav";
import {MatDialogModule} from "@angular/material/dialog";
import {MatExpansionModule} from "@angular/material/expansion";
import {MatRadioModule} from "@angular/material/radio";
import {MatStepperModule} from "@angular/material/stepper";
import {MatButtonModule} from "@angular/material/button";
import {MatCheckboxModule} from "@angular/material/checkbox";
import { InputComponent } from './components/input/input.component';
import { AdditionalComponent } from './pages/default/product-page/additional/additional.component';
import { SwiperComponent } from './components/swiper/swiper.component';
import { AuthComponent } from './pages/default/auth/auth.component';
import { ProfileComponent } from './pages/default/profile/profile.component';
import { MainComponent } from './pages/default/profile/main/main.component';
import {MatTabsModule} from "@angular/material/tabs";
import { SecurityComponent } from './pages/default/profile/security/security.component';
import { HistoryComponent } from "./pages/default/profile/history/history.component";
import { NewUserComponent } from './pages/default/new-user/new-user.component';
import {LeftPanelAdminComponent} from "./pages/admin/left-panel/left-panel.component";
import {AuthAdminComponent} from "./pages/admin/auth-admin/auth.component";
import { SidenavComponent } from './pages/default/sidenav/sidenav.component';
import {SidenavFiltersComponent} from "./pages/default/sidenav/sidenav-filters/sidenav-filters.component";
import {SidenavMainComponent} from "./pages/default/sidenav/sidenav-main/sidenav-main.component";
import { DashboardComponent } from './pages/admin/dashboard/dashboard.component';
import { PagesComponent } from './pages/admin/pages/pages.component';
import { SettingsComponent } from './pages/admin/settings/settings.component';
import { PageComponent } from './pages/admin/page/page.component';
import { AdminHeaderComponent } from './pages/admin/admin-header/admin-header.component';
import {CKEditorModule} from "@ckeditor/ckeditor5-angular";
import {RichEditor} from "./components/rich-editor/rich-editor";
import { AddPageComponent } from './pages/admin/add-page/add-page.component';
import { CustomPageComponent } from './components/custom-page/custom-page.component';
import { UniversalComponent } from './pages/default/universal/universal.component';
import { ReviewsComponent } from './components/reviews/reviews.component';
import { UserDataComponent } from './pages/default/user-data/user-data.component';
import { OrganizationComponent } from './pages/default/organization/organization.component';

@NgModule({
    declarations: [
        AppComponent,
        HomeComponent,
        HeaderComponent,
        ButtonComponent,
        UserLogoComponent,
        CatalogComponent,
        StyledTextComponent,
        FiltersComponent,
        ComboboxComponent,
        DateTimeComponent,
        IconComponent,
        RangeDropdownComponent,
        FooterComponent,
        ProductComponent,
        ProductPageComponent,
        CarouselComponent,
        SidenavMainComponent,
        SidenavFiltersComponent,
        InputComponent,
        AdditionalComponent,
        SwiperComponent,
        AuthComponent,
        ProfileComponent,
        MainComponent,
        SecurityComponent,
        HistoryComponent,
        NewUserComponent,
        LeftPanelAdminComponent,
        AuthAdminComponent,
        SidenavComponent,
        DashboardComponent,
        PagesComponent,
        SettingsComponent,
        PageComponent,
        AdminHeaderComponent,
        RichEditor,
        AddPageComponent,
        CustomPageComponent,
        UniversalComponent,
        ReviewsComponent,
        UserDataComponent,
        OrganizationComponent
    ],
    imports: [
        BrowserModule,
        RouterOutlet,
        AppRoutingModule,
        HttpClientModule,
        TranslateModule.forRoot({
            loader: {
                provide: TranslateLoader,
                useFactory: HttpLoaderFactory,
                deps: [HttpClient]
            }
        }),
        MatIconModule,
        FormsModule,
        MatInputModule,
        MatDatepickerModule,
        MatNativeDateModule,
        BrowserAnimationsModule,
        MatSliderModule,
        MatSlideToggleModule,
        MatSnackBarModule,
        MatSidenavModule,
        MatDialogModule,
        MatExpansionModule,
        MatRadioModule,
        MatStepperModule,
        MatButtonModule,
        MatCheckboxModule,
        ReactiveFormsModule,
        MatTabsModule,
        CKEditorModule,
    ],
  providers: [MatDatepickerModule],
  bootstrap: [AppComponent]
})
export class AppModule { }

export function HttpLoaderFactory(http: HttpClient): TranslateHttpLoader {
  return new TranslateHttpLoader(http);
}
