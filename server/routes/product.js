const express = require("express");
const router = express.Router();
const multer = require("multer");
const { Product } = require("../models/Product");
//=================================
//             Products
//=================================

// Multer부분
var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    cb(null, `${Date.now()}_${file.originalname}`);
  },
});

var upload = multer({ storage: storage }).single("file");

// endpoint : index.js에서 /api/product로 받아줬기에 route에서는 나머지만 작성함
router.post("/image", (req, res) => {
  //받은 이미지를 저장을 해줌.
  upload(req, res, (err) => {
    if (err) {
      return req.json({ success: false, err }); //저장 실패시
    } else {
      return res.json({
        success: true,
        filePath: res.req.file.path,
        fileName: res.req.file.filename,
      }); //저장 성공시 filePath, fileName을 frontend로 보냄
    }
  });
});

router.post("/", (req, res) => {
  //받은 이미지를 DB에 저장을 해줌.
  // Product model에 받은 body를 넣어 새로운 객체를 만든다.
  const product = new Product(req.body);

  product.save((err) => {
    if (err) return res.status(400).json({ success: false, err });
    return res.status(200).json({ success: true });
  });
});

module.exports = router;
