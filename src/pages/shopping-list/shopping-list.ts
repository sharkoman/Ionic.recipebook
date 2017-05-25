import { Ingredient } from '../../services/ingredient';
import { ShoppingService } from '../../services/shopping.service';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-shopping-list',
  templateUrl: 'shopping-list.html',
})
export class ShoppingList {
  
  ingredientList :Ingredient[] = [
    {
      type: 'Milk',
      amount: 5
    }
  ];

  constructor(public navCtrl: NavController, public navParams: NavParams, private shoppingService: ShoppingService) {
  }

  ionViewWillEnter() {
    console.log(this.ingredientList);
    this.ingredientList = this.shoppingService.getIngredients();
  }

  loadIngredients() {
    this.ingredientList = this.shoppingService.getIngredients();
  }

  addToShoppingList(f) {
    this.shoppingService.addToIngredients(f.value.type, Number(f.value.amount));
    this.loadIngredients();
    f.reset();
  }

  removeFromShopping(index) {
    this.shoppingService.removeFromIngredients(index);
    this.loadIngredients();
  }

}
