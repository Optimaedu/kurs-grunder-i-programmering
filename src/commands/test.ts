import path from 'path';
import chalk from 'chalk';
import fs from 'fs';
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
  
  // 1. Get file path for the file to test.
  //    This is the students exercise file..

  const studentExerciseFilePath = process.argv[2]
    ? path.resolve(config.studentWorkingDirectoryPath + '/' + process.argv[2] + '.js')
    : getCurrentStudentExerciseFilePath();

  // 2. Make sure the course has been started.

  if(!studentExerciseFilePath) {
    printCourseHeader({});
    process.stdout.write(chalk.redBright('Du kan inte utföra test eftersom du inte har startat kursen.\n\n'));
    return;
  }
  
  // 3. Make sure the student file exists.

  if(!fs.existsSync(studentExerciseFilePath)) {
    printCourseHeader({});
    process.stdout.write(chalk.redBright('Det går inte att utföra test för uppgift: '+path.parse(studentExerciseFilePath).name+'\n\n'));
    return;
  }

  // 4. Make sure that the test file exists.

  const studentExerciseFileInfo = path.parse(studentExerciseFilePath);
  const testFilePath = path.resolve(config.testsPath + '/' + studentExerciseFileInfo.name + '.test.ts');
  
  if(!fs.existsSync(testFilePath)) {
    printCourseHeader({});
    process.stdout.write(chalk.redBright('Det går inte att utföra test för uppgift: '+path.parse(studentExerciseFilePath).name+'\nIngen testfil hittades.\n\n'));
    return;
  }

  // 5. Print header.

  printCourseHeader({subtitle: 'TEST ' + studentExerciseFileInfo.name});

  // 6. Parse ast.

  const code = fs.readFileSync(studentExerciseFilePath, {encoding: 'utf-8'});
  let ast: Program|undefined;
  try {
    ast = parse(code, {ecmaVersion: 'latest', sourceType: 'module'});
  }
  catch(e: any) {
    // Try to run the code in the vm to make the error more useful.
    const {error} = runCode(code, studentExerciseFilePath);
    process.stdout.write(chalk.bold.redBright('Din kod innehåller fel:\n\n'));
    if(error) {
      process.stdout.write(chalk.redBright(error.long + '\n\n'));
    }
    else {
      process.stdout.write(
        chalk.redBright(e.message) +
        '\n\n' + 
        chalk.gray('För mera information, utför följande kommando:\n') +
        chalk.yellow('node ' + studentExerciseFileInfo.base) +
        '\n\n'
      );
    }
    return;
  } 

  // 7. Set student file info.

  setStudentFileInfo({
    filePath: studentExerciseFilePath,
    name: studentExerciseFileInfo.name,
    code,
    ast: ast!
  });

  // 8. Run test file.
  
  if(await runTestFile(testFilePath)) {
    process.stdout.write(chalk.cyan('Bra! Du klarade av uppgiften.\n'));
  }
  else {
    // Some test failed, the reporter will write the result.
    return;
  }

  // 9. Find next exercise.

  const nextExerciseFileName = (Number(studentExerciseFileInfo.name) + 1).toString().padStart(2, '0');
  const nextExerciseBaseName = nextExerciseFileName + '.js';
  const nextExerciseFilePath = path.resolve(config.exercisesPath + '/' + nextExerciseBaseName);

  // 10. Check if course is completed !!!

  if(!fs.existsSync(nextExerciseFilePath)) {
    process.stdout.write(chalk.yellow('\n!!! Du har nu klarat av alla uppgifter !!!\n\n'));
    return;
  }

  // 11. Copy next exercise file into students working directory.

  const nextStudentExerciseFilePath = path.resolve(config.studentWorkingDirectoryPath + '/' + nextExerciseBaseName);
  fs.copyFileSync(nextExerciseFilePath, nextStudentExerciseFilePath);
  
  process.stdout.write(chalk.cyan('Du kan nu börja på med uppgift ') + chalk.yellow(nextExerciseFileName)+'\n\n');

})();

function runTestFile(testFilePath: string): Promise<boolean> {
  const mocha = new Mocha({
    reporter: TestReporter
  });

  mocha.addFile(testFilePath);

  return new Promise<boolean>(resolve => {
    mocha.run(async (failures) =>{
      return resolve(failures < 1);
    });
  });
}
