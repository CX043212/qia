const mongoose = require("../utils/database").mongoose;
const Goods = mongoose.model("goods",{
	"id": String,
	"goodsName" : String ,
	"goodsPrice" : String ,
	"goodsDec" : String ,
	"goodsImage" : String 
})
const add = (Info,cb)=>{
	console.log(Info)
	let goods = new Goods(Info);
	goods.save().then((result)=>{
		cb(result)
	})
}
const findGoods = (Info,cb)=>{
//  			console.log(Info)
//  			console.log(99)
// 			console.log(Info.page)
// 			console.log(Info.limit)
// 			console.log(Info.id)
		Goods.find({"id":Info.id}).skip((Info.page - 1)*Info.limit).limit(Number(Info.limit)).then((data)=>{
			// console.log(data)
			cb(data)
		})
}
const findGoodsCount = (Info,cb)=>{
	Goods.find({"id":Info.id}).then((data)=>{
		console.log(data)
		// console.log(222)
		cb(data);
	})
}
const update = (goodsId,modifyGoods,cb)=>{
	Goods.update(goodsId,{$set:modifyGoods}).then((result)=>{
		cb(result)
	})
}
const remove = (goodsId,cb)=>{
	Goods.remove(goodsId).then((result)=>{
		cb(result)
	})
}
module.exports = {
    add,
	findGoods,
	findGoodsCount,
	update,
	remove
}