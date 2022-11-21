class ResourceAnalysisWebpackPlugin {

    constructor() {
        this.date = new Date()
    }

    apply(compiler) {

        const context = compiler.context,
            fs = compiler.outputFileSystem;

        compiler.hooks.emit.tap('ResourceAnalysisWebpackPlugin', compilation => {

            const assets = Object.entries(compilation.assets);

            let fileContent = `[index]  fileName >>> fileSize\n`,
                TotalSize = 0;

            assets.forEach((item, idx) => {

                const value = (item[1].size() / 1024).toFixed(2);

                TotalSize += +value;
                fileContent += `\n[${idx + 1}]  ${item[0]} >>> ${value}KB`;

                if (idx + 1 === assets.length) {

                    fileContent += `\n\ntotalSize >>> ${(TotalSize / 1024).toFixed(2)}MB`;
                }

            })

            if (fs.existsSync(`${context}/resource-analysis-file`)) {
                this.appendFile(fs, context, fileContent)
            } else {
                fs.mkdirSync(`${context}/resource-analysis-file`)
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