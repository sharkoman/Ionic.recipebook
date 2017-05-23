import { Ingredient } from './ingredient';
import { RecipeModel } from './../models/recipe.model';

export class RecipeService {

   private recipes: RecipeModel[] = [
      {
         description:"very good",
         difficulty:"Medium",
         ingredients:[
            {
               type: 'Milk',
               amount: 2
            },
            {
               type: 'Meat',
               amount: 1
            }
         ],
         title:"Pizza"
      }
   ];

   addToRecipes(title:string, description:string, difficulty:string, ingredients:Ingredient[]) {
      this.recipes.push(new RecipeModel(title, description, difficulty, ingredients));
      console.log( new RecipeModel(title, description, difficulty, ingredients) );
   }

   removeFromRecipes(index:number) {
      this.recipes.splice(index, 1);
   }

   updateRecipe(index:number, title:string, description:string, difficulty:string, ingredients:Ingredient[]) {
      this.recipes[index] = new RecipeModel(title, description, difficulty, ingredients);
   }

   getRecipes() {
      return this.recipes.slice();
   }

}