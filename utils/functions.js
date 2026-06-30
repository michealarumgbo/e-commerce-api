import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

// access token function
export const newAccessToken = (user = {}) => {
  return jwt.sign(
    {
      id: user._id,
      email: user.email,
    },
    process.env.JWT_ACCESS_SECRET,
    { expiresIn: "1h" },
  );
};

// refresh token function
export const newRefreshToken = (user = {}) => {
  return jwt.sign(
    {
      id: user._id,
      email: user.email,
    },
    process.env.JWT_REFRESH_SECRET,
    { expiresIn: "7d" },
  );
};

// create slug from name
export const createSlug = (name = "") => {
  name = name.toLocaleLowerCase();
  name = name.replaceAll(" ", "-");

  return name;
};

// // create SLK (name-color-weight/(ram/storage))
// export const createSLK = (specs = {}) => {
//   specs.name = specs.name.toLocaleLowerCase();
// };
