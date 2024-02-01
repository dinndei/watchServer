import { User, userValidator } from "../models/user.js";
import bcrypt from 'bcryptjs';
import { generateToken } from '../config/jwt.js'
export const getAllUsers = async (req, res) => {
    try {
        let all = await User.find({}, "-passward");
        res.json(all);
    }
    catch {
        res.status(400).send("error in get all users");
    }
}
export const addUser = async (req, res) => {
    let { userName, passward, email } = req.body;
    let { error } = userValidator({ userName, passward, email });
    if (error) {
        return res.status(400).send(error.details[0].message);
    }
    try {
        const existingUser = await User.findOne({ $or: [{ userName }, { email }] });
        if (existingUser)
            return res.status(400).send("User with the same username or email already exists");
        let hashedpassward = await bcrypt.hash(passward, 7);
        let newUser = new User({ userName, email, passward: hashedpassward })
        await newUser.save();
        let { _id, userName } = newUser;
        let token = generateToken({ _id, userName });
        res.json({ _id, userName, token })
    }
    catch (error) {
        console.error(error);
        res.status(500)
        res.send("error in add new user")
    }
}
export const logIn = async (req, res) => {
    try {
        let { passward, userName, email } = req.body;
        let user = await User.findOne({ $or: [{ userName }, { email }] });

        if (!user)
            return res.send("there isnt a user with this userName and email")
        if (!bcrypt.compare(passward, user.passward))
            return res.send("passward not valid")
        let { _id, userName: name, role } = user;
        let token = generateToken({ _id, userName, role });
        res.json({ _id, userName, role, token });
    }
    catch (error) {
        console.error(error)
        res.status(400).send("error in loging in user");
    }
}


