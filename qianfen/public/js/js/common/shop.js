function Shop(container){
	this.container = container;
	this.init();
}
Shop.Template = `
	<nav class="navbar navbar-default">
			<div class="navbar-header">
			    <a href="#">
			        <img src="http://jx.1000phone.net/Public/assets/css/images/logo.png?1547187780">
			    </a>
			</div>
			<div class="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
					<ul class="nav navbar-nav">
						<li class="active"><a href="#">千峰简介<span class="sr-only">(current)</span></a></li>
						<li><a href="#">千峰详情</a></li>
					</ul>
					<ul class="nav navbar-nav navbar-right">
						<li class="dropdown">
							<a href="#" class="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false"><span class="one"></span><span class="caret"></span></a>
							<ul class="dropdown-menu">
								<li><a href="../index.html">退出</a></li>
							</ul>
						</li>
					</ul>
			</div>
		</div>
	</nav>
`
Shop.prototype = {
	init(){
		this.createDom();
		this.loginSuccess();
	},
	createDom(){
		this.container.append(Shop.Template);
	},
	loginSuccess(){
		var user = $.cookie("user");
		// console.log(user);
		$(".dropdown-toggle>.one").text(user);
	},
}
new Shop($("#header"))