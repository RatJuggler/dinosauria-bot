const https = require('https');

function get(url) {
    return new Promise((resolve, reject) => {
        let request = https.get(url, (response) => {
            if (response.statusCode < 200 || response.statusCode >= 300) {
                return reject(new Error(": Invalid status code: " + response.statusCode));
            }
            let body = [];
            response.on('data', (chunk) => {
                body.push(chunk);
            });
            response.on('end', () => {
                try {
                    body = Buffer.concat(body).toString();
                } catch(error) {
                    reject(error);
                }
                resolve({ response, body });
            });
        });
        request.on('error', (error) => {
            reject(error);
        });
    });
}

module.exports.get = get;
