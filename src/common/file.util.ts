import { BadRequestException } from "@nestjs/common";
import { extname } from "path";
import mime = require("mime-types");

export const editFileName = (req, file, callback) => {
  const fileExtName: string = mime.extension(file.mimetype)
    ? mime.extension(file.mimetype)
    : extname(file.originalname).split(".")[1];
  if (!fileExtName) {
    throw new BadRequestException("invalid image");
  }
  const randomName = Array(32)
    .fill(null)
    .map(() => Math.round(Math.random() * 16).toString(16))
    .join("");
  callback(null, `${randomName}.${fileExtName}`);
};

export const imageFileFilter = (req, file, callback) => {
  if (file.originalname.match(/\.(jpg|jpeg|png|gif)$/) || file.mimetype.match(/\/(jpg|jpeg|png|gif)$/)) {
    return callback(null, true);
  } else {
    return callback(new BadRequestException("Only image files are allowed!"), false);
  }
};

export const pngImageFileFilter = (req, file, callback) => {
  if (file.originalname.match(/\.(png)$/) || file.mimetype.match(/\/(png)$/)) {
    return callback(null, true);
  } else {
    return callback(new BadRequestException(`only '.png' image are allowed`), false);
  }
};
