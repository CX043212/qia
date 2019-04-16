function LayPageGoods(){}
LayPageGoods.prototype = {
	init(that,data){
		layui.use('laypage',function(){
			var laypage = layui.laypage;
			laypage.render({
				 elem: "Page",
				 count: data.count,
				 page:1,
				 limit: 8,
				 jump: function (obj, first) {
				        // if (!first) {
						  console.log(that.page)
				          that.page = obj.curr;
						  that.showList(that.getListPageSucc);
						  
				       // }
				  }
			})
		})

}
}