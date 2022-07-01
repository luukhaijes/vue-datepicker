import commonjs from '@rollup/plugin-commonjs'; // Convert CommonJS modules to ES6
import vue from 'rollup-plugin-vue'; // Handle .vue SFC files
import buble from '@rollup/plugin-buble';
import typescript from "rollup-plugin-typescript"; // Transpile/polyfill with reasonable browser support

export default {
    input: 'src/wrapper.js', // Path relative to package.json
    output: {
        name: 'Datepicker',
        exports: 'named',
    },
    plugins: [
        typescript({
            tsconfig: false,
            experimentalDecorators: true,
            module: 'es2015'
        }),
        vue({
            css: true, // Dynamically inject css as a <style> tag
            compileTemplate: true, // Explicitly convert template to render function
        }),
        buble(), // Transpile to ES5
    ],
};