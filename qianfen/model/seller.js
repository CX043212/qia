const mongoose = require("../utils/database").mongoose;
const Seller = mongoose.model("seller",{
	"sellerName" : String ,
	"deliveryPrice" : String ,
	"sellerAddress" : String ,
	"sellerTel" : String ,
	"sellerLogo" : String 
})
const add = (Info,cb)=>{
	console.log(Info)
	let seller = new Seller(Info);
	seller.save().then((result)=>{
		cb(result)
	})
}
const findSeller = (Info,cb)=>{
	Seller.find().skip((Info.page - 1)*Info.limit).limit(Number(Info.limit)).then((data)=>{
		cb(data)
	})
}
const findSellerCount = (cb)=>{
	Seller.find().then((data)=>{
		cb(data);
	})
}
const update = (sellerId,modifySeller,cb)=>{
	Seller.update(sellerId,{$set:modifySeller}).then((result)=>{
		cb(result)
	})
}
const remove = (sellerId,cb)=>{
	Seller.remove(sellerId).then((result)=>{
		cb(result)
	})
}
// const addGoods = (sellerId,goodsInfo,cb)=>{
// 	Seller.add(sellerId,{$set:modifySeller}).then((result)=>{
// 		cb(result)
// 	})
// 	
// 	goods.save().then((result)=>{
// 		cb(result)
// 	})
// }
module.exports = {
    add,
	findSeller,
	findSellerCount,
	update,
	remove
}