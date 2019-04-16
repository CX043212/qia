var express = require('express');
var router = express.Router();
var sellerController = require("../controller/seller");
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
var cpUpload = upload.fields([{ name: 'sellerLogo', maxCount: 1}])

router.post('/addseller',cpUpload,sellerController.addSeller);
router.get('/sellerList',sellerController.sellerList);
router.post('/modifySeller',cpUpload,sellerController.modifySeller)
router.post('/removeSeller',cpUpload,sellerController.removeSeller)

module.exports = router;


