import { RecipeService } from './../services/recipe.service';
import { ShoppingService } from './../services/shopping.service';
import { EditRecipe } from './../pages/edit-recipe/edit-recipe';
import { Recipe } from './../pages/recipe/recipe';
import { NewRecipe } from './../pages/new-recipe/new-recipe';
import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { Tabs } from './../pages/tabs/tabs';
import { Recipes } from './../pages/recipes/recipes';
import { ShoppingList } from './../pages/shopping-list/shopping-list';

import { MyApp } from './app.component';

@NgModule({
  declarations: [
    MyApp,
    Tabs,
    ShoppingList,
    NewRecipe,
    Recipes,
    Recipe,
    EditRecipe
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    Tabs,
    ShoppingList,
    NewRecipe,
    Recipes,
    Recipe,
    EditRecipe
  ],
  providers: [
    StatusBar,
    SplashScreen,
    ShoppingService,
    RecipeService,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
