function Login(container){
	this.container = container;
	this.init();
}
Login.Template = `
		<div id="box">
				<div class="widget-main">
					<h4>学员后台系统</h4>
					<form class="form-horizontal">
						<div class="form-group">
							<div class="col-sm-10">
								<input type="email" class="username" placeholder="身份证号码/学号">
							</div>
						</div>
						<div class="form-group">
							<div class="col-sm-10">
								<input type="password" class="password" placeholder="密码">
							</div>
						</div>
						<div class="form-group">
							<div class="col-sm-offset-2 col-sm-10">
								<button type="submit" class="btn-default">登录</button>
							</div>
						</div>
						<a href="html/register.html">立即注册</a>
					</form>
				</div>
		</div>

`
Login.prototype = {
    init(){
        this.createDom();
		this.useLogin();
    },
    createDom(){
        this.container.append(Login.Template)
    },
	useLogin(){
		$(".btn-default").on("click",$.proxy(this.useLoginClick,this))
	},
	useLoginClick(){
		var username = $(".username").val()
		var password = $(".password").val()
		 $.ajax({
			type : "post",
			url:"/api/login",
			// data:"data",
			data:{
			    username,
			    password
			},
			success:$.proxy(this.useLoginClickSuc,this)
		})
	},	
	useLoginClickSuc(data){
		if(data.status){
			alert("登录成功");
			window.location.href = "html/shop.html";
		}else{
			alert("账号与密码不匹配");
			location.reload(true);
		}
	}
}