const webpack = require('webpack');
const HtmlWebpackPlugin=require("html-webpack-plugin");
const MiniCssExtractPlugin=require("mini-css-extract-plugin");

const { PATHS, resolves,pages,commonCssLink } = require("./config.js")

// 多页面入口
function getEntrys(pages){
    let defaultHtmlOptions ={
        minify:{
            "collapseWhitespace":true,  // 折叠空白区域
            "collapseInlineTagWhitespace":true,
            "conservativeCollapse":true,
            "removeRedundantAttributes":true, // 删除多余的属性
            "removeAttributeQuotes": true, // 移除属性的引号
            "removeComments": true, // 移除注释
            "collapseBooleanAttributes": true // 省略只有boolean 值的属性值 例如：readonly checked
        },
        favicon:`${PATHS.entry}favicon.ico`,
        commonCssLink:[...commonCssLink]
    };
    let entrys = {};
    let HTMLPlugins = [];
    for (let key in pages){
        let page = pages[key];
        if(typeof page === "string"){
            let entry = page;
            let template = `${PATHS.views}${key}.html`;
            let filename = `${key}.html`;
            let title = `${key} Page`
            page = {
                entry,template,filename,title
            };
        }
        if(!page.chunks){
            page.chunks=['vendors',key]
        }
        entrys[key] = page.entry;
        let options = {
            title:page.title,
            template:page.template,
            filename:page.filename,
            chunks:page.chunks,
            commonCssLink:defaultHtmlOptions.commonCssLink,
            favicon:defaultHtmlOptions.favicon,
            minify:defaultHtmlOptions.minify,
            description:page.description||"",
            keywords:page.keywords||""
            
        }
        HTMLPlugins.push(new HtmlWebpackPlugin(options))
    }
    return {entrys,HTMLPlugins}
}

const {entrys,HTMLPlugins} = getEntrys(pages);
function baseConf(env,argv){
    const IS_DEV = env.mode !== 'production';
    console.log("IS_DEV:::",IS_DEV)
    return {
        entry:{
            ...entrys
        },
        target:"web",
        optimization: {
            splitChunks: {
                maxInitialRequests:Infinity,
                automaticNameDelimiter: '.',
                cacheGroups:{
                    react: {  
                        name: "react.common",
                        chunks: "initial",
                        test: /(react-router)|(react[\\/]cjs[\\/]react)|(react-dom[\\/]cjs[\\/]react-dom)/,
                        minSize:0,  
                        priority:2
                    },
                    common: {  //公共模块 
                        name: "common",
                        chunks: "initial",  //入口处开始提取代码
                        minSize:0,      //代码最小多大，进行抽离
                        minChunks:3,    //代码复 2 次以上的抽离
                        priority:0
                    },
                    defaultVendors: {
                        test: /[\\/]node_modules[\\/]/,
                        chunks: 'all',
                        priority: -10
                    }
                }
            }
        },
        module:{
            rules:[
                {
                    test:/\.js$/,
                    exclude:[/node_modules/],
                    use:[
                        "thread-loader",
                        {
                            loader:"babel-loader",
                            options:{sourceMap:IS_DEV}
                        },
                        {
                            loader:"linaria/loader",
                            options:{sourceMap:IS_DEV}
                        }
                    ]
                },
                {
                    test: /\.css$/,
                    use:[
                        {
                            loader:IS_DEV ? "style-loader" : MiniCssExtractPlugin.loader
                        },
                        {
                            loader:"css-loader",
                            options:{sourceMap:IS_DEV}
                        },
                        {
                            loader:"postcss-loader",
                            options:{sourceMap:IS_DEV}
                        }
                    ]
                }, 
                {
                    test: /\.scss$/,
                    use:[
                        {
                            loader:IS_DEV ? "style-loader" : MiniCssExtractPlugin.loader
                        },
                        {
                            loader:"css-loader",
                            options:{sourceMap:IS_DEV}
                        },
                        {
                            loader:"postcss-loader",
                            options:{sourceMap:IS_DEV}
                        },
                        {
                            loader:"sass-loader",
                            options:{sourceMap:IS_DEV}
                        },
                        {
                            loader: 'sass-resources-loader',
                            options: {
                                sourceMap: IS_DEV,
                                resources: `${PATHS.entry}Style/Scss/_mixin.scss` 
                            }
                        }
                    ]
                }, 
                {
                    test:/\.less$/,
                    use:[
                        {
                            loader:IS_DEV ? "style-loader" : MiniCssExtractPlugin.loader
                        },
                        {
                            loader:"css-loader",
                            options:{sourceMap:IS_DEV}
                        },
                        {
                            loader:"postcss-loader",
                            options:{sourceMap:IS_DEV}
                        },
                        {
                            loader:"less-loader",
                            options:{
                                sourceMap:IS_DEV,
                                lessOptions:{
                                    javascriptEnabled: true,
                                    modifyVars: {
                                        
                                    }
                                }
                            }
                        }
                    ]
                },
                {
                    test:/\.html$/,
                    use:[
                        {
                            loader:"html-loader",
                            options:{
                                minimize:true
                            }
                        }
                    ]
                }, 
                {
                    test: /\.(jpg|jpeg|png|gif|svg|ico)$/i,
                    use: [{
                        loader: "url-loader",
                        options: {
                            name(path){
                                if(/^.*Images(\\|\/)/g.test(path)){
                                    let _path= path.replace(/^.*Images(\\|\/)/g,"").replace(/\..*$/g,"").replace(/\\/g,"/")
                                    return `${_path}.[ext]`
                                }else{
                                    let _path= path.replace(/^.*(\\|\/)/g,"").replace(/\..*$/g,"").replace(/\\/g,"/")
                                    return `${_path}.[ext]`
                                }
                            },
                            limit: 8192,
                            outputPath: PATHS.out_images,
                            esModule: false
                        }
                    }]
                }
            ]
        },
        resolve:{
            ...resolves
        },
        plugins:[
            ...HTMLPlugins,
            new webpack.DefinePlugin({
                env: JSON.stringify(process.env)
            })
        ]
    }
}


module.exports=baseConf;