var
  path= require("path")
  machine= require("machine"),
  resolve= require("resolve"),
  reflectMachinery= require("./reflect-machinery"),
  _pack= machine.pack

function EnhanceMachine_pack(machinePack){
	var machines= _pack.call(machine, machinePack)
	reflectMachinery.ReflectMachine.call(machines, machinePack)
	machines.__proto__= reflectMachinery.ReflectMachine.prototype
	return machines
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
		require.cache[res].exports.pack= EnhanceMachine_pack
		require.cache[packPath].exports= EnhanceMachine_pack
		require.cache[constructorPath].exports.pack= EnhanceMachine_pack
		machine.pack= EnhanceMachine_pack
		cb(machine)
	})
})
