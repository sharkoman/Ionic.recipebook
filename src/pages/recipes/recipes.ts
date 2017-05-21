import { Recipe } from '../recipe/recipe';
import { RecipeService } from './../../services/recipe.service';
import { RecipeModel } from '../../models/recipe.model';
import { NewRecipe } from './../new-recipe/new-recipe';
import { NavController } from 'ionic-angular';

import { Component } from '@angular/core';

@Component({
  selector: 'page-recipes',
  templateUrl: 'recipes.html',
})

export class Recipes  {

  recipesList: RecipeModel[] = [];

  constructor(
    private navCtrl: NavController,
    private recipeService:RecipeService){}
  
  ionViewWillEnter() {
    this.recipesList = this.recipeService.getRecipes();
  }

  openNewRecipe() {
    this.navCtrl.push(NewRecipe, {mode: 'New'});
  }

  onLoadRecipe(i) {
    this.navCtrl.push(Recipe, {selectedRecipe: this.recipesList[i]});
    // console.log('loadrecipe');
  }

}
