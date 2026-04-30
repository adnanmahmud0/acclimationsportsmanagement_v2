import { Schema, model, models, Model, Types } from "mongoose";

export interface IResetToken {
  user: Types.ObjectId;
  token: string;
  expireAt: Date;
}

export interface IResetTokenModel extends Model<IResetToken> {
  isExistToken(token: string): Promise<IResetToken | null>;
  isExpireToken(token: string): Promise<boolean>;
}

const resetTokenSchema = new Schema<IResetToken, IResetTokenModel>(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    token: {
      type: String,
      required: true,
    },
    expireAt: {
      type: Date,
      required: true,
    },
  },
  { timestamps: true }
);

resetTokenSchema.statics.isExistToken = async function (token: string) {
  return await this.findOne({ token });
};

resetTokenSchema.statics.isExpireToken = async function (token: string) {
  const currentDate = new Date();
  const resetToken = await this.findOne({
    token,
    expireAt: { $gt: currentDate },
  });
  return !!resetToken;
};

const ResetToken = (models.Token as IResetTokenModel) || model<IResetToken, IResetTokenModel>("Token", resetTokenSchema);

export default ResetToken;
