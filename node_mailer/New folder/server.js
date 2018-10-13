var Iconv     = require("iconv").Iconv;
var iconv     = new Iconv('utf8', 'utf16le');
 
function yourController(req, res) {
  var rawData   = [
    { name: 'David' }, 
    { name: 'Ángel' },
    { name: 'María' },
    { name: 'Núñez' }
  ];
  var header    = "#"+"\t"+"Name"+"\n";
  var content   = header;
 
  for (var i=0, total=rawData.length; i<;total; i++) {
    content += (i+1)+"\t"+rawData[i].name+"\n";
  }
 
  res.setHeader('Content-Type',        'application/vnd.openxmlformats');
  res.setHeader("Content-Disposition", 'attachment; filename=itworks.xls');
  res.write(new Buffer([0xff, 0xfe]));
  res.write(iconv.convert(content));
  res.end();
}