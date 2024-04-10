import fs from 'fs';
import path from 'path';
import config from './../config.json';

export function getCurrentStudentExerciseFilePath(): string|undefined {
  const directory = path.resolve(config.studentWorkingDirectoryPath);
  if(!fs.existsSync(directory))
    return undefined;

  const regex = new RegExp(config.exerciseFileNameRegex);
  const file = fs.readdirSync(directory).filter(file => regex.test(file)).sort().pop();

  if(!file)
    return undefined;

  return path.resolve(config.studentWorkingDirectoryPath + '/' + file);
}
