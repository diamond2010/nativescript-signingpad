/***
 * This Comment is to Confirm to the Apache 2.0 License
 * Changes by: Thorsten Herbst <herbst.thorsten@gmail.com> 11.10.17
 *
 * Changes which are made by Thorsten Herbst are marked with the following Convention:
 * // TH: <Date> Changecomment
 *
 *
 ***/


import { View, Property } from "ui/core/view";
import { Color } from "color";
// TH: 12.10.17 Refactor -> Rename SigningPad -> SigningPad
import { SigningPad as SigningPadDefinition } from ".";

export * from "ui/core/view";

export abstract class SigningPadBase extends View
  implements SigningPadDefinition {
  public ios:any;
  public penColor: Color;
  public penWidth: number;

  public abstract clearDrawing(): void;
  public abstract getDrawing(): Promise<any>;
  // TH: 12.10.17 removed getTransparentDrawing(): Promise<any>;
  public abstract getDrawingSvg(): Promise<string>;
}

export const penColorProperty = new Property<DrawingPadBase, Color>({
  name: "penColor",
  valueConverter: v => new Color(v),
  equalityComparer: Color.equals
});
penColorProperty.register(SigningPadBase);

export const penWidthProperty = new Property<DrawingPadBase, number>({
  name: "penWidth",
  defaultValue: 1,
  valueConverter: v => +v
});
penWidthProperty.register(SigningPadBase);
