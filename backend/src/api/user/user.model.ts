import { model, Schema } from "mongoose";
import { User } from "./user.entity";
import { UserRole } from "../utils/enum/user.role";

const userSchema = new Schema<User>({
    firstName: { type: String },
    lastName: { type: String },
    email: { type: String, required: true, unique: true },
    password: { type: String },
    role: { 
        type: String,
        enum: Object.values(UserRole),  
        default: UserRole.PLAYER,
    },
    active: { type: Boolean, default: false },
    verificationToken: { type: String },
    verificationTokenExpires: { type: Date },
});

userSchema.set('toJSON', {
    virtuals: true,
    transform: (_, ret) => {
        delete ret._id;
        delete ret.__v;
        return ret;
    }
});

userSchema.set('toObject', {
    virtuals: true,
    transform: (_, ret) => {
        delete ret._id;
        delete ret.__v;
        return ret;
    }
});

export const UserModel = model<User>('User', userSchema);