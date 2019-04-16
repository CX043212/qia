function Modify(info){
	this.info = info;
	this.init();
}
Modify.prototype = {
	init(){
		this.modify();
 		// this.modifyClick();
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
		var sellerName = this.info.eq(e.data).find(".seller-name").text();
		var deliveryPrice = this.info.eq(e.data).find(".delivery-price").text();
		var sellerAddress = this.info.eq(e.data).find(".seller-address").text();
		var sellerTel = this.info.eq(e.data).find(".seller-tel").text();
		console.log(id);
		this.sellerName = $("#Modify-seller-name")
		this.sellerName.val(sellerName)
		this.deliveryPrice = $("#Modify-delivery-price")
		this.deliveryPrice.val(deliveryPrice)
		this.sellerAddress = $("#Modify-seller-address")
		this.sellerAddress.val(sellerAddress)
		this.sellerTel = $("#Modify-seller-tel")
		this.sellerTel.val(sellerTel)
		this.sellerLogo = $("#Modify-seller-logo");
		this.id = $("#modify_model")
		this.id .attr("data-id",id);
		console.log(this.id);
		this.modifyClick();
	},
	 modifyClick(){
	        $("#js_Modify_seller_btn").on("click",$.proxy(this.handleModifyClick,this))
	    },
	 handleModifyClick(){
		 console.log(this.id)
	    var formData = new FormData();
	    formData.append("_id", this.id.attr("data-id"));
	    formData.append("sellerName",this.sellerName.val());
	    formData.append("deliveryPrice",this.deliveryPrice.val());
	    formData.append("sellerAddress",this.sellerAddress.val());
	    formData.append("sellerTel",this.sellerTel.val());
	    formData.append("sellerLogo",this.sellerLogo[0].files[0]);
		console.log(
		    this.sellerName.val(),
		    this.deliveryPrice.val(),
		    this.sellerAddress.val(),
			this.sellerTel.val(),
			this.sellerLogo[0].files[0]
		);
	    $.ajax({
	    	type:"post",
	    	url:"/seller/modifySeller",
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
   
      
   