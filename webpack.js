import path from 'node:path';
import webpack from 'webpack';
import {promisify} from 'node:util';
import {fileURLToPath} from 'node:url';

const dirName = path.dirname(fileURLToPath(import.meta.url));

try {
    const stats = await promisify(webpack)({
        mode: 'development',
        devtool: false,
        entry: path.join(dirName, 'src', 'bootstrap.js'),
        output: {
            path: path.join(dirName, 'dist'),
            publicPath: '/dist/',
        },
        plugins: [
            new webpack.container.ModuleFederationPlugin({
                runtime: 'test',
                shared: {
                    'redux-register': {
                        singleton: true,
                    },
                },
            }),
        ],
    });
    console.log(stats.toString({colors: true}));
} catch (e) {
    console.error(e);
}
