const fs = require("node:fs");

class Builder {
    constructor() {
        this.css = "";
    }
    addCSSFile(sourceRelativeURL) {
        this.css += fs.readFileSync(sourceRelativeURL, { encoding: 'utf-8' }) + '\n';
    }
    build() {
        this.css = this.css.split('\n') .filter(line => !/^@/.test(line)) .join('\n');
        fs.writeFileSync("./dist/fii.min.css", this.css);
        console.log('Build CSS successful!')
    }
}

const app = new Builder();
app.addCSSFile("./src/share/style.css");

app.addCSSFile("./src/accordion/style.css");
app.addCSSFile("./src/alert/style.css");
app.addCSSFile("./src/badge/style.css");
app.addCSSFile("./src/breadcrumb/style.css");
app.addCSSFile("./src/button/style.css");
app.addCSSFile("./src/card/style.css");
app.addCSSFile("./src/code/style.css");
app.addCSSFile("./src/dropdown/style.css");
app.addCSSFile("./src/model/style.css");
app.addCSSFile("./src/table/style.css");
app.addCSSFile("./src/form/style.css");
app.addCSSFile("./src/list-group/style.css");
app.addCSSFile("./src/navbar/style.css");
app.addCSSFile("./src/pagination/style.css");
app.addCSSFile("./src/spinner/style.css");
app.addCSSFile("./src/tabs/style.css");
app.addCSSFile("./src/tooltip/style.css");

app.addCSSFile("./src/class/margin/style.css");
app.addCSSFile("./src/class/padding/style.css");
app.addCSSFile("./src/class/grid/style.css");
app.addCSSFile("./src/class/text/style.css");
app.addCSSFile("./src/class/list/style.css");
app.addCSSFile("./src/class/display/style.css");
app.addCSSFile("./src/class/layout/style.css");
app.addCSSFile("./src/class/flex/style.css");
app.addCSSFile("./src/class/position/style.css");
app.addCSSFile("./src/class/rounded/style.css");
app.addCSSFile("./src/class/size/style.css");
app.addCSSFile("./src/class/background/style.css");
app.addCSSFile("./src/class/overflow/style.css");
app.addCSSFile("./src/class/opacity/style.css");
app.addCSSFile("./src/class/border/style.css");
app.addCSSFile("./src/class/shadow/style.css");
app.addCSSFile("./src/class/transition/style.css");

app.build();

