/***
* This Comment is to Confirm to the Apache 2.0 License
* Changes by: Thorsten Herbst <herbst.thorsten@gmail.com> 11.10.17
*
* Changes which are made by Thorsten Herbst are marked with the following Convention:
* // TH: <Date> Changecomment
*
* 
***/


import { Color } from "color";
// TH: 12.10.17 Refactor -> Rename SigningPad -> SigningPad
import {
  SigningPadBase,
  penColorProperty,
  penWidthProperty
} from "./signingpad-common";


// TH: 11.10.17 Rename SignatureView to THSigningImageView
declare let THSigningImageView: any;

export * from "./signingpad-common";

export class SigningPad extends SigningPadBase {
  constructor() {
    super();
    // console.log('--------- SigningPad ---------');
    // TH: 11.10.17 Rename SignatureView to THSigningImageView
    this.nativeView = THSigningImageView.alloc().initWithFrame(
      CGRectMake(0, 0, 100, 100)
    );
    this.nativeView.clipsToBounds = true;
  }

  get ios(): any {
    return this.nativeView;
  }

  [penWidthProperty.getDefault](): number {
    return this.nativeView.foregroundLineWidth;
  }
  [penWidthProperty.setNative](value: number) {
    this.nativeView.setLineWidth(Math.floor(value));
  }

  [penColorProperty.getDefault](): UIColor {
    return this.nativeView.foregroundLineColor;
  }
  [penColorProperty.setNative](value: Color | UIColor) {
    const color = value instanceof Color ? value.ios : value;
    this.nativeView.setLineColor(color);
  }

  public onLoaded() {
    // console.log(`onLoaded ${this.width}, ${this.height}`);
    if (this.width) {
      this.nativeView.frame.size.width = this.width;
    }
    if (this.height) {
      this.nativeView.frame.size.height = this.height;
    }
  }

  public getDrawing(): Promise<any> {
    return new Promise((resolve, reject) => {
      try {
        let isSigned = this.nativeView.isSigned();
        if (isSigned === true) {
          let data = this.nativeView.signatureImage();
          resolve(data);
        } else {
          reject("SigningPad is empty.");
        }
      } catch (err) {
        reject(err);
      }
    });
  }

  public getDrawingSvg(): Promise<string> {
    return new Promise((resolve, reject) => {
      try {
        let isSigned = this.nativeView.isSigned();
        if (isSigned === true) {
          let data = this.nativeView.signatureSvg();
          resolve(data);
        } else {
          reject("SigningPad is empty.");
        }
      } catch (err) {
        reject(err);
      }
    });
  }

  public clearDrawing(): void {
    try {
      if (this.backgroundColor) {
        let color = this.backgroundColor;
        if (color.constructor == Color) {
          color = color.ios;
        } else if (color.constructor == String) {
          color = new Color(<any>color).ios;
        }
        this.nativeView.clearWithColor(color);
      } else {
        this.nativeView.clear();
      }
    } catch (err) {
      console.log("Error clearing the SigningPad: " + err);
    }
  }
}
