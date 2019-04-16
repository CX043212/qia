const goodsModel = require("../model/goods");
const addGoods = (req,res)=>{
	console.log(req.body);
	console.log(111199999);
	let {id,goodsName,goodsPrice,goodsDec} = req.body;
	let urlPath =  req.files.goodsImage[0].path.replace(/\\/g,"/").replace(/public/,"");
	console.log(urlPath);
	console.log(888);
	goodsModel.add({
			goodsName,
			goodsPrice,
			goodsDec,
			goodsImage:urlPath,
			id
		},(result)=>{
			console.log(result);
			if(result){
				res.json({
					status:true,
					info:"添加成功"
				})
			}else{
				res.json({
					status:false,
					info:"添加失败"
				})
			}
		})
 }
 const goodsList = (req,res)=>{
 	console.log(req.query);
	console.log(2222)
 	let {id,page,limit} = req.query;
 	goodsModel.findGoods({id,page,limit},(data)=>{
 		console.log(data)
		if(data.length>0){
				goodsModel.findGoodsCount({id},(result)=>{
					console.log(result)
					let count = result.length;
					let page = 1;
					console.log(count);
					res.json({
						status:true,
						data:data,
						count
					})
				})
 			
 		}else if(data.length==0){
			goodsModel.findGoodsCount({id},(result)=>{
				let count = 0;
				res.json({
					status:true,
					data:data,
					count
				})
            })
		}
 	})
 }
 const modifyGoods = (req,res)=>{
 	console.log(req.body);
	console.log(1111)
 	let {_id,goodsName,goodsPrice,goodsDec} = req.body;
 	let urlPath =  req.files.goodsImage[0].path.replace(/\\/g,"/").replace(/public/,"");
 	console.log(urlPath);
 	goodsModel.update({_id},{
 			goodsName,
 			goodsPrice,
 			goodsDec,
 			goodsImages:urlPath
 		},(result)=>{
 			console.log(result);
 			if(result){
 				res.json({
 					status:true,
 					info:"修改成功"
 				})
 			}else{
 				res.json({
 					status:false,
 					info:"修改失败"
 				})
 			}
 		})
 }
 const removeGoods = (req,res)=>{
 	console.log(req.body);
 	let _id = req.body;
 	goodsModel.remove({_id},(result)=>{
 			console.log(result);
 			if(result){
 				res.json({
 					status:true,
 					info:"删除成功"
 				})
 			}else{
 				res.json({
 					status:false,
 					info:"删除失败"
 				})
 			}
 		})
 }
module.exports = {
	addGoods,
	goodsList,
	modifyGoods,
	removeGoods
}