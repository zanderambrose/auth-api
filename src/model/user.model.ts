import {
  getModelForClass,
  modelOptions,
  prop,
  Severity,
  pre,
  DocumentType,
} from "@typegoose/typegoose";
import argon2d from "argon2";
import { nanoid } from "nanoid";
import log from "../util/logger";

@pre<User>("save", async function () {
  if (!this.isModified("password")) {
    return;
  }

  const hash = await argon2d.hash(this.password);
  this.password = hash;
  return;
})
@modelOptions({
  schemaOptions: {
    timestamps: true,
  },
  options: {
    allowMixed: Severity.ALLOW,
  },
})
export class User {
  @prop({ lowercase: true, required: true, unique: true })
  email: string;

  @prop({ required: true })
  firstName: string;

  @prop({ required: true })
  lastName: string;

  @prop({ required: true })
  password: string;

  @prop({ required: true, default: () => nanoid() })
  verificationCode: string;

  @prop()
  passwordResetCode: string | null;

  @prop({ default: false })
  verified: boolean;

  async validatePassword(this: DocumentType<User>, candidatePassword: string) {
    try {
      return await argon2d.verify(this.password, candidatePassword);
    } catch (error) {
      log.error(error, "Couldn't validate password");
    }
  }
}

const userModel = getModelForClass(User);

export default userModel;
