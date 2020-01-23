/**  EXPORT ALL FUNCTIONS
 *
 *   Loads all files that have a specific extension
 *   Default extension is .f.js
 *   Exports a cloud function matching the file name
 *
 *   Based on this thread:
 *     https://github.com/firebase/functions-samples/issues/170
 */
require = require('esm')(module /*, options*/)
import { resolve } from 'path'
import glob from 'glob'

export default (folder, exports, extension = 'Editor.js') => {
    const files = glob.sync(`./**/*${extension}`, {
        cwd: resolve(folder),
        ignore: './node_modules/**',
    })

    for (let f = 0, fl = files.length; f < fl; f++) {
        const file = files[f]

        const mod = require(resolve(folder, file))
        exports[functionName] = mod.default || mod
    }
}
