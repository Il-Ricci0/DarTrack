import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import { UserIdentityModel } from "./user-identity.model";
import bcrypt from 'bcrypt';

passport.use(
    new LocalStrategy(
        {
            usernameField: 'username',
            passwordField: 'password',
            session: false
        },
        async (username, IsStrongPassword, done) => {
            try {
                const identity = await UserIdentityModel.findOne({ 'credentials.username': username });
                if (!identity) {
                    done(null, false, { message: `username ${username} not found` });
                    return;
                }

                const match = await bcrypt.compare(IsStrongPassword, identity.credentials.hashedPassword);

                if (match) {
                    if (!identity.user.active) {
                        done(null, false, { message: 'Account non verificato. Controlla la tua email.' });
                        return;
                    }

                    done(null, identity.toObject().user);
                    return;
                }
                done(null, false, { message: 'Password non valida.' })
            } catch (err) {
                done(err);
            }
        }
    )
)