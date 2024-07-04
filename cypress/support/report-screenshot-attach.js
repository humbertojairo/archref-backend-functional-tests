const fs = require("fs");
const path = require("path");

const args = process.argv;

const cucumberJsonDir = args[2] || "./cucumber-json";
const screenshotsDir = args[3] || path.resolve("reports","mochawesome-report","assets","specs");

const featureToFileMap = {};
const cukeMap = {};
const jsonNames = {};
const succesfulTests = [];

const jsonPath = path.join(__dirname, "..", cucumberJsonDir);
const directoryFiles = fs.readdirSync(jsonPath);
const files = directoryFiles.filter(file => file.includes('.json'))

files.forEach(file => {
    const json = JSON.parse(
        fs.readFileSync(path.join(jsonPath, file)).toString()
    );
    const feature = json[0].uri.split("/").reverse()[0];

    jsonNames[feature] = file;
    cukeMap[feature] = json;
    featureToFileMap[feature] = file;
});

const hasTestScreenshots = fs.existsSync(screenshotsDir)

if (hasTestScreenshots) {
    const failingFeatures = fs.readdirSync(screenshotsDir);
    failingFeatures.forEach(feature => {
        const screenshots = fs.readdirSync(path.join(screenshotsDir, feature));
        screenshots.forEach(screenshot => {
            const scenarioName = getScenarioNameFromFailedScreenshot(screenshot);
            if (scenarioName) {
                const myScenario = cukeMap[feature][0].elements.find(
                    e => e.name === scenarioName
                );
                const myStep = myScenario.steps.find(
                    step => step.result.status !== "passed"
                );
                const data = fs.readFileSync(
                    path.join(screenshotsDir, feature, screenshot)
                );
                if (data) {
                    const base64Image = Buffer.from(data, "binary").toString("base64");
                    myStep.embeddings = [];
                    myStep.embeddings.push({ data: base64Image, mime_type: "image /png" });
                }
                fs.writeFileSync(
                    path.join(jsonPath, jsonNames[feature]),
                    JSON.stringify(cukeMap[feature], null, 2)
                );
            } else {
                succesfulTests.push(screenshot);
            }
        });
        succesfulTests.forEach(screenshot => {
            const scenarioName = getScenarioNameFromSuccesfulScreenshot(screenshot);
            const myScenario = cukeMap[feature][0].elements.find(
                e => e.name === scenarioName
            );
            myScenario.steps[myScenario.steps.length] = {
                "arguments": [],
                "embeddings": [],
                "keyword": "",
                "line": 0,
                "name": `Evidence`,
                "result": {
                    "status": "",
                    "duration": 0
                }
            }
            const myStep = myScenario.steps[myScenario.steps.length-1];
            const data = fs.readFileSync(
                path.join(screenshotsDir, feature, screenshot)
            );
            if (data) {
                const base64Image = Buffer.from(data, "binary").toString("base64");
                myStep.embeddings.push({ data: base64Image, mime_type: "image /png" });
            };
            fs.writeFileSync(
                path.join(jsonPath, jsonNames[feature]),
                JSON.stringify(cukeMap[feature], null, 2)
            );
        });
    });
}


function getScenarioNameFromFailedScreenshot(screenshot) {
    const index1 = screenshot.indexOf('--');
    let index2;
    if (screenshot.includes('(failed)')) {
        index2 = screenshot.indexOf('(failed)');
        return screenshot
            .substring(index1 + 2, index2)
            .trim();
    } else {
        return null
    }
}

function getScenarioNameFromSuccesfulScreenshot(screenshot) {
    const index1 = screenshot.indexOf('--');
    let index2;
    if (screenshot.includes('.png')) {
        index2 = screenshot.indexOf('.png');
        return screenshot
            .substring(index1 + 2, index2)
            .trim()
            .replace(/ *\([\d)]*\) */g, "")
    }
}
