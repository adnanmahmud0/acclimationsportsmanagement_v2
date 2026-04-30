import { Schema, model, models, Model } from "mongoose";
import bcrypt from "bcrypt";
import { USER_ROLES } from "@/types/user";

export interface IUser {
  name: string;
  role: USER_ROLES;
  email: string;
  password: string;
  image?: string;
  status: "active" | "delete";
  verified: boolean;
  authentication?: {
    isResetPassword: boolean;
    oneTimeCode: number;
    expireAt: Date;
  };
}

export interface IUserModel extends Model<IUser> {
  isExistUserByEmail(email: string): Promise<IUser | null>;
  isMatchPassword(password: string, hashPassword: string): Promise<boolean>;
}

const userSchema = new Schema<IUser, IUserModel>(
  {
    name: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      enum: Object.values(USER_ROLES),
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: true,
      select: 0,
      minlength: 8,
    },
    image: {
      type: String,
      default: "https://i.ibb.co/z5YHLV9/profile.png",
    },
    status: {
      type: String,
      enum: ["active", "delete"],
      default: "active",
    },
    verified: {
      type: Boolean,
      default: false,
    },
    authentication: {
      type: {
        isResetPassword: {
          type: Boolean,
          default: false,
        },
        oneTimeCode: {
          type: Number,
          default: null,
        },
        expireAt: {
          type: Date,
          default: null,
        },
      },
      select: 0,
    },
  },
  { timestamps: true }
);

// Static methods
userSchema.statics.isExistUserByEmail = async function (email: string) {
  return await this.findOne({ email });
};

userSchema.statics.isMatchPassword = async function (
  password: string,
  hashPassword: string
) {
  return await bcrypt.compare(password, hashPassword);
};

// Middleware for password hashing
userSchema.pre("save", async function () {
  if (!this.isModified("password")) return;
  
  const saltRounds = Number(process.env.BCRYPT_SALT_ROUNDS) || 10;
  this.password = await bcrypt.hash(this.password, saltRounds);
});

// In Next.js, we check if the model exists before creating it
const User = (models.User as IUserModel) || model<IUser, IUserModel>("User", userSchema);

export default User;
