export interface IFoodItem {
  category: string;
  cloudinaryImageId: string;
  description: string;
  displayOrder: number;
  enabled: boolean;
  id: number;
  isPopular: boolean;
  inStock: boolean;
  itemDiscount: number;
  isVeg: boolean;
  name: string;
  price: 200;
  recommended: boolean;
  restId: number;
}


export const CATEGORY_LIST = [
    {
      category: 'Recommended',
      collapsed: true,
      subCat: null
    },
    {
      category: 'Main-Course',
      collapsed: false,
      subCat: [
        'Veg',
        'Egg',
        'Non-Veg',
        'Dal',
        'Biyani',
        'Rice-Breads',
        'Fried-Rice-Noodles'
      ]
    },
    {
      category: 'Soups',
      collapsed: true,
      subCat: [
        'Veg',
        'Non-Veg'
      ]
    },
    {
      category: 'Starters',
      collapsed: true,
      subCat: [
        'Veg',
        'Egg',
        'Non-Veg',
        'Platter'
      ]
    },
    {
      category: 'Shop-special',
      collapsed: true,
      subCat: null
    },
    {
      category: 'Thalis',
      collapsed: true,
      subCat: [
        'Veg',
        'Non-Veg'
      ]
    },
    {
      category: 'Combos',
      collapsed: true,
      subCat: [
        'Veg',
        'Non-Veg'
      ]
    },
    {
      category: 'Desserts',
      collapsed: true,
      subCat: null
    },
    {
      category: 'Baverages',
      collapsed: true,
      subCat: null
    }
  ];
