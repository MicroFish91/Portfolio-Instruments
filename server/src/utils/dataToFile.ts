import fs from "fs";

// dataToFile(JSON.stringify(data), './test.json')
export const dataToFile = (newData: string, fileLocation: string): void => {
  fs.writeFile(fileLocation, newData, (err: any) => {
    if (err) throw err;
    console.log("The file has been saved!");
  });
};
