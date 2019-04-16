function addGoods(info){
	this.info = info;
	this.init();
}
addGoods.prototype = {
	init(){
		this.add();
	},
	add(){
		this.info.each($.proxy(this.handleEach,this));
	},
	handleEach(i){
		this.info.eq(i).on("click",i,$.proxy(this.infoClick,this));
		this.sellerList(i);
	},
	infoClick(e){
		console.log(e.data)
		this.i = this.info.eq(e.data).attr("data-id");
		// var id = this.info.eq(e.data).attr("data-id");
		this.goodsName = $("#add-goods-name");
		this.goodsPrice = $("#add-goods-price");
		this.goodsDec = $("#add-goods-dec");
		this.goodsImage = $("#add-goods-image");
		this.id = $("#modify_model")
		this.id .attr("data-id",this.i);
		this.handleSucc();
	},
	handleSucc(){
		$("#js_add_goods_btn").on("click",$.proxy(this.handleAddGoods,this))
		},
		handleAddGoods(){
			// \11event.stopPropagation();
			console.log(this.id)
			var formData = new FormData();
			formData.append("id", this.id.attr("data-id"));
			formData.append("goodsName",this.goodsName.val())
			formData.append("goodsPrice",this.goodsPrice.val())
			formData.append("goodsDec",this.goodsDec.val())
			formData.append("goodsImage",this.goodsImage[0].files[0])
			$.ajax({
				type:"post",
				url:"/goods/addGoods",
				data:formData,
				contentType:false,
				processData:false,
				success:$.proxy(this.handleAddSucc,this)
			})
		},
		handleAddSucc(data){
			console.log(data);
		   if(data.status){
			     alert("添加成功"); 
				 location.reload(true);
			}
	},
	sellerList(i){
	   this.info.eq(i).on("click",this.showListGoods,$.proxy(this.showList,this))
	   this.page = 1;
	},
	showList(params){
		 // this.page = 1;
		$.ajax({
			type:"get",
			url:"/goods/goodsList",
			 data: {
				 id:this.i,
				 page:this.page,
				 limit: 8
			 },
			  success: $.proxy(Object.prototype.toString.call(params) == "[object Function]"?params:params.data, this)
		})
	},
	showListGoods(data){
			this.goodslist(data);
			new LayPageGoods().init(this,data);
	},
	getListPageSucc(data){
		console.log(data);
		this.goodslist(data);
	},
	goodslist(data){
			var str = `
				<tr><td>商品名称</td><td>商品图片</td><td>商品价格</td><td>描述</td><td>操作</td></tr>
			`;
			for(var i = 0;i < data.data.length;i ++){
				str += `
					<tr class="goods-item" data-id=${data.data[i]._id}>
					<td class='goods-image'><img src="http://localhost:3000${data.data[i].goodsImage}" /></td>
						<td class='goods-name'>${data.data[i].goodsName}</td>
						<td class='goods-price'>${data.data[i].goodsPrice}</td>
						<td class='goods-dec'><p>${data.data[i].goodsDec}<p></td>
						<td>
						<button type="button" class='modify' data-toggle="modal" data-target="#modify_goods_model">编辑</button>
						<button type="button" class='delete' data-toggle="modal" data-target="#delete_goods_model">删除</button>
						</td>
					
					</tr>
	`
			}
	$("#sh").html(str);
	var goodsList = $(".goods-item");
	new modifyGoods(goodsList);
	new removeGoods(goodsList);
	}
 }