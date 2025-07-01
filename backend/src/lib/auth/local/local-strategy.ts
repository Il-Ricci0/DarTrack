import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import { UserIdentityModel } from "./user-identity.model";
import bcrypt from 'bcrypt';
import { UserModel } from "../../../api/user/user.model";

passport.use(
    new LocalStrategy(
        {
            usernameField: 'username',
            passwordField: 'password',
            session: false
        },
        async (username, IsStrongPassword, done) => {
            try {
                const identity = await UserIdentityModel.findOne({ 'credentials.username': username }).populate('user');
                if (!identity) {
                    done(null, false, { message: `Username ${username} not found.` });
                    return;
                }

                const match = await bcrypt.compare(IsStrongPassword, identity.credentials.hashedPassword);

                if (!match) {
                    done(null, false, { message: 'Invalid password.' });
                    return;
                }

                if (!identity.user.active) {
                    // Controlla prima se il token di verifica è scaduto
                    if (!identity.user.verificationTokenExpires || identity.user.verificationTokenExpires < new Date()) {
                        // Elimina utente da entrambe le collection
                        await UserIdentityModel.deleteOne({ user: identity.user.id });
                        await UserModel.deleteOne({ _id: identity.user.id });

                        done(null, false, { message: 'Verification token expired. Your registration has been deleted. Please register again.' });
                        return;
                    }

                    // Se non è scaduto ma non è attivo, blocca accesso
                    done(null, false, { message: 'Account not verified. Please check your email.' });
                    return;
                }

                done(null, identity.toObject().user);
            } catch (err) {
                done(err);
            }
        }
    )
)