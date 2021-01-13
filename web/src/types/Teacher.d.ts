export interface Teacher {
    _id: string;
    user: User;
    bio?: String;
    subject?: String;
    price?: String;
    area?: [String];
}