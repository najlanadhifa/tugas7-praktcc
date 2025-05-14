import User from '../models/UserModel.js'; x
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

async function getUser(req, res) {
    try {
      const users = await User.findAll({
        attributes: ['id', 'email', 'username'] 
      });
      res.status(200).json(users);
    } catch (error) {
      console.log(error.message);
      res.status(500).json({ 
        status: "Error", 
        message: error.message 
      });
    }
  }

  async function register(req, res) {
    try {
      const { email, username, password } = req.body;
      
        const existingUser = await User.findOne({
        where: {
          email: email
        }
      });
      
      if (existingUser) {
        return res.status(400).json({ 
          status: "Error", 
          message: "Email sudah terdaftar" 
        });
      }
      
      const encryptPassword = await bcrypt.hash(password, 5);
      
      const newUser = await User.create({
        email,
        username,
        password: encryptPassword,
        refresh_token: null
      });
      
      const { password: _, ...userWithoutPassword } = newUser.toJSON();
      
      res.status(201).json({
        status: "Success",
        message: "Pendaftaran berhasil",
        data: userWithoutPassword
      });
      
    } catch (error) {
      console.log(error.message);
      res.status(500).json({ 
        status: "Error", 
        message: error.message 
      });
    }
}