const fs = require("node:fs");

class Builder {
    constructor() {
        this.js = "";
    }
    addJSFile(sourceRelativeURL) {
        if (fs.existsSync(sourceRelativeURL)) {
            this.js += fs.readFileSync(sourceRelativeURL, { encoding: "utf-8" }) + "\n";
        }
    }
    build() {
        fs.writeFileSync("./dist/fii.min.js", this.js);
        console.log("Build JS successful!");
    }
}

const app = new Builder();

app.addJSFile("./src/accordion/main.js");
app.addJSFile("./src/breadcrumb/main.js");
app.addJSFile("./src/button/main.js");
app.addJSFile("./src/card/main.js");
app.addJSFile("./src/class/main.js");
app.addJSFile("./src/code/main.js");
app.addJSFile("./src/form/main.js");
app.addJSFile("./src/model/main.js");
app.addJSFile("./src/table/main.js");

app.build();
