import * as express from 'express';
const app = express();

app.get('/wsdl', (req, res) => {
  res.sendFile('wsdl.wsdl', {
    root: __dirname,
    headers: { 'content-type': 'text/xml' }
  });
});

app.all('/', (req, res) => {
  res.set('content-type', 'text/xml');

  // envelope created by legacy system
  const envelope =
    '<?xml version="1.0" encoding="UTF-8"?>' +
    '<soap:Envelope xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:ns="urn:SoapServer">' +
    '<soap:Body>' +
    '<ns:Login soap:encodingStyle="http://schemas.xmlsoap.org/soap/encoding/">' +
    '<LoginResult xsi:type="xsd:string">some-token</LoginResult>' +
    '</ns:Login>' +
    '</soap:Body>' +
    '</soap:Envelope>';

  // envelope created according to the soap tutorial
  const envelope2 =
    '<?xml version="1.0" encoding="utf-8"?>' +
    '<soap:Envelope xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/"  xmlns:tns="urn:SoapServer">' +
    '<soap:Body>' +
    '<tns:LoginResponse>' +
    '<tns:LoginResult>some-token</tns:LoginResult>' +
    '</tns:LoginResponse>' +
    '</soap:Body>' +
    '</soap:Envelope>';

  res.send(envelope);
  //res.send(envelope2);
});

app.listen(8000, () => {
  console.log('http://localhost:8000/wsdl');
});
