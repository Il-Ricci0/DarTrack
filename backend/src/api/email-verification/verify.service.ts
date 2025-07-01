import { UserModel } from "../user/user.model";
import nodemailer from 'nodemailer';
import { UserIdentityModel } from "../../lib/auth/local/user-identity.model";

export async function verifyEmailToken(token: string) {
    const user = await UserModel.findOne({ verificationToken: token });

    if (!user) {
        throw new Error(`No user found with token ${token}`);
    }

    // Controllo la scadenza del token
    if (!user.verificationTokenExpires || user.verificationTokenExpires < new Date()) {
        // Cancello utente da User
        await UserModel.deleteOne({ _id: user._id });

        // Cancello utente da UserIdentity
        await UserIdentityModel.deleteOne({ userID: user._id })

        return ({ message: `Token expired. The user will be deleted and can register again.` });
    }

    user.active = true;
    user.verificationToken = undefined;
    user.verificationTokenExpires = undefined;

    await user.save();
    return user;
}

export async function sendVerificationEmail(to: string, url: string) {
    const transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 465,
        secure: true, // SSL
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS
        }
    });

    await transporter.sendMail({
        from: `"DarTracker Support" <${process.env.EMAIL_USER}>`,
        to,
        subject: 'Verify your Email',
        html: 
        `
            <p>Thank you for registering! Click here to activate your account:</p>
            <p><a href="${url}">${url}</a></p>
        `
    });
}