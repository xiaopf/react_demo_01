const webpack = require('webpack');
const path = require('path');
const htmlWebPackPlugin = require('html-webpack-plugin');



module.exports = {
	entry : [
		'webpack-dev-server/client?http://localhost:3000',
		'webpack/hot/only-dev-server',
		'react-hot-loader/patch',
		path.join(__dirname,'app/index.js')
	],
	output : {
		path : path.join(__dirname,'dist'),
		filename : '[name].js',
		publicPath : '/'
	},
	plugins:[
        new htmlWebPackPlugin({
        	template:'./index.tpl.html',
        	inject:'body',
        	filename:'./index.html'
        }),
        new webpack.optimize.OccurrenceOrderPlugin(),
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoEmitOnErrorsPlugin(),
        new webpack.DefinePlugin({
        	'process.env.NODE_ENV':JSON.stringify('development')
        })
	],
	module:{
		rules: [
					{
						test: /(\.jsx|\.js)$/,
						exclude:/node_modules/,
						use: [{
								loader: 'babel-loader',
								 options: {
		                        	presets: ["es2015", "react"]
		                    	}
							},{
								loader: 'react-hot-loader/webpack',
							}]
					}, 

					{
						test: /(\.less|\.css)$/,
						exclude:/node_modules/,
						use: [{
								loader: 'style-loader'
							}, {
								loader: 'css-loader',
								// options: { modules: true }
							},{
								loader: 'less-loader'
							}	
						]
					}		
				]

	}
}