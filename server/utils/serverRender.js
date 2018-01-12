import fs from 'fs';
import path from 'path';
import Handlebars from 'handlebars';

let DEFAULT_STATE = {
    url_prefix: process.env.NODE_ENV !== 'production' ? '' : '/tempapi'
}

const readFileThunk = function (hbsName) {
    let filename = path.join(process.cwd(), `/server/views/${hbsName}`)
    return new Promise((resolve, reject) => {
        fs.readFile(filename, 'utf8', function (err, data) {
            if (err) return reject(err);
            resolve(data);
        });
    });
}

export async function renderHbs(hbsName, data = {}) {
    data = {...DEFAULT_STATE, ...data};
    var source = await readFileThunk(hbsName);
    var template = Handlebars.compile(source);
    return template(data);
}