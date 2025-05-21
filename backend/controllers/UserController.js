import User from "../models/UserModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

async function getUsers(req, res) {
  try {
    const response = await User.findAll();
    res.status(200).json(response);
  } catch (error) {
    console.log(error.message);
  }
}

async function getUserById(req, res) {
  try {
    const response = await User.findOne({ where: { id: req.params.id } });
    res.status(200).json(response);
  } catch (error) {
    console.log(error.message);
  }
}

async function createUser(req, res) {
  try{
    const { name, email, password } = req.body;
    const encryptPassword = await bcrypt.hash(password, 5);
    await User.create({
        name: name,
        email: email,
        password: encryptPassword
        
    });
    res.status(201).json({msg:"berhasil mendaftar!"});
} catch(error){
    console.log(error.message);
}
}

async function updateUser(req, res) {
  try{
    const { name, email, password} = req.body;
    let updatedData = {
      name, email
    }; 

    if (password) {
        const encryptPassword = await bcrypt.hash(password, 5);
        updatedData.password = encryptPassword;
    }

    const result = await User.update(updatedData, {
        where: {
            id: req.params.id
        }
    });

    if (result[0] === 0) {
        return res.status(404).json({
            status: 'failed',
            message: 'pengguna tidak ditemukan',
            updatedData: updatedData,
            result
        });
    }

    res.status(200).json({msg:"User Updated"});
  } catch(error){
    console.log(error.message);
  }
}

async function deleteUser(req, res) {
  try {
    await User.destroy({ where: { id: req.params.id } });
    res.status(201).json({ msg: "User Deleted" });
  } catch (error) {
    console.log(error.message);
  }
}

async function loginHandler(req, res){
  try{
      const{email, password} = req.body;
      const user = await User.findOne({
          where : {
              email: email
          }
      });

      if(user){
        const userPlain = user.toJSON(); 
        const { password: _, refresh_token: __, ...safeUserData } = userPlain;

          const decryptPassword = await bcrypt.compare(password, user.password);
          if(decryptPassword){
              const accessToken = jwt.sign(safeUserData, process.env.ACCESS_TOKEN_SECRET, {
                  expiresIn : '30s' 
              });
              const refreshToken = jwt.sign(safeUserData, process.env.REFRESH_TOKEN_SECRET, {
                  expiresIn : '1d' 
              });
              await User.update({refresh_token:refreshToken},{
                  where:{
                      id:user.id
                  }
              });
              res.cookie('refreshToken', refreshToken,{
                  httpOnly : false, 
                  sameSite : 'none',  
                  maxAge  : 24*60*60*1000,
                  secure:true 
              });
              res.status(200).json({
                  status: "Success",
                  message: "berhasil login",
                  safeUserData,
                  accessToken 
              });
          }
          else{
              res.status(400).json({
                  status: "Failed",
                  message: "password atau email salah",
                
              });
          }
      } else{
          res.status(400).json({
              status: "Failed",
              message: "password atau email salah",
          });
      }
  } catch(error){
      res.status(error.statusCode || 500).json({
          status: "error",
          message: error.message
      })
  }
}

async function logout(req,res){
  const refreshToken = req.cookies.refreshToken; 
  if(!refreshToken) return res.sendStatus(204);
  const user = await User.findOne({
      where:{
          refresh_token:refreshToken
      }
  });
  if(!user.refresh_token) return res.sendStatus(204);
  const userId = user.id;
  await User.update({refresh_token:null},{
      where:{
          id:userId
      }
  });
  res.clearCookie('refreshToken'); 
  return res.sendStatus(200);
}
export { getUsers, getUserById, createUser, updateUser, deleteUser, loginHandler, logout};