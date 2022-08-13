export {};

declare global {
  namespace header {
    type SelectedNavItem = 'Recipes' | 'ShoppingList';
  }
  namespace data {
    interface UserData {
      name: string;
      age: number;
    }
  }
}
