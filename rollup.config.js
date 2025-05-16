import fs from 'fs';
import path from 'path';
import babel from '@rollup/plugin-babel';
import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import terser from '@rollup/plugin-terser';

const inputDir = 'src/js';
const outputDir = 'dist/js';

export default function createConfig(isProd) {
	const entries = fs
		.readdirSync(inputDir)
		.filter((file) => file.endsWith('.js'))
		.reduce((acc, file) => {
			acc[path.join(outputDir, file)] = path.join(inputDir, file);
			return acc;
		}, {});

	return Object.entries(entries).map(([outFile, inFile]) => ({
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
			...(isProd ? [terser()] : []),
		],
	}));
}
