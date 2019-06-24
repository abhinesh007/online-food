import { ShopFoodModule } from './shop-food.module';

describe('ShopFoodModule', () => {
  let shopFoodModule: ShopFoodModule;

  beforeEach(() => {
    shopFoodModule = new ShopFoodModule();
  });

  it('should create an instance', () => {
    expect(shopFoodModule).toBeTruthy();
  });
});
