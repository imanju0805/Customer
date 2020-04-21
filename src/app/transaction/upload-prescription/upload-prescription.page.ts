import { Component, OnInit } from "@angular/core";
import {
  Camera,
  CameraOptions,
  PictureSourceType,
} from "@ionic-native/camera/ngx";
import { Router, ActivatedRoute } from "@angular/router";
import { Crop } from "@ionic-native/crop/ngx";

@Component({
  selector: "app-upload-prescription",
  templateUrl: "./upload-prescription.page.html",
  styleUrls: ["./upload-prescription.page.scss"],
})
export class UploadPrescriptionPage implements OnInit {
  imageArray: Array<any> = [];
  constructor(
    private router: Router,
    private camera: Camera,
    private crop: Crop,
    private route: ActivatedRoute
  ) {
    let imageArrray = localStorage.getItem("prescriptions")
      ? JSON.parse(localStorage.getItem("prescriptions"))
      : [];
    this.imageArray = imageArrray;
  }

  ngOnInit() {}

  removeItem(index: number) {
    this.imageArray = this.imageArray.filter((v, i) => i != index);
  }

  getImages(type: number) {
    if (this.imageArray.length < 3) {
      this.openCamera(type);
    }
  }

  openCamera(type: number) {
    let sourceType =
      type == 1
        ? this.camera.PictureSourceType.CAMERA
        : type == 2
        ? this.camera.PictureSourceType.PHOTOLIBRARY
        : this.camera.PictureSourceType.SAVEDPHOTOALBUM;
    const options: CameraOptions = {
      quality: 100,
      destinationType: this.camera.DestinationType.FILE_URI,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
      sourceType: sourceType,
    };

    this.camera.getPicture(options).then(
      (imageData) => {
        // imageData is either a base64 encoded string or a file URI
        // If it's base64 (DATA_URL):
        // let base64Image = "data:image/jpeg;base64," + imageData;

        console.log(imageData);
        this.cropImage(imageData);
      },
      (err) => {
        // Handle error
      }
    );
  }

  cropImage(fileUrl) {
    this.crop.crop(fileUrl, { quality: 50 }).then(
      (newPath) => {
        //this.showCroppedImage(newPath.split('?')[0])
        console.log(newPath);
        let win: any = window;
        let localPath = win.Ionic.WebView.convertFileSrc(newPath.split("?")[0]);
        console.log(localPath);
        this.imageArray.push({ newPath: newPath, localPath: localPath });
        console.log(this.imageArray);
        localStorage.setItem("prescriptions", JSON.stringify(this.imageArray));
      },
      (error) => {
        alert("Error cropping image" + error);
      }
    );
  }

  uploadFiles() {
    if (this.route.snapshot.paramMap.get("status"))
      this.router.navigate(["transaction/address-selection",2]);
    else this.router.navigate(["transaction/prescription-confirm"]);
  }
}
