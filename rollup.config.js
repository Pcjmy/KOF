import babel from 'rollup-plugin-babel'
import resolve from 'rollup-plugin-node-resolve'

export default {
    input: 'static/js/base.js',
    output: {
        file: 'bundle.js',
        format: 'iife'
    },
    plugins: [
        resolve(),
        babel({
            exclude: 'node_modules/**'
        })
    ],
}