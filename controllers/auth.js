const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const { User } = require("../models/user");
const { HttpError, ctrlWrapper } = require("../helpers");

const {SECRET_KEY} = process.env;

const signup = async(req, res)=> {
    const {email, password} = req.body;
    const user = await User.findOne({email});

    if(user){
        throw HttpError(409, "Email in use");
    }

    const hashPassword = await bcrypt.hash(password, 10);

    const newUser = await User.create({...req.body, password: hashPassword});

    res.status(201).json({
        email: newUser.email,
        subscription: newUser.subscription
    })
}

const login = async(req, res)=> {
    const {email, password} = req.body;
    const user = await User.findOne({email});
    if(!user){
        throw HttpError(401, "Email or password is wrong");
    }
    const passwordCompare = await bcrypt.compare(password, user.password);
    if(!passwordCompare) {
        throw HttpError(401, "Email or password is wrong");
    }

    const payload = {
        id: user._id,
    }

    const token = jwt.sign(payload, SECRET_KEY, {expiresIn: "23h"});
    await User.findByIdAndUpdate(user._id, {token});

    res.json({
        token,
        user: {
                    email: user.email,
        subscription: user.subscription,
        }
    }) 
}

const current = async(req, res)=> {
    const {email, subscription} = req.user;

    res.json({
        email: email,
        subscription: subscription
    })
}

const logout = async(req, res) => {
    const {_id} = req.user;
    await User.findByIdAndUpdate(_id, {token: ""});

    res.status(204).json() 
}

const subscriptionUpdate = async (req, res) => {
    const {subscription} = req.body
    const {_id} = req.user;
    await User.findByIdAndUpdate(_id, {subscription: subscription});

    res.status(202).json(        
        {subscription: subscription}
        ) 
  }

module.exports = {
    signup: ctrlWrapper(signup),
    login: ctrlWrapper(login),
    current: ctrlWrapper(current),
    logout: ctrlWrapper(logout),
    subscriptionUpdate:  ctrlWrapper(subscriptionUpdate)
}