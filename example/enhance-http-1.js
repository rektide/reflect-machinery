#!/usr/bin/env node

exports.main= function(){
	require("../enhance-machine").then(function(){
		var simpleHttp= require("./machinepack-http-1"),
		  httpPack= require("machinepack-http")
		simpleHttp(httpPack)
		console.log("great")
	}, function(err){
		console.log("wtf", err)
	})
}

if(require.main === module){
	exports.main()
}
