import { Ingredient } from './ingredient';

export class ShoppingService {

   private ingredients: Ingredient[] =[];

   addToIngredients(type:string, amount:number) {
      this.ingredients.push(new Ingredient(type, amount));
   }

   addItemsToIngredients(items) {
      this.ingredients.push(...items);
   }

   removeFromIngredients(index) {
      this.ingredients.splice(index, 1);
   }

   getIngredients() {
      return this.ingredients.slice();
   }
}