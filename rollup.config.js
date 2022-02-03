import svelte from 'rollup-plugin-svelte';
import commonjs from '@rollup/plugin-commonjs';
import resolve from '@rollup/plugin-node-resolve';
import livereload from 'rollup-plugin-livereload';
import { terser } from 'rollup-plugin-terser';
import sveltePreprocess from 'svelte-preprocess';
import typescript from '@rollup/plugin-typescript';
import css from 'rollup-plugin-css-only';

const production = !process.env.ROLLUP_WATCH;
const pi = process.env.PI === 'true';

function serve() {
	let server;

	function toExit() {
		if (server) server.kill(0);
	}

	return {
		writeBundle() {
			if (server) return;
			server = require('child_process').spawn('npm', ['run', 'start', '--', '--dev'], {
				stdio: ['ignore', 'inherit', 'inherit'],
				shell: true
			});

			process.on('SIGTERM', toExit);
			process.on('exit', toExit);
		}
	};
}

export default {
	input: 'src/main.ts',
	output: {
		sourcemap: true,
		format: 'iife',
		name: 'app',
		file: 'public/build/bundle.js'
	},
	plugins: [
		svelte({
			preprocess: sveltePreprocess({ 
				sourceMap: !production,
				postcss: {
					// syntax: "postcss-scss",
					plugins: [
						require("tailwindcss/nesting"),
						require("tailwindcss"),
						require("autoprefixer"),
					]
				},
			}),
			compilerOptions: {
				// enable run-time checks when not in production
				dev: !production
			}
		}),
		// we'll extract any component CSS out into
		// a separate file - better for performance
		css({ output: 'bundle.css' }),

		// If you have external dependencies installed from
		// npm, you'll most likely need these plugins. In
		// some cases you'll need additional configuration -
		// consult the documentation for details:
		// https://github.com/rollup/plugins/tree/master/packages/commonjs
		resolve({
			browser: true,
			dedupe: ['svelte']
		}),
		commonjs(),
		typescript({
			sourceMap: !production,
			inlineSources: !production
		}),

		pi && !production && copyChanges(),
		pi && !production && startRemotely(),

		// In dev mode, call `npm run start` once
		// the bundle has been generated
		!pi && !production && serve(),

		// Watch the `public` directory and refresh the
		// browser on changes when not in production
		!pi && !production && livereload('public'),

		// If we're building for production (npm run build
		// instead of npm run dev), minify
		production && terser()
	],
	watch: {
		clearScreen: false,
		delay: 3000,
	}
};

function copyChanges() {
	console.log("copying changed files to remote pi");
	return {
		writeBundle() {
			require('child_process').spawnSync('rsync', ['-aP', '--delete', '--exclude="node_modules/"', '$(pwd)/', "pi@10.8.13.45:/home/pi/Documents/source/repos/smokerpielectron"], {
				stdio: ['ignore', 'inherit', 'inherit'],
				shell: true,
			});
		}
	}
}

function startRemotely() {
	console.log("starting on remote pi");
	let started = false;
	return {
		writeBundle() {
			if (!started) {
				started = true;

				require('child_process').spawn('ssh', ['pi@10.8.13.45', '"cd /home/pi/Documents/source/repos/smokerpielectron && yarn install && yarn run electron-dev-pi"'], {
					stdio: ['ignore', 'inherit', 'inherit'],
					shell: true,
				});
			}
		}
	}
}
