var http = require('http')
var url = require('url')
var moment= require("moment")

    function parsetime (time) {
      return  ""+moment(time).format("MMMM")+" "+(moment(time).format("D"))+", "
      +moment(time).format("YYYY")
      
    }

    function unixtime (time) {
      return time.getTime()
    }

    var server = http.createServer(function (req, res) {
      var parsedUrl = url.parse(req.url, true)
      var time
      var reg = new RegExp("%20", 'g')
      if(parsedUrl.pathname.replace("/","")[0].match(/\D/)){
        time = new Date(parsedUrl.pathname.replace("/","").replace(reg," "))
      }
      else{
      time = new Date(parsedUrl.pathname.replace("/","")*1000)
      }
      var result_time
      var result_unix

     
        result_time = parsetime(time)
        result_unix = unixtime(time)
        

      if (result_time && result_unix) {
        res.writeHead(200, { 'Content-Type': 'application/json' })
        res.end(JSON.stringify({ "unix": result_unix/1000, "natural": result_time }))
      } else {
        res.writeHead(200, { 'Content-Type': 'application/json' })
        res.end(JSON.stringify({ "unix": null, "natural": null }))
      }
    })
    server.listen(8080,function(){
      console.log("Started 8080")
    })