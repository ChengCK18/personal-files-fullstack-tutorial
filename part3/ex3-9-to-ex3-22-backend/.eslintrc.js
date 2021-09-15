module.exports = {
	'env': {
		'node': true,
		'commonjs': true,
		'es2021': true
	},
	'extends': 'eslint:recommended',
	'parserOptions': {
		'ecmaVersion': 12
	},
	'rules': {
		'indent': [
			'error',
			'tab'
		],
		'linebreak-style': [
			'error',
			'windows'
		],
		'no-unused-vars': [2, { 'vars': 'all', 'args': 'none' }],
		'quotes': [
			'error',
			'single'
		],
		'semi': [
			'error',
			'never'
		]
	}
}
