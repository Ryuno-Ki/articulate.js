export default {
    input: 'index.js',
    output: [{
        file: 'dist/articulate.common.js',
        format: 'cjs'
    }, {
        file: 'dist/articulate.amd.js',
        format: 'amd'
    }, {
        file: 'dist/articulate.es6.js',
        format: 'es'
    }, {
        file: 'dist/articulate.system.js',
        format: 'system'
    }, {
        file: 'dist/articulate.umd.js',
        format: 'umd',
        name: 'Articulate'
    }, {
        file: 'dist/articulate.js',
        format: 'iife',
        name: 'Articulate'
    }]
}
