var express = require('express');
var router = express.Router();
var goodsController = require("../controller/goods");
var multer = require("multer");//文件上传
var storage = multer.diskStorage({
	  destination: function (req, file, cb) {
			cb(null, './public/img');
	 },
		filename: function (req, file, cb) {
			cb(null, Date.now()+ '-' + file.originalname);
	}
})
var upload = multer({ storage: storage });
var cpUpload = upload.fields([{ name: 'goodsImage', maxCount: 1}])
router.post('/addGoods',cpUpload,goodsController.addGoods);
router.get('/goodsList',goodsController.goodsList);
router.post('/modifyGoods',cpUpload,goodsController.modifyGoods)
router.post('/removeGoods',cpUpload,goodsController.removeGoods)

module.exports = router;