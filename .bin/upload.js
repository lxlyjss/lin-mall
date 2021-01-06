const path = require("path");
const child_process = require("child_process");

const distDir = path.resolve(__dirname, "../dist");

child_process.exec("scp -r " + distDir + "/* lxl:/usr/local/nginx/html/zhihui/", function(error, stdout) {
  console.log(error)
  console.log(stdout)
})