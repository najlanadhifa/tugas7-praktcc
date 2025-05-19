import User from "../models/UserModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const Register = async (req, res) => {
  const { username, password, confirm_password } = req.body;

  // Password Validation
  if (password !== confirm_password) {
    return res.status(400).json({ message: "password tidak sama" });
  }

  // Hash Password
  const hashPassword = await bcrypt.hash(password, 5);

  try {
    const data = await User.create({
      username,
      password: hashPassword,
    });

    res.status(201).json({
      message: "user berhasil dibuat!",
      data,
    });
  } catch (error) {
    res.status(500).json({
      message: "oops, terjadi kesalahan",
      error: error.message,
    });
  }
};

export const Login = async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await User.findOne({ where: { username } });

    if (!user) {
      return res.status(404).json({ message: "oops, user tidak ditemukan" });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(401).json({ message: "oops, password salah" });
    }

    // JWT Sign
    const accessToken = jwt.sign(
      { id: user.id, username: user.username },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: "1h" }
    );
    const refreshToken = jwt.sign(
      { id: user.id, username: user.username },
      process.env.REFRESH_TOKEN_SECRET,
      { expiresIn: "1d" }
    );

    await User.update(
      { refresh_token: refreshToken },
      { where: { id: user.id } }
    );

    // Set Cookie
    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      maxAge: 24 * 60 * 60 * 1000, // 1 day
    });

    // Response
    return res.status(200).json({
      accessToken,
      message: "selamat, login berhasil!",
    });
  } catch (error) {
    res.status(500).json({
      message: "oops, terjadi kesalahan",
      error: error.message,
    });
  }
};

export const refreshToken = async (req, res) => {
  try {
    // Cookie Validation
    const refreshToken = req.cookies.refreshToken; // Sesuaikan nama cookie
    if (!refreshToken) return res.sendStatus(401); // Unauthorized

    // User Validation
    const user = await User.findOne({
      where: { refresh_token: refreshToken },
    });
    if (!user) return res.status(403).json({ message: "oops, user tidak ditemukan" });

    // Verify JWT
    jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, decoded) => {
      if (err) {
        return res.status(403).json({ message: "invalid refresh token" });
      }

      const { id, username } = user; // Pastikan data ini sesuai dengan payload JWT sebelumnya
      const accessToken = jwt.sign(
        { id, username },
        process.env.ACCESS_TOKEN_SECRET,
        { expiresIn: "30s" }
      );

      res.json({ accessToken });
    });
  } catch (error) {
    res.status(500).json({
      message: "Terjadi Kesalahan",
      error: error.message,
    });
  }
};

export const logout = async (req, res) => {
  try {
    const refreshToken = req.cookies.refreshToken; // Sesuaikan nama cookie
    if (!refreshToken) return res.sendStatus(204); // No Content, berarti user sudah logout

    // User Validation
    const data = await User.findOne({
      where: { refresh_token: refreshToken },
    });
    if (!data) return res.status(204).json("oops, user tidak ditemukan");

    // Mengupdate refresh token menjadi null
    await User.update({ refresh_token: null }, { where: { id: data.id } });

    // Menghapus refresh cookie
    res.clearCookie("refreshToken"); // Sesuaikan nama cookie

    // Response
    return res.status(200).json({
      message: "logout berhasil!",
    });
  } catch (error) {
    res.status(500).json({
      message: "oops, terjadi kesalahan",
      error: error.message,
    });
  }
};