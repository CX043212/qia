const userModel = require("../model/user");
const crypto = require('crypto');
const JWT = require("jsonwebtoken")
const register = (req,res)=>{
	console.log(req.body)
    let {username,password} = req.body;
    userModel.userFind({username},(result)=>{
        if(result){
            res.json({
                status:false,
                info:"用户名已存在"
            })
        }else{
			const hash = crypto.createHash('sha256');
			hash.update(password);
            userModel.userSave({username,password:hash.digest('hex')},(result)=>{
                if(result){
                    res.json({
                        status:true,
                        info:"注册成功"
                    })
                }
            })
        }
    })
}
const login = (req,res)=>{
	let {username,password} = req.body;
	userModel.userFind({username},(result)=>{
		if(result){
			const hash = crypto.createHash('sha256');
			hash.update(password);
			if(result.password == hash.digest('hex')){
				let payload = {
					username,
				}
				let secret = "Bk1821";
				let token =  JWT.sign(payload,secret,{expiresIn:"1h"})
				res.cookie("token",token);
				res.cookie("user",username);
				res.json({
					status:true,
					info:"登录成功",
					user:username
				});
			}else{
					res.json({
						status:false,
						info:"密码错误"
					});
				}
		}else{
			res.json({
				status:false,
				info:"用户名不存在"
			})
		}
	})
}
module.exports = {
	register,
    login
}




