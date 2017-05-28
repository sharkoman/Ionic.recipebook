import { RecipeModel } from '../../models/recipe.model';
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
  recipe: RecipeModel;
  index: number;

  constructor(
      private recipeService: RecipeService,
      public navCtrl: NavController, 
      public navParams: NavParams,
      public asc: ActionSheetController,
      public alertCtrl: AlertController,
      public toastCtrl: ToastController) {}

  ngOnInit() {
    this.mode = this.navParams.get('mode');
    console.log(this.mode);
    
    if(this.mode == 'Edit'){
      this.recipe = this.navParams.get('recipe');
      this.index = this.navParams.get('index');
    }
    this.initForm();
  }

  private initForm() {
    let title = null;
    let description = null;
    let difficulty = 'Medium';
    let ingredients = [];

    if(this.mode == 'Edit'){
      title = this.recipe.title;
      description = this.recipe.description;
      difficulty = this.recipe.difficulty;
<<<<<<< HEAD
      for(let ingredient of this.recipe.ingredients){
        ingredients.push(new FormControl(ingredient.type, Validators.required));
=======
      for(let ing of this.recipe.ingredients){
        ingredients.push(
          new FormControl(ing.type, Validators.required)
        );
>>>>>>> 9329c3be70f3c67b7ffd69256e999534fc1e0c45
      }
    }

    this.recipeForm = new FormGroup({
      'title': new FormControl(title, Validators.required),
      'description': new FormControl(description, Validators.required),
      'difficulty': new FormControl(difficulty, Validators.required),
      'ingredients': new FormArray(ingredients)
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

    if(this.mode == 'Edit'){
      this.recipeService.updateRecipe(this.index, myRecipe.title, myRecipe.description, myRecipe.difficulty, ingredients);
    } else if(this.mode == 'New'){
      this.recipeService.addToRecipes(myRecipe.title,myRecipe.description, myRecipe.difficulty, ingredients);
    }

    this.recipeForm.reset();
    this.navCtrl.popToRoot();
  }

}
