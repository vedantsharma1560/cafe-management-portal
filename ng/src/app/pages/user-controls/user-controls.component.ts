import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { AdminService } from 'src/app/services/user-controls/admin.service';

@Component({
  selector: 'app-user-controls',
  templateUrl: './user-controls.component.html',
  styleUrls: ['./user-controls.component.scss']
})
export class UserControlsComponent implements OnInit {

  profileForm!: FormGroup;
  userForm!: FormGroup;
  constructor(private formBuilder: FormBuilder, private admin: AdminService) { }

  ngOnInit(): void {
    this.profileForm = this.formBuilder.group({
      file: [''],
      fileSource: [''],
    });
    this.userForm = this.formBuilder.group({
      firstName: [''],
      lastName: [''],
      email: [''],
    });
  }

  profilePhotoArray: any = [];
  imageSource: any;
  uploadFile(data: any) {
    if (data.target.files.length > 0) {
      const fileData = data.target.files[0];
      const fileSizeInBytes = fileData.size;
      const fileSizeInMB = fileSizeInBytes / (1024 * 1024);
      if (fileSizeInMB > 5) {
        this.profileForm.reset();
        const reader = new FileReader();
        reader.onload = (ele: any) => {
          this.imageSource = '';
        };
        reader.readAsDataURL(fileData);
        // this.snackBar.alertError('File size greater than 5MB', 'Error');
        return;
      }
      this.profileForm.patchValue({ fileSource: fileData });
      this.profilePhotoArray.push(fileData);
      const reader = new FileReader();
      reader.onload = (ele: any) => {
        this.imageSource = ele.target.result;
      };
      reader.readAsDataURL(fileData);
    }
  };

  uploadProfilePic() {
    let formData = new FormData();
    for (const [key, value] of Object.entries(this.userForm.value)) {
      formData.append(`${key}`, `${value}`.trim());
    }
    formData.append('cmsFiles', this.profileForm.value.fileSource);
    this.admin.addUserByAdmin(formData)
    .subscribe({
      next: (res: any) => {
        if(res.statusCode === "200") {
          alert("Done");
        } else {
          alert("Error Agya");
        }
      }
    })

  };

}
