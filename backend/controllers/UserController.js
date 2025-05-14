import User from '../models/UserModel.js'; 
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

async function getUser(req, res) {
  try {
    const users = await User.findAll({
      attributes: [
        'id', 
        'email', 
        'username'] 
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
    const { 
      email, 
      username, 
      password } = req.body;
    
    const existingUser = await User.findOne({
      where: {
        email: email
      }
    });
    
    if (existingUser) {
      return res.status(400).json({ 
        status: "Error", 
        message: "Oops, Email sudah terdaftar!" 
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
      message: "Selamat, Registrasi berhasil!",
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

async function login(req, res) {
    try {
      const { email, password } = req.body;
  
      const user = await User.findOne({
        where: {
          email: email,
        },
      });
  
      if (user) {
        const userPlain = user.toJSON(); 
  
        console.log(userPlain);
  
        const { password: _, refresh_token: __, ...safeUserData } = userPlain;
  
        const decryptPassword = await bcrypt.compare(password, user.password);
  
        if (decryptPassword) {
          const accessToken = jwt.sign(
            safeUserData,
            process.env.ACCESS_TOKEN_SECRET,
            {
              expiresIn: "30s",
            }
          );
  
          const refreshToken = jwt.sign(
            safeUserData,
            process.env.REFRESH_TOKEN_SECRET,
            {
              expiresIn: "1d",
            }
          );

          await User.update(
            { refresh_token: refreshToken },
            {
              where: {
                id: user.id,
              },
            }
          );
  
          res.cookie("refreshToken", refreshToken, {
            httpOnly: false, 
            sameSite: "none", 
            maxAge: 24 * 60 * 60 * 1000, 
            secure: true,
          }); 
  
          res.status(200).json({
            status: "Success",
            message: "Sukses, Masuk berhasil!",
            safeUserData,
            accessToken,
          });
        } else {
          const error = new Error("Password atau email salah");
          error.statusCode = 400;
          throw error;
        }
      } else {
        const error = new Error("Password atau email salah");
        error.statusCode = 400;
        throw error;
      }
    } catch (error) {
      res.status(error.statusCode || 500).json({
        status: "Error",
        message: error.message,
      });
    }
  }
  
  async function logout(req, res) {
    const refreshToken = req.cookies.refreshToken;
  
    if (!refreshToken) return res.sendStatus(204);
  
    const user = await User.findOne({
      where: {
        refresh_token: refreshToken,
      },
    });
  
    if (!user.refresh_token) return res.sendStatus(204);
  
    const userId = user.id;
  
    await User.update(
      { refresh_token: null },
      {
        where: {
          id: userId,
        },
      }
    );
  
    res.clearCookie("refreshToken");
    return res.sendStatus(200);
  }

export { login, logout, getUser, register };