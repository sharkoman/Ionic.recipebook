import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { NewRecipe } from './new-recipe';

@NgModule({
  declarations: [
    NewRecipe,
  ],
  imports: [
    IonicPageModule.forChild(NewRecipe),
  ],
  exports: [
    NewRecipe
  ]
})
export class NewRecipeModule {}
