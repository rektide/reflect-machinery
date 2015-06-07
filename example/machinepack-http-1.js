#!/usr/bin/env node

function noGood(err){
	console.error("no good:", err)
	process.exit(1)
}

function simpleHttp(httpPack){
	console.log("pkg:", httpPack.pkg)
	console.log("dir:", httpPack.dir)
	
	httpPack.fetchWebpageHtml({
		url: "http://voodoowarez.com",
	}).exec({
		error: noGood,
		notFound: noGood,
		badRequest: noGood,
		forbidden: noGood,
		unauthorized: noGood,
		serverError: noGood,
		requestFailed: noGood,
		success: function(html){
			console.log("ok")
		}
	})
}

module.exports= exports= simpleHttp

exports.main= function(){
	var reflect= require("..")
	reflect("machinepack-http").then(simpleHttp)
}

if(require.main === module){
	exports.main()
}
