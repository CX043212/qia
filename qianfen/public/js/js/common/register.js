function Register(container){
	this.container = container;
	this.init();
}
Register.Template = `
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
						<button type="submit" class="btn-default">注册</button>
					</div>
				</div>
				<a href="../index.html">已有账号，请登录</a>
			</form>
		</div>
	</div>
`
Register.prototype = {
	init(){
		this.createDom();
		this.useRegister();
	},
	createDom(){
		this.container.append(Register.Template);
	},
	useRegister(){
		$(".btn-default").on("click",$.proxy(this.useRegisterClick,this))
	},
	useRegisterClick(){
		var username = $(".username").val();
		var password = $(".password").val();
		console.log(username);
		$.ajax({
			type:"post",
			url:"/api/register",
			data:{
				username,
				password
			},
			success:$.proxy(this.useRegisterClickSuc,this)
		})
	},
	useRegisterClickSuc(data){
		if(data.status){
			alert("注册成功");
			window.location.href = "../../../index.html";
		}else{
			alert("注册失败");
			location.reload(true);
		}
	}
}
new Register($("#container"));