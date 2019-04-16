function remove(info){
	this.info = info;
	this.init();
}
remove.prototype = {
	init(){
		this.delete();
	},
	delete(){
		this.info.each($.proxy(this.handleEach,this));
	},
	handleEach(i){
		this.info.eq(i).on("click",i,$.proxy(this.handleDelete,this))
	},
	handleDelete(e){
		console.log(e.data)
		var id = this.info.eq(e.data).attr("data-id");
		this.id = $("#modify_model")
		this.id .attr("data-id",id);
		this.handleDeleteCli();
	},
	handleDeleteCli(){
		$("#js_delete_sllers_btn").on("click",$.proxy(this.handleDeleteSuc,this))
	},
	handleDeleteSuc(){
			var formData = new FormData();
			formData.append("_id", this.id.attr("data-id"));
			$.ajax({
				type:"post",
				url:"/seller/removeSeller",
				data:formData,
				contentType:false,
				processData:false,
				success:$.proxy(this.handleDeleteClickSuc,this)
			})
		},
		handleDeleteClickSuc(data){
			if(data.status){
				location.reload(true);
			}
		}
	
  }