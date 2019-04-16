function Page(){
    this.container = $("#container");
    this.init();
}
Page.prototype = {
    init(){
        this.create();
    },
    create(){
        this.login = new Login(this.container);
		// this.register =  new Register(this.container);
    }
}
new Page();