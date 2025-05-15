import fs from 'fs';
import path from 'path';
import babel from '@rollup/plugin-babel';
import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';

const inputDir = 'src/js';
const outputDir = 'dist/js';

const entries = fs
	.readdirSync(inputDir)
	.filter((file) => file.endsWith('.js'))
	.reduce((acc, file) => {
		acc[path.join(outputDir, file)] = path.join(inputDir, file);
		return acc;
	}, {});

export default Object.entries(entries).map(([outFile, inFile]) => ({
	input: inFile,
	output: {
		file: outFile,
		format: 'iife',
		sourcemap: true,
		name: 'MyBundle',
	},
	plugins: [
		resolve(),
		commonjs(),
		babel({
			babelHelpers: 'bundled',
			presets: ['@babel/preset-env'],
		}),
	],
}));
