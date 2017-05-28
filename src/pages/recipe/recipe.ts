import { ShoppingService } from './../../services/shopping.service';
import { NewRecipe } from './../new-recipe/new-recipe';
import { Component, OnInit } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';


@IonicPage()
@Component({
  selector: 'page-recipe',
  templateUrl: 'recipe.html',
})
export class Recipe implements OnInit {
  recipe;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public shopingService: ShoppingService) {
  }

  ngOnInit() {
    this.recipe = this.navParams.data.selectedRecipe;
    console.log(this.recipe);
  }

  onEditRecipe() {
    this.navCtrl.push(NewRecipe, {
      mode: 'Edit',
      recipe: this.recipe,
      index: this.navParams.get('index')
    })
  }

  onAddIngredients() {
    this.shopingService.addItemsToIngredients(this.recipe.ingredients);
    console.log(this.recipe.ingredients);
  }

}
