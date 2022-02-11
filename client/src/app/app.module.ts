import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { RecipeListComponent } from './components/recipelist.component';
import { RecipeDetailComponent } from './components/recipedetail.component';
import { RecipeAddComponent } from './components/recipeadd.component';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RecipeService } from './services/recipe.service';

const appRoutes: Routes = [
  {path: '', component: RecipeListComponent},
  {path: 'recipe/:recipeId', component: RecipeDetailComponent},
  {path: 'add', component: RecipeAddComponent},
  {path: '**', redirectTo: '', pathMatch: 'full'}
]

@NgModule({
  declarations: [
    AppComponent,
    RecipeListComponent,
    RecipeDetailComponent,
    RecipeAddComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(appRoutes, {useHash: true}),
    ReactiveFormsModule, FormsModule,
    HttpClientModule
  ],
  providers: [RecipeService],
  bootstrap: [AppComponent]
})
export class AppModule { }
