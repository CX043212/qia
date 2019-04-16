function LayPage(){}
LayPage.prototype = {
	init(that,data){
		layui.use('laypage',function(){
			var laypage = layui.laypage;
			laypage.render({
				 elem: "countPage",
				 count: data.count,
				 limit: 8,
				 jump: function (obj, first) {
				       // if (!first) {
				          that.page = obj.curr;
						  that.showListSuc(that.getListPageSucc);
				     // }
				  }
			})
		})

}
}