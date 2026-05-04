import { Schema, model, models } from "mongoose";

export interface ISetting {
  key: string;
  value: string;
}

const settingSchema = new Schema<ISetting>(
  {
    key: {
      type: String,
      required: true,
      unique: true,
      index: true,
    },
    value: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const Setting = models.Setting || model<ISetting>("Setting", settingSchema);

export default Setting;
