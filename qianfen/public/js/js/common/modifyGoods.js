function modifyGoods(info){
	this.info = info;
	this.init();
}
modifyGoods.prototype = {
	init(){
		this.modify();
	},
	modify(){
		this.info.each($.proxy(this.handleEach,this));
	},
	handleEach(i){
		this.info.eq(i).on("click",i,$.proxy(this.infoClick,this))
	},
	infoClick(e){
		console.log(e.data)
		var id = this.info.eq(e.data).attr("data-id");
		var goodsName = this.info.eq(e.data).find(".goods-name").text();
		var goodsPrice = this.info.eq(e.data).find(".goods-price").text();
		var goodsDec = this.info.eq(e.data).find(".goods-dec").text();
		this.goodsName = $("#modify-goods-name")
		this.goodsName.val(goodsName)
		this.goodsPrice = $("#modify-goods-price")
		this.goodsPrice.val(goodsPrice)
		this.goodsDec= $("#modify-goods-dec")
		this.goodsDec.val(goodsDec)
		this.goodsImage = $("#modify-goods-image");
		this.id = $("#modify_model")
		this.id .attr("data-id",id);
		console.log(this.id);
		this.modifyClick();
	},
	 modifyClick(){
	        $("#js_modify_goods_btn").on("click",$.proxy(this.handleModifyClick,this))
	    },
	 handleModifyClick(){
	    var formData = new FormData();
		formData.append("_id", this.id.attr("data-id"));
	    formData.append("goodsName",this.goodsName.val());
	    formData.append("goodsPrice",this.goodsPrice.val());
	    formData.append("goodsDec",this.goodsDec.val());
	    formData.append("goodsImage",this.goodsImage[0].files[0]);
		console.log(
		    this.goodsName.val(),
		    this.goodsPrice.val(),
			this.goodsDec.val(),
			this.goodsImage[0].files[0]
		);
	    $.ajax({
	    	type:"post",
	    	url:"/goods/modifyGoods",
	    	data:formData,
	    	contentType:false,
	    	processData:false,
	    	success:$.proxy(this.handleModifySucc,this)
	    })
	},
	handleModifySucc(data){
		if(data.status){
			alert("修改成功");
			location.reload(true);
		}
	}
}
   
      
   