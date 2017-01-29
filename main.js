var fileSystem = require('fs');

var regExp = new RegExp(/^(\b(?:\d+\.){3}\d+\b)/, "gm");
var file = fileSystem.readFileSync('access.log', 'utf8');
var ips = file.match(regExp);

groupedIps = {}
ips.forEach(function(ip, index, array) {
	let parts = ip.split(".").splice(0,3);
	let common = parts.join(".");
	if (groupedIps[common] == undefined) {
		groupedIps[common] = []
		ips.forEach(function(ip, index, array) {
			if (ip.indexOf(common) > -1 && groupedIps[common].indexOf(ip) == -1) {
				groupedIps[common].push(ip)
			}
		})
	}
})

for(let common in groupedIps) {
	console.log("Common = " + common);
	groupedIps[common].forEach(function(ip, index, array){
		console.log(" " + ip);
	})
}