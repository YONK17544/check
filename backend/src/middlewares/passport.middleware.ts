import passport from 'passport';
import { Strategy } from 'passport-google-oauth20'
import User from '../models/users.model';

const clientID = process.env.GOOGLE_CLIENT_ID ?? '497926753875-h8p6d5f8c2l6033rvj7mjf8dsts51a7j.apps.googleusercontent.com';
const clientSecret = process.env.GOOGLE_CLIENT_SECRET ?? "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";

export const passportInitialize = () => {

    passport.use(new Strategy({
        clientID,
        clientSecret,
        callbackURL: "/auth/google/callback"
    },
        async function (accessToken: string, refreshToken: string, profile: any, cb: any) {
            const existingUser: any = await User.findOne({ email: profile['_json'].email });

            if (existingUser) {
                cb(null, profile);
            } else {
                const data = {
                    fullName: profile['_json'].name,
                    email: profile['_json'].email,
                }
                const user = new User(data);
                await user.save();
                cb(null, profile);
            }

        }
    ));

    passport.serializeUser((user: object, done: any) => {
        done(null, user);
    })

    passport.deserializeUser((user: object, done: any) => {
        done(null, user);
    })
}

export default passport