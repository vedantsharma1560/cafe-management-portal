import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CategoryService } from 'src/app/services/category/category.service';

@Component({
  selector: 'app-food',
  templateUrl: './food.component.html',
  styleUrls: ['./food.component.scss']
})
export class FoodComponent implements OnInit {

  categories: any[] = [];
  catForm!: FormGroup;
  showAdd: boolean = false;
  showEdit: boolean = false;
  searchKey!: string;
  selectedItem: any;
  constructor(private cat: CategoryService, private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.getAllCategories();
    this.catForm = this.formBuilder.group({
      name: ['', Validators.required],
    });
  }

  getAllCategories() {
    this.cat.getAllCategories()
    .subscribe({
      next: (res: any) => {
        if(res.statusCode === "200") {
          this.categories = res.data;
        } else {
          this.categories = [];
        }
      }
    })
  };

  addCategory() {
    if(this.catForm.invalid) {
      this.catForm.markAllAsTouched();
      return;
    }
    this.cat.addCategories(this.catForm.value)
    .subscribe({
      next: (res: any) => {
        if(res.statusCode === "200") {
          alert("Category Added Successfully!");
          let ref = document.getElementById('close');
          ref?.click();
          this.catForm.reset;
          this.getAllCategories();
        } else {
          alert("System Hang!");
          let ref = document.getElementById('close');
          ref?.click();
          this.getAllCategories();
        }
      }
    })
  };

  clickAdd() {
    this.catForm.reset();
    this.showAdd = true;
    this.showEdit = false;
  };

  onEdit(category: any) {
    this.showAdd = false;
    this.showEdit = true;
    this.selectedItem = category;
    this.catForm.reset();
    if(category) {
      this.catForm.controls['name'].setValue(category.name);
    }
  };

  updateCategory() {
    if(this.catForm.invalid) {
      this.catForm.markAllAsTouched();
      return;
    }
    this.cat.updateCategories(this.selectedItem.id, this.catForm.value)
    .subscribe({
      next: (res: any) => {
        if(res.statusCode === "200") {
          alert("Updated!");
          let ref = document.getElementById('close');
          ref?.click();
          this.catForm.reset();
          this.getAllCategories();
        } else {
          alert("System Hang!");
          let ref = document.getElementById('close');
          ref?.click();
          this.catForm.reset();
          this.getAllCategories();
        }
      }
    })
  };

}
