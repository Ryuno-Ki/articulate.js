const fs = require('fs');
const path = require('path');

const { promisify } = require('es6-promisify');

const readdir = promisify(fs.readdir);
const sourceDirectory = path.join(__dirname, 'src');
const testDirectory = path.join(__dirname, 'test');

function configFromFile (file) {
    return Promise.resolve({
        input: path.join(sourceDirectory, file),
        output: {
            file: path.join(testDirectory, file),
            format: 'cjs'
        }
    });
}

export default new Promise(async function (resolve, reject) {
    try {
        const files = await readdir(sourceDirectory);
        const jsFiles = files.filter((file) => {
            return !file.startsWith('.') && file.endsWith('.js')
        });
        return resolve(Promise.all(jsFiles.map(configFromFile)));
    } catch (exception) {
        return reject(exception);
    }
});
