const { User } = require("../models");
const { verifyToken } = require("../helpers/jwt");

const authentication = async (req, res, next) => {
  try {
    //! 1. Kita check dia bawa token atau tidak. (Menandakan dia udah login atau blm)
    // console.log(req.headers);
    const { access_token } = req.headers;
    if (!access_token) {
      throw { name: "Invalid Token" };
    }
    // Kalo ada token, Token nya udah sesuai dengan yg di server kita apa ngga
    const decodeToken = verifyToken(access_token);
    // 3. Cari user, dia ada didatabase kita atau ngga
    const findUser = await User.findByPk(decodeToken.id);
    if (!findUser) {
      throw { name: "Invalid Token" };
    }
    //Gausah pake else lagi, karena "ketika udah throw itu dia behaviournya mirip kayak return, jadi tidak menjalankan code dibawahnya, jadi bisa juga tidak pakai else, langsung aja"
    req.user = findUser;
    // console.log(req.user, '<<<<<<<');
    next();
  } catch (error) {
    if (error.name === "Invalid Token" || error.name === "JsonWebTokenError") {
      return res.status(401).json({ message: " Unauthorized Token" });
    }
    console.log(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

module.exports = authentication;
