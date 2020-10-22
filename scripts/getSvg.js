//  getSvg.js
var fs = require('fs');
var path = require('path');
const SVGO = require('svgo');
const svgo = new SVGO();

const ENTRY_DIR = '../app/resources/svg';
const OUT_FILE = path.resolve(__dirname, '../app/resources/svg/svgs.js');
const SVG_DIR = path.resolve(__dirname, ENTRY_DIR);

// 将fs.readdir简单包装Promise
function readdir(dir) {
  return new Promise((resolve, reject) => {
    fs.readdir(dir, 'utf-8', (err, data) => {
      if (err) {
        reject(err)
      } else {
        resolve(data)
      }
    })
  })
}

// 将fs.stat简单包装Promise
function stat(filedir) {
  return new Promise((resolve, reject) => {
    fs.stat(filedir, (err, data) => {
      if (err) {
        reject(err)
      } else {
        resolve(data)
      }
    })
  })
}

// 读取单个svg文件包装Promise并压缩svg
function readfile(filepath) {
  return new Promise((resolve, reject) => {
    fs.readFile(filepath, 'utf8', async function (err, data) {
      if (err) reject(err);
      const newData = await svgo.optimize(data, { path: filepath })
      const key = filepath
        .slice(0, filepath.lastIndexOf('.'))
        .replace(SVG_DIR + '/', '')
        .replace(SVG_DIR + '\\', '')
        .replace('\\', '/')
      resolve({
        [key]: newData.data,
      });
    });
  });
}

// 读取所有svg
async function readSvgs() {
  const files = await getFiles(SVG_DIR);
  return Promise.all(
    files
      .filter(filename => filename.search(/[.](svg)$/g) !== -1)
      .map(filename => readfile(filename))
  )
}

// 递归遍历一个文件夹下所有的文件
async function getFiles(dir) {
  let result = [];
  try {
    const files = await readdir(dir);
    for (let filename of files) {
      // 当前文件的绝对路径
      const filedir = path.join(dir, filename);
      // 根据文件路径获取文件信息
      const stats = await stat(filedir);
      let files = [filedir];
      // 如果是文件夹，则继续递归
      if (stats.isDirectory()) {
        files = await getFiles(filedir);
      }
      result = [
        ...result,
        ...files,
      ]
    }
  } catch(e) {
    return Promise.reject(e);
  }
  return result
}

// 生成js文件
readSvgs().then(data => {
  let svgFile = 'export default ' + JSON.stringify(Object.assign.apply(this, data));
  fs.writeFile(OUT_FILE, svgFile, function (err) {
    if (err) throw new Error(err);
    else console.log(`${SVG_DIR}下svg文件全部生成完毕\n`);
  })
}).catch(err => {
  throw new Error(err);
});
