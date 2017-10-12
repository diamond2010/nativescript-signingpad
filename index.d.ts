/***
 * This Comment is to Confirm to the Apache 2.0 License
 * Changes by: Thorsten Herbst <herbst.thorsten@gmail.com> 11.10.17
 *
 * Changes which are made by Thorsten Herbst are marked with the following Convention:
 * // TH: <Date> Changecomment
 *
 *
 ***/

import { View } from "ui/core/view";
import { Color } from "color";

// TH: 12.10.17 Refactor -> Rename SigningPad -> SigningPad
export class SigningPad extends View {
  // TH: 12.10.17 removed android: any;
  ios: any;

  /**
     * Gets/sets the drawing color of the pen.
     */

  penColor: Color;
  /**
     * Gets/sets the drawing width of the pen.
     */

  penWidth: number;
  /**
     * Returns native image.
     */
  getDrawing(): Promise<any>;
  
  // TH: 12.10.17 removed getTransparentDrawing(): Promise<any>;
 
  /**
     * Returns a Scalable Vector Graphics document
     */
  getDrawingSvg(): Promise<string>;

  /**
     * Clears the drawing from the SigningPad.
     */
  clearDrawing(): void;
}
