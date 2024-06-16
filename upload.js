/* eslint-disable @typescript-eslint/no-var-requires */
const OSS = require('ali-oss');
const path = require('path');

if (process.env.bucket) {
  const store = new OSS({
    region: 'oss-cn-beijing',
    accessKeyId: process.env.accessKeyId,
    accessKeySecret: process.env.accessKeySecret,
    bucket: process.env.bucket,
  });
  store.put('vscode.index.js', path.join(__dirname, 'dist', 'vscode.index.js')).then((result) => {
    console.log(result.url);
  });
  store
    .put('vscode.index.css', path.join(__dirname, 'dist', 'vscode.index6.css'))
    .then((result) => {
      console.log(result.url);
    });
}
