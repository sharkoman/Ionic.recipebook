import { Ingredient } from './../../services/ingredient';
import { RecipeService } from '../../services/recipe.service';

import { FormGroup, FormControl, Validators, FormArray } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { ActionSheetController, AlertController, IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';


@IonicPage()
@Component({
  selector: 'page-new-recipe',
  templateUrl: 'new-recipe.html',
})

export class NewRecipe implements OnInit {

  mode = 'New';
  difficultyList = ['Easy', 'Medium', 'Hard'];
  recipeForm: FormGroup;

  constructor(
      private recipeService: RecipeService,
      public navCtrl: NavController, 
      public navParams: NavParams,
      public asc: ActionSheetController,
      public alertCtrl: AlertController,
      public toastCtrl: ToastController) {}

  ngOnInit() {
    this.mode = this.navParams.get('mode');
    this.initForm();
  }

  private initForm() {
    this.recipeForm = new FormGroup({
      'title': new FormControl(null, Validators.required),
      'description': new FormControl(null, Validators.required),
      'difficulty': new FormControl('Medium', Validators.required),
      'ingredients': new FormArray([])
    });
  }

  onManage() {
    const actionsheet = this.asc.create({
      title: 'What Do You Want To Do?',
      buttons: [
        {
          text: 'Add Ingredients',
          handler: () => {
            this.addIngredientAlert();
          }
        },
        {
          text: 'Remove All Ingredients',
          role: 'destructive',
          handler: () => {            
            const ingArray: FormArray = <FormArray>this.recipeForm.get('ingredients');
            const len = ingArray.length;
            if( len > 0 ) {
              for(let i = len - 1; i >= 0; i--){
                ingArray.removeAt(i);
              }
            }
          }
        },
        {
          text: 'Cancle',
          role: 'cancel',
        }
      ]
    });
    actionsheet.present();
  }

  private addIngredientAlert() {
    const ingAlert = this.alertCtrl.create({
      title: 'Add New Ingredient',
      inputs: [
        {
          name: 'name',
          placeholder: 'ingredient name'
        }
      ],
      buttons: [
        {
          text: 'Add',
          handler: (data) => {
            if(data.name.trim() == '' || data.name == null) {
              const myToast = this.toastCtrl.create({
                message: 'Please enter a valid value.',
                duration: 2000
              });
              myToast.present();
              return;
            } else {
              (<FormArray>this.recipeForm.get('ingredients'))
                .push( new FormControl(data.name, Validators.required) );
              const myToast = this.toastCtrl.create({
                message: data.name + ' has been added.',
                duration: 2500
              });
              myToast.present();
            }
          }
        },
        {
          text: 'Cancle',
          role: 'cancle'
        }
      ]
    });
    ingAlert.present();
  }

  onSubmit() {
    const myRecipe = this.recipeForm.value;
    let ingredients:Ingredient[] =[];
    if(myRecipe.ingredients.length > 0 ){
      ingredients = myRecipe.ingredients.map( (itemName) => {
        return { type: itemName, amount: 1}
      } );
    }
    this.recipeService.addToRecipes(myRecipe.title,myRecipe.description, myRecipe.difficulty, ingredients);
    this.navCtrl.pop();
  }

}
