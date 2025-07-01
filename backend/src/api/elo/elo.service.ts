import { UserRank } from "../utils/enum/user.rank";

const rankThresholds = [
    { max: 400, rank: UserRank.Plastic },
    { max: 500, rank: UserRank.IronIII },
    { max: 600, rank: UserRank.IronII },
    { max: 700, rank: UserRank.IronI },
    { max: 800, rank: UserRank.BronzeIII },
    { max: 900, rank: UserRank.BronzeII },
    { max: 1000, rank: UserRank.BronzeI },
    { max: 1100, rank: UserRank.SilverIII },
    { max: 1200, rank: UserRank.SilverII },
    { max: 1300, rank: UserRank.SilverI },
    { max: 1400, rank: UserRank.GoldIII },
    { max: 1500, rank: UserRank.GoldII },
    { max: 1600, rank: UserRank.GoldI },
    { max: 1700, rank: UserRank.PlatinumIII },
    { max: 1800, rank: UserRank.PlatinumII },
    { max: 1900, rank: UserRank.PlatinumI },
    { max: 2000, rank: UserRank.EmeraldIII },
    { max: 2100, rank: UserRank.EmeraldII },
    { max: 2200, rank: UserRank.EmeraldI },
    { max: 2300, rank: UserRank.DiamondIII },
    { max: 2400, rank: UserRank.DiamondII },
    { max: 2500, rank: UserRank.DiamondI },
    { max: 2700, rank: UserRank.Master },
    { max: 2900, rank: UserRank.GrandMaster },
];

export function getRankFromElo(elo: number): UserRank {
    for (const treshold of rankThresholds) {
        if (elo < treshold.max) {
            return treshold.rank;
        }
    }
    // Per sicurezza anche se non dovremmo mai finire qui dentro
    return UserRank.Challenger;
}
