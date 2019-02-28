// Test the ability to invoke provider functions via RPC.

let assert = require("assert");
let pulumi = require("../../../../../");

class MyCustomResource extends pulumi.CustomResource {
	constructor(name, args, opts) {
		super("test:index:MyCustomResource", name, args, opts);
	}
}

class MyComponentResource extends pulumi.ComponentResource {
	constructor(name, args, opts) {
		super("test:index:MyComponentResource", name, args, opts);
	}
}

//                cust1
//                    \
//                    cust2

let cust1 = new MyCustomResource("cust1", { }, { });
let cust2 = new MyCustomResource("cust2", { parentId: cust1.id }, { parent: cust1 });

let res1 = new MyCustomResource("res1", { }, { dependsOn: cust1 });
// let res2 = new MyCustomResource("res2", { }, { dependsOn: comp2 });
// let res3 = new MyCustomResource("res3", { }, { dependsOn: cust2 });
// let res4 = new MyCustomResource("res4", { }, { dependsOn: cust4 });