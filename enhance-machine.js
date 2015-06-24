var
  path= require("path")
  machine= require("machine"),
  resolve= require("resolve"),
  reflectMachinery= require("./reflect-machinery")

function ReflectMachinery(existing){
	if(existing.name === "ReflectMachinePack_pack"){
		return existing
	}
	return function ReflectMachinePack_pack(machinePack){
		var machines= existing.call(machine, machinePack)
		reflectMachinery.ReflectMachine.call(machines, machinePack)
		return machines
	}
}

module.exports= new Promise(function(cb, reject){
	resolve("machine", function(err, res){
		if(err){
			reject(err)
			return
		}
		var cached= require.cache[res]
		if(!cached){
			reject("Did not find module")
			return
		}
		if(!cached.exports.pack){
			reject("Did not find pack")
			return
		}
		var packPath = path.dirname(res) + "/lib/Machine.pack.js"
		var constructorPath = path.dirname(res) + "/lib/Machine.constructor.js"
		require.cache[res].exports.pack= ReflectMachinery(require.cache[res].exports.pack)
		require.cache[packPath].exports= ReflectMachinery(require.cache[packPath].exports)
		require.cache[constructorPath].exports.pack= ReflectMachinery(require.cache[constructorPath].exports.pack)
		machine.pack= ReflectMachinery(machine.pack)
		cb(machine)
	})
})
