const express = require("express");
const router = express.Router();
const multer = require("multer");
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

module.exports = router;
