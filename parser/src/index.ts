const fs = require("fs");
const { inputFile, outputFile } = require("minimist")(process.argv.slice(2));

interface IFileOptions {
  options?: object | string;
  encoding?: string | null;
  flag?: string;
}

interface IViolators {
  url: string;
  violations: Array<any>;
}

class FileWorker {
  async read(path: string, options: IFileOptions = {}): Promise<string> {
    return await fs.promises.readFile(path, options);
  }

  async write(path: string, content: string, options: IFileOptions = {}) {
    await fs.promises.writeFile(path, content, options);
  }
}

function getViolations(data: Array<any>): Array<IViolators> {
  return data
    .map(item => {
      if (item.violations.length <= 0) return null;
      const { url, violations } = item;
      return {
        url,
        violations
      };
    })
    .filter(Boolean);
}

function parseResults(data: string): Array<any> {
  return JSON.parse(data);
}

const fileWorker = new FileWorker();
fileWorker
  .read(inputFile)
  .then(parseResults)
  .then(getViolations)
  .then(violators => {
    fileWorker.write(
      `${process.cwd()}/${outputFile}`,
      JSON.stringify(violators)
    );
  })
  .catch(e => {
    throw e;
  });
