import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormControl, Validators, FormArray, FormBuilder } from '@angular/forms';
// import { tap, map } from 'rxjs/operators';

import { IFoodItem, CATEGORY_LIST } from './../../model/food-item.model';
import { AdminDataService } from './../../services/admin-data.service';
import { AdminUtilService } from './../../services/admin-util.service';
import { NbToastrService } from '@nebular/theme';

@Component({
  selector: 'app-add-food-item-form',
  templateUrl: './add-food-item-form.component.html',
  styleUrls: ['./add-food-item-form.component.scss']
})

export class AddFoodItemFormComponent implements OnInit {


  // addFoodItemsForm: FormGroup;

  dynamicFormItems: FormArray;
  submitted: any;
  productForm: FormGroup;
  itemList: IFoodItem[];
  categories = CATEGORY_LIST;
  subCategories;
  currItemId: any = this.activatedRoute.snapshot.params['id'];
  currItem: any;
  editMode = false;
  isLoading = false;
  largestVegId = this.adminDataService.model.largestVegId;
  largestNonVegId = this.adminDataService.model.largestNonVegId;

  constructor(
    private formBuilder: FormBuilder,
    private adminDataService: AdminDataService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private adminUtilService: AdminUtilService
  ) { }

  // setProducts(productList) {
  //   // Patch Values
  //   this.productForm.controls['items'] = this.formBuilder.array(productList.map(i => this.formBuilder.group(i)));
  // }

  isNull(control: FormControl) {
    const val = control.value;
    if (val) {
      return false;
    }
    return true;
  }

  createFormItems(): FormGroup {
    return this.formBuilder.group({
      name: ['', [Validators.required]],
      category: ['', [Validators.required, Validators.pattern(/^[a-z\d\-_\s]+$/i)]],
      subCategory: [null, []],
      description: ['', [Validators.required, Validators.minLength(10)]],
      isVeg: [true, [Validators.required]],
      price: [0, [Validators.required, Validators.pattern(/^[0-9]*$/i)]],
      itemDiscount: [0, [Validators.required, Validators.pattern(/^[0-9]*$/i)]],
      cloudinaryImageId: [''],
      isPopular: [true, [Validators.required]],
      recommended: [false, [Validators.required]],
      inStock: [true, [Validators.required]],
      displayOrder: [0, [Validators.required, Validators.pattern(/^[0-9]*$/i)]],
      enabled: [true, [Validators.required]],
      restId: [this.adminUtilService.generateRestId(), [Validators.required]],
      id: ['', [Validators.required, Validators.pattern(/^[0-9]*$/i)]],
    });
  }

  addEmptyFormItem(): void {
    this.submitted = true;
    if (this.productForm.valid || true) {
      this.dynamicFormItems = this.productForm.get('dynamicFormItems') as FormArray;
      this.dynamicFormItems.push(this.createFormItems());
      this.submitted = false;
    }
  }

  deleteFormItem(i): void {
    this.dynamicFormItems.removeAt(i);
  }

  onItemFormSubmit() {
    this.isLoading = true;
    this.adminDataService.createFoodItems(this.productForm.value.dynamicFormItems)
      .subscribe((foodItemsData: any) => {
        this.isLoading = false;
        if (foodItemsData.status === 201) {
          this.adminUtilService.showToast('created', foodItemsData.result[0].id);
          console.log('data from create Items call', foodItemsData);
        } else {
          this.adminUtilService.showToast('error');
        }
        this.adminUtilService.back();
      }, (error: any) => {
        this.isLoading = false;
        console.log('Something went wrong! Here\'s the error: ', error);
        this.adminUtilService.showToast('error');
        this.adminUtilService.back();
      });
  }

  getSubCategories(category) {
    // category =  category.replace(/[^A-Za-z]/g, '');
    category = category.replace(/[^A-Za-z\s]/g, '').trim();
    const filteredItem = this.categories.filter((elem) => {
      return elem.category === category;
    });
    if (filteredItem[0] && filteredItem[0].subCat) {
      this.subCategories = filteredItem[0].subCat;
    } else {
      this.subCategories = null;
    }
  }

  // getSubCategories = (event) => {
  //   console.log('select change');
  // }

  deleteFoodItem(id) {
    const itemIndex = this.getItemIndexFromId(this.currItemId);
    this.adminDataService.deleteFoodItem(this.itemList[itemIndex])
      .subscribe((response: any) => {
        if (response) {
          this.adminUtilService.showToast('deleted', response.result.id);
          delete this.itemList[itemIndex];
          this.adminUtilService.back();
        }
      });
  }

  updateFoodItem(id) {
    const itemIndex = this.getItemIndexFromId(this.currItemId);
    this.itemList[itemIndex] = this.productForm.get('dynamicFormItems').get([0]).value;
    this.adminDataService.updateFoodItem(this.itemList[itemIndex])
      .subscribe((response: any) => {
        if (response) {
          this.adminUtilService.showToast('updated', response.result.id);
          this.itemList[itemIndex] = response.result;
        }
      });
  }

  getItemIndexFromId(id): number {
    return this.itemList.findIndex((elem) => {
      return elem.id === id;
    });
  }

  loadFormWithValues = () => {
    this.editMode = true;
    if (this.adminDataService.model.foodItemList) {
      console.log(this.adminDataService.model.foodItemList);
      this.itemList = this.adminDataService.model.foodItemList;
      const itemIndex = this.getItemIndexFromId(this.currItemId);
      // console.log(this.productForm.controls['items']);
      this.currItem = this.itemList[itemIndex];
      this.getSubCategories(this.currItem.category);
      this.productForm.get('dynamicFormItems').get([0]).patchValue(this.currItem);
    }
  }

  ngOnInit() {
    this.productForm = this.formBuilder.group({
      dynamicFormItems: this.formBuilder.array([this.createFormItems()])
    });
    if (this.currItemId) {
      this.loadFormWithValues();
    }
  }

}
