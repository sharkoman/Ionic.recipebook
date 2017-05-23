import { NewRecipe } from './../new-recipe/new-recipe';
import { Component, OnInit } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';


@IonicPage()
@Component({
  selector: 'page-recipe',
  templateUrl: 'recipe.html',
})
export class Recipe implements OnInit {
  recipe: Recipe;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ngOnInit() {
    this.recipe = this.navParams.data.selectedRecipe;
    console.log(this.recipe);
  }

  onEditRecipe() {
    this.navCtrl.push(NewRecipe, {
      mode: 'Edit',
      recipe: this.navParams.get('selectedRecipe'),
      index: this.navParams.get('index')
    })
  }

}
