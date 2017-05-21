import { ShoppingList } from './../shopping-list/shopping-list';
import { Recipes } from '../recipes/recipes';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';


@IonicPage()
@Component({
  selector: 'page-tabs',
  templateUrl: 'tabs.html',
})
export class Tabs {

  recipesPage = Recipes;

  shoppingListPage = ShoppingList;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad Tabs');
  }

}
