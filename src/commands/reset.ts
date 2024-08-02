import path from 'path';
import chalk from 'chalk';
import fs, { existsSync, unlinkSync } from 'fs';
import Mocha from 'mocha';
import config from '../config.json';
import { getCurrentStudentExerciseFilePath } from "../utils/file-utlis";
import printCourseHeader from '../utils/print-course-header';
import { setStudentFileInfo } from '../utils/student-file-info';
import { Program, parse } from 'acorn';
import { runCode } from '../utils/run-code';
import TestReporter from '../tests/reporters/test-reporter';


// Run the command

(async () => {
  
  const exerciseNum = parseInt(process.argv[2]);
  const currentExerciseNum = parseInt(path.parse(getCurrentStudentExerciseFilePath()||'').name);

  if(Number.isNaN(exerciseNum)) {
    printCourseHeader({});
    process.stdout.write(chalk.redBright('Du måste skriva in uppgiftens nummer\nför den uppgift som du vill återställa.\n\n'));
    return;
  }

  const exerciseName = exerciseNum < 10 ? '0' + exerciseNum : exerciseNum.toString();

  if(Number.isNaN(currentExerciseNum) || currentExerciseNum < exerciseNum) {
    printCourseHeader({});
    process.stdout.write(chalk.redBright('Du kan inte återställa uppgift '+exerciseName+'.\n\n'));
    return;
  }

  const exerciseTemplateFile = path.resolve(config.exercisesPath + '/' + exerciseName + '.js');
  const exerciseStudentFile  = path.resolve(config.studentWorkingDirectoryPath + '/' + exerciseName + '.js');

  if(existsSync(exerciseStudentFile))
    unlinkSync(exerciseStudentFile);

  fs.copyFileSync(exerciseTemplateFile, exerciseStudentFile);

  printCourseHeader({});
  process.stdout.write(chalk.cyan('Uppgift ') + chalk.yellow(exerciseName) + chalk.cyan(' är nu återställd.')+'\n\n');

})();
