import path from 'path';
import fs from 'fs';
import chalk from 'chalk';
import printCourseHeader from "../utils/print-course-header";
import { getCurrentStudentExerciseFilePath } from "../utils/file-utlis";
import openFileInVsCode from '../utils/open-file-in-vs-code';
import config from '../config.json';


// Run the command

(async () => {
  
  // 1. Print course header.

  printCourseHeader({subtitle: 'START'});

  // 2. Check if the course already has been started.

  const studentFilePath = getCurrentStudentExerciseFilePath();

  if(studentFilePath) {
    const fileInfo = path.parse(studentFilePath);
    process.stdout.write(chalk.redBright('Du har redan startat kursen och kan inte starta igen.\n'));
    try {
      await openFileInVsCode(studentFilePath);
      process.stdout.write(chalk.cyan(`Fortsätt koda i filen `) + chalk.yellow(`${fileInfo.base} 😊\n\n`));
    }
    catch {
      process.stdout.write(chalk.cyan(`Öppna filen `) + chalk.yellow(fileInfo.base) + chalk.cyan(` och börja koda 😊\n\n`));
    }
    return;
  }

  // 3. Copy first exercise into students working directory.

  const firstExerciseBaseName = '01.js';
  const originalExerciseFilePath = path.resolve(config.exercisesPath + '/' + firstExerciseBaseName);
  const studentExerciseFilePath = path.resolve(config.studentWorkingDirectoryPath + '/' + firstExerciseBaseName);
  fs.copyFileSync(originalExerciseFilePath, studentExerciseFilePath);

  // 4. Inform the user that the course has ben started and open the exerecise file.
  
  process.stdout.write(chalk.cyan('Du har nu startat kursen!!\n'));
  const nextStudentfileInfo = path.parse(studentExerciseFilePath);
  
  try {
    await openFileInVsCode(studentExerciseFilePath);
    process.stdout.write(chalk.cyan(`Börja koda i filen `) + chalk.yellow(`${nextStudentfileInfo.base} 😊\n\n`));
  }
  catch {
    process.stdout.write(chalk.cyan(`Öppna filen `) + chalk.yellow(nextStudentfileInfo.base) + chalk.cyan(` och börja koda 😊\n\n`));
  }
})();
