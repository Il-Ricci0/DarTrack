import { model, Schema } from "mongoose";
import { CasualGame } from "./casual.entity";
import { GameStatus } from "../../utils/enum/game.status";

const casualGameSchema = new Schema<CasualGame>({
    players: { type: [String], required: true },
    maxPlayers: { type: Number },
    createdAt: { type: Date, default: new Date() },
    status: { 
        type: String,
        enum: Object.values(GameStatus),
        default: GameStatus.Created
     },
    playerPoints: { 
        type: Map,
        of: Number,
        default: {}
     },
});

casualGameSchema.set('toJSON', {
    virtuals: true,
    transform: (_, ret) => {
        delete ret._id;
        delete ret.__v;
        return ret;
    }
});

casualGameSchema.set('toObject', {
    virtuals: true,
    transform: (_, ret) => {
        delete ret._id;
        delete ret.__v;
        return ret;
    }
});

export const UserModel = model<CasualGame>('CasualGame', casualGameSchema);