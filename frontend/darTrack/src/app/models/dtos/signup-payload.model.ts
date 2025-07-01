export class SignupPayload {
    username: string = '';
    email: string = '';
    password: string = '';
    avatarId: number = Math.floor(Math.random() * 5) + 1;
}