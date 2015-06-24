var _fs,
  path= require("path"),
  resolve= require("resolve")

function ReflectMachinery(dep, mod){
	var value= require(dep),
	  basedir= findDir(mod)
	return new Promise(function(cb, reject){
		var opts= mod ? {
			basedir: basedir
		} : undefined
		resolve(dep, function(err, res, pkg){
			if(err){
				reject(err)
				return
			}
			if(pkg){
				Object.defineProperty(value, "_pkg", {
					value: pkg
				})
			}
			var dir= path.dirname(res)
			Object.defineProperty(value, "_dir", {
				value: dir
			})
			if(value.__proto__ !== Object.prototype){
				console.warn("unexpected prototype:", value.__proto__.constructor.name)
			}
			value.__proto__= ReflectMachine.prototype
			cb(value)
		})
	})
}
module.exports= exports= ReflectMachinery
exports.ReflectMachinery= ReflectMachinery

function ReflectMachine(machinePack){
	Object.defineProperty(this, "pkg", {
		get: function(){
			return machinePack.pkg
		}
	})
	Object.defineProperty(this, "dir", {
		get: function(){
			return machinePack.dir
		}
	})
}
exports.ReflectMachine= ReflectMachine

function fs(){
	_fs= require("fs")
	fs= function(){
		return _fs
	}
	return _fs
}

function findDir(mod){
	if(!mod){
		return
	}
	if(mod.filename){
		return path.dirname(mod.filename)
	}
	if(mod[mod.length-1] === "/"){
		return mod
	}
	return fs().statsSync(mod).isDirectory() ? mod : path.dirname(mod)
}
