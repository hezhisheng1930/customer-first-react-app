class ResourceAnalysisWebpackPlugin {

    constructor() {
        this.date = new Date()
    }

    apply(compiler) {

        const context = compiler.context,
            fs = compiler.outputFileSystem;
            
            compiler.hooks.run.tap('pluginName', (compilation) => {
                console.log(compilation, 'webpack 构建过程开始！');
              });

        compiler.hooks.make.tap('ResourceAnalysisWebpackPlugin', compilation => {
            // console.log(compilation, 'compilation');
        })

        compiler.hooks.emit.tap('ResourceAnalysisWebpackPlugin', compilation => {

            const assets = Object.entries(compilation.assets);  // 资源转数组

            let fileContent = `[index]  fileName >>> fileSize\n`,
                TotalSize = 0;

            assets.forEach((item, idx) => {

                const value = (item[1].size() / 1024).toFixed(2);

                TotalSize += +value;  // 累加每项资源大小
                fileContent += `\n[${idx + 1}]  ${item[0]} >>> ${value}KB`;

                if (idx + 1 === assets.length) { //如果索引为数组长度，则输出资源总大小

                    fileContent += `\n\ntotalSize >>> ${(TotalSize / 1024).toFixed(2)}MB`;
                }

            })

            if (fs.existsSync(`${context}/resource-analysis-file`)) {  
                this.appendFile(fs, context, fileContent)
            } else {
                fs.mkdirSync(`${context}/resource-analysis-file`)  //没有目录则创建
                this.appendFile(fs, context, fileContent)
            }
        })

        compiler.hooks.run.tap('ResourceAnalysisWebpackPlugin', compilation => {
        })

        compiler.hooks.make.tap('ResourceAnalysisWebpackPlugin', compilation => {
        })

        

    }

    appendFile(fs, context, fileContent) {

        const year = this.date.getFullYear(),
            month = this.date.getMonth() + 1,
            day = this.date.getDate();

        fs.writeFile(`${context}/resource-analysis-file/release-${year}-${month}-${day}.txt`, fileContent);

    }

}
module.exports = ResourceAnalysisWebpackPlugin;