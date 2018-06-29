
var fs = require("fs");
console.log("start");
var index = 0;

function withLines(lines) {
    lines.forEach(function (line) {
        console.log(index + " " + line);
        index++;
    });
}

var accumulated = "";

fs.createReadStream("companies.json").on("data", function (data) {
    console.log("\n \n \n" + data);
    //var parts = (accumulated + data).split("\n");
    //accumulated = parts.pop();
    //withLines(parts);
}).on("end", function () {
    // if (accumulated.length > 0) {
    //     withLines(accumulated.split("\n"));
    // }
    // console.log("end");
});