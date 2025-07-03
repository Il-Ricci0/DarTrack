import { model, Schema } from "mongoose";
import { CasualGame } from "./casual.entity";
import { GameStatus } from "../../utils/enum/game.status";
import { UserRole } from "../../utils/enum/user.role";

const playerInfoSchema = new Schema({
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    role: { type: String, enum: Object.values(UserRole), required: true },
})

const casualGameSchema = new Schema<CasualGame>({
    players: {
        type: [playerInfoSchema],
        required: true
    }, // array di playerInfo
    maxPlayers: { type: Number, required: true },
    createdAt: { type: Date, default: new Date(), required: false },
    status: {
        type: String,
        enum: Object.values(GameStatus),
        default: GameStatus.Created,
        required: false,
    },
    playerPoints: {
        type: Map,
        of: Number,
        default: {},
        required: false,
    },
    inviteCode: { type: String, required: true, unique: true }
});

casualGameSchema.set('toJSON', {
    virtuals: true,
    transform: (_, ret) => {
        delete ret._id;
        delete ret.__v;
        delete ret.role;
        return ret;
    }
});

casualGameSchema.set('toObject', {
    virtuals: true,
    transform: (_, ret) => {
        delete ret._id;
        delete ret.__v;
        delete ret.role;
        return ret;
    }
});

export const CasualGameModel = model<CasualGame>('CasualGame', casualGameSchema);