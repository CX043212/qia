function TabBar() {
    this.container = $("#tabBar");
	this.details = $(".details");
	this.list = $("#list");
	this.page = 1;
    this.init();
}

TabBar.Template = `
    <ul class="tabNav">
        <li>
            <a href="##">系统首页</a>
        </li>
        <li>
            <a href="##">商家管理</a>
            <ul>
                <li><a href="##" id="show_seller">商家列表</a></li>
                <li><a href="##" id="add_seller">新增商家</a></li>
            </ul>
        </li>
        <li>
            <a href="##">条形图</a>
        </li>
        <li>
            <a href="##">矩形图</a>
        </li>
    </ul>
`;
TabBar.prototype = {
    init:function(){
        this.createDom();
        this.tabToggle();
		this.addSeller();
		this.sellerList();
    },
    createDom(){
        this.container.append(TabBar.Template);
    },
    tabToggle(){
		$(".tabNav>li").children(0).on("click",$.proxy(this.tabClick))
    },
    tabClick(){
	  $(this).next().slideToggle();
    },
	addSeller(){
		$("#add_seller").on("click",$.proxy(this.handleAdd,this))
	},
	handleAdd(){
		this.details.load("../../../html/addseller.html",$.proxy(this.handleSucc,this))
		this.list.html("");
		$("#countPage").html("");
	},
	handleSucc(){
		$("#add_seller_btn").on("click",$.proxy(this.handleAddSeller,this))
	},
	handleAddSeller(){
		this.sellerName = $("#seller-name");
		this.deliveryPrice = $("#delivery-price");
		this.sellerAddress = $("#seller-address");
		this.sellerTel = $("#seller-tel");
		this.sellerLogo = $("#seller-logo");
		var formData = new FormData();
		formData.append("sellerName",this.sellerName.val());
		formData.append("deliveryPrice",this.deliveryPrice.val());
		formData.append("sellerAddress",this.sellerAddress.val());
		formData.append("sellerTel",this.sellerTel.val());
		formData.append("sellerLogo",this.sellerLogo[0].files[0]);
		console.log(this.sellerLogo[0].files[0]);
		$.ajax({
			type:"post",
			url:"/seller/addseller",
			data:formData,
			contentType:false,
			processData:false,
			success:$.proxy(this.handleAddSucc,this)
		})
	},
	handleAddSucc(data){
		console.log(data)
	   if(data.status){
		     alert("添加成功"); 
			this.sellerName.val("")
			this.deliveryPrice.val("")
			this.sellerAddress.val("")
			this.sellerTel.val("")
			this.sellerLogo.val("")
	   }   
	},
	sellerList(){
	    $("#show_seller").on("click",this.listClickSuc,$.proxy(this.showListSuc,this))
	},
	showListSuc(params){
		console.log(params)
		this.details.text("");
		$.ajax({
		       type: "get",
		       url:"/seller/sellerList",
		       data: {
		            page: this.page,
		            limit: 8
		        },
		        success: $.proxy(Object.prototype.toString.call(params) == "[object Function]"?params:params.data, this)
		    })
		},
	listClickSuc(data){
		console.log(data);
		this.goodslist(data);
		new LayPage().init(this,data);
	},
	getListPageSucc(data){
		console.log(data);
		this.goodslist(data);
	},
	goodslist(data){
		// console.log(data);
		var str = `
			<tr><td>logo</td><td>商家名称</td><td>起送价格</td><td>商家地址</td><td>联系电话</td><td>操作</td></tr>
		`;
		for(var i = 0;i < data.data.length;i ++){
			str += `
				<tr class="seller-item" data-id=${data.data[i]._id}>
					<td class='seller-logo'><img src="http://localhost:3000${data.data[i].sellerLogo}" /></td>
					<td class='seller-name'>${data.data[i].sellerName}</td>
					<td class='delivery-price'>${data.data[i].deliveryPrice}</td>
					<td class='seller-address'><p id="address">${data.data[i].sellerAddress}<p></td>
					<td class='seller-tel'>${data.data[i].sellerTel}</td>
					<td>
					<button type="button" class='modify' data-toggle="modal" data-target="#modify_model">编辑</button>
					<button type="button" class='check' data-toggle="modal" data-target="#check_model">查看</button>
					<button type="button" class='add' data-toggle="modal" data-target="#add_goods_model">添加</button>
					<button type="button" class='delete' data-toggle="modal" data-target="#delete_model">删除</button>
					</td>
				</tr>
`
		}
		this.list.html(str);
		var sellerList = $(".seller-item");
 		new Modify(sellerList);
 		new addGoods(sellerList);
		new remove(sellerList);
	},
}

new TabBar();
