import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable, forkJoin } from "rxjs";
import * as moment from "moment";
import { File } from "@ionic-native/file/ngx";
import {
  FileTransfer,
  FileUploadOptions,
  FileTransferObject
} from "@ionic-native/file-transfer/ngx";
import { mergeMap } from 'rxjs/operators';

@Injectable({
  providedIn: "root"
})
export class UploadPrescriptionService {
  constructor(
    private http: HttpClient,
    private file: File,
    private transfer: FileTransfer
  ) {}

  createOrder(medicinList,Address_Id): Observable<any> {
    let payload = {
      Order_Id: 0,
      Customer_Id: 9,
      OrderComment: `sample ${moment().format("DD/MM/YYYY hh:mm")}`,
      Address_Id: Address_Id,
      liOrdDtls: medicinList.map(item => {
        return { MedicineId: item.Id, Order_Qty: item.count, OrderDtls_Id: 0 };
      })
    };
    return this.http.post(
      "http://182.18.157.79/medv/api/order/createOrder",
      payload
    );
  }

  uploadPrecription(fileURL: string, orderId: any) {
    return Observable.create(Observer=>{
      var copyFileURL=fileURL;
      var splitPath = copyFileURL.split('/');
      var imageName = splitPath[splitPath.length - 1];
      var filePath = fileURL.split(imageName)[0];
      this.file.readAsDataURL(filePath, imageName).then(base64 => {
  
        let base64Image = 'data:image/jpeg;base64,' + base64;
        var stringLength = base64Image.length - 'data:image/png;base64,'.length;
        var sizeInBytes = 4 * Math.ceil((stringLength / 3)) * 0.5624896334383812;
        var sizeInKb = sizeInBytes / 1000;
        let base64ImageData = base64;
        const fileTransfer: FileTransferObject = this.transfer.create();
        let params={
          orderId:orderId
        }
        const uploadOpts: FileUploadOptions = {
          fileKey: 'file',
          fileName: imageName,
          params:params
        };    
        if (sizeInKb >= 4096  ) {
          //this.showMessage("image size is too big please upload below 1 mb");
           Observer.next({
            status:'500',
            statusMessage:"Reduce the size of the image",
          })
          Observer.complete();
        }
        else {
          fileTransfer.upload(base64ImageData, 'http://182.18.157.79/medv/api/Image/uploadPrescription', uploadOpts)
            .then((data) => {
              let respData = JSON.parse(data.response);
              Observer.next({
                status:'200',
                response:respData
              })
              Observer.complete();
              
            }, (err) => {
              Observer.next({
                status:'600',
                response:err
              })
              Observer.complete();
              console.log(err);
              console.log("error in loading image using gallery");
            });
        }
  
        
      }, error => {
        alert('Error in showing image' + error);
        Observer.error(error);
        Observer.complete();
        // this.isLoading = false;
      });
    })
   
  }


  createOrderHead(customerID:Number,ImageArray,AddressId){
    return this.http.post(
      "http://182.18.157.79/medv/api/order/CreateOrdHead?customerId="+customerID.toString(),{}
    ).pipe(mergeMap((res)=>this.uploadPrescriptions(ImageArray,res)));
  }

  // uploadPrescriptions(ImageArray,orderId,AddressId){
  //   return Observable.create(Observer=>{
  //     if(ImageArray.length){
  //       let data=ImageArray.map(item=>{
  //         return this.uploadPrecription(item.newPath.split("?")[0], orderId);
  //       });
  //        forkJoin(data).pipe(mergeMap(()=> this.updateAddress(orderId,AddressId))).subscribe(res=>{
  //          console.log(res);
  //          Observer.next(res);
  //          Observer.complete();
  //        },err=>{
  //          Observer.error(err);
  //        });
  //     }else Observer.error("No data to upload")
  //   })
    
  // }

  uploadPrescriptions(ImageArray,orderId){
     let data=ImageArray.map(item=>{
      return this.uploadPrecription(item.newPath.split("?")[0], orderId);
    });
    return forkJoin(data)
  }

  updateAddress(orderId,addressId){
    return this.http.post(
      `http://182.18.157.79/medv/api/customer/updateOrdAddres?addId=${addressId}&orderId=${orderId}`,{}
    )
  }
}
