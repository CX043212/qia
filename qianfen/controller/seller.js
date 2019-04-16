const sellerModel = require("../model/seller");
const addSeller = (req,res)=>{
	console.log(req.body);
	let {sellerName,sellerAddress,sellerTel,deliveryPrice} = req.body;
	let urlPath =  req.files.sellerLogo[0].path.replace(/\\/g,"/").replace(/public/,"");
	console.log(urlPath);
	sellerModel.add({
			sellerName,
			deliveryPrice,
			sellerAddress,
			sellerTel,
			sellerLogo:urlPath
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
const sellerList = (req,res)=>{
	console.log(req.query)
	console.log("fenye")
	let {page,limit} = req.query;
	sellerModel.findSeller({page,limit},(data)=>{
		if(data.length>0){
			sellerModel.findSellerCount((result)=>{
				let count = result.length;
				// console.log(count)
				res.json({
					status:true,
					data:data,
					count
				})
			})
		}
	})
}
const modifySeller = (req,res)=>{
	console.log(req.body);
	console.log(1111)
	let {sellerName,sellerAddress,sellerTel,deliveryPrice,_id} = req.body;
	let urlPath =  req.files.sellerLogo[0].path.replace(/\\/g,"/").replace(/public/,"");
	sellerModel.update({_id},{
			sellerName,
			deliveryPrice,
			sellerAddress,
			sellerTel,
			sellerLogo:urlPath
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

const removeSeller = (req,res)=>{
	console.log(req.body);
	console.log(1111)
	let _id = req.body;
	sellerModel.remove({_id},(result)=>{
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
	addSeller,
	sellerList,
	modifySeller,
	removeSeller,
}

