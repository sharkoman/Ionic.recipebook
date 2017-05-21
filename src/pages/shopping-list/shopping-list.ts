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
  
  ingredientList :Ingredient[] = [];

  constructor(public navCtrl: NavController, public navParams: NavParams, private shoppingService: ShoppingService) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ShoppingList');
  }

  ionViewWillLoad() {
    this.loadIngredients();
  }

  loadIngredients() {
    this.ingredientList = this.shoppingService.getIngredients();
  }

  addToShoppingList(f) {
    this.shoppingService.addToIngredients(f.value.type, Number(f.value.amount));
    this.loadIngredients()
    f.reset();
  }

  removeFromShopping(index) {
    this.shoppingService.removeFromIngredients(index);
    this.loadIngredients();
  }

}
