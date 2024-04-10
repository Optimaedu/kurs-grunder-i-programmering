import {MochaOptions, Runner, reporters} from 'mocha';
import chalk from 'chalk';

const {
  EVENT_RUN_BEGIN,
  EVENT_RUN_END,
  EVENT_TEST_FAIL,
  EVENT_TEST_PASS,
  EVENT_SUITE_BEGIN,
  EVENT_SUITE_END
} = Runner.constants;

export default class TestReporter extends reporters.Base {

  private _indents: number;

  constructor(runner: Runner, options: MochaOptions) {
    super(runner, options);

    this._indents = 0;

    runner
      .once(EVENT_RUN_BEGIN, () => {})
      .on(EVENT_SUITE_BEGIN, () => {})
      .on(EVENT_SUITE_END, () => {})
      .on(EVENT_TEST_PASS, test => {
        process.stdout.write(`${this.indent()}${chalk.greenBright(chalk.bold('✔'))}  ${chalk.greenBright(test.title)}\n`);
      })
      .on(EVENT_TEST_FAIL, (test, err) => {
        process.stdout.write(`${this.indent()}${chalk.red(chalk.bold('✘'))}  ${chalk.red(test.title)}\n`);
        const lines = err.message.split('\n');
        if(lines.length < 1 || lines[0].trim().length < 1)
          return;
        for(let i = 0; i < lines.length; i++) {
          process.stdout.write(`${this.indent()}   ${chalk.gray(`  ${lines[i]}`)}\n`)
        }
      })
      .once(EVENT_RUN_END, () => {process.stdout.write('\n')});
  }

  indent() {
    return Array(this._indents).join('  ');
  }

  increaseIndent() {
    this._indents++;
  }

  decreaseIndent() {
    this._indents--;
  }
}
