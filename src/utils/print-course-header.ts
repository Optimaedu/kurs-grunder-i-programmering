import chalk from 'chalk';

type PrintCourseHeaderOptions = {
  title?: string,
  subtitle?: string
}

export default function printCourseHeader({title = 'GRUNDER I PROGRAMMERING', subtitle}: PrintCourseHeaderOptions) {
  const titleWithSubtitle = title + (subtitle ? ': ' + subtitle : '')
  process.stdout.write(
    '\x1b[2J\x1b[H' +
    chalk.bold(`═════╡ ${titleWithSubtitle} ╞═════`) + 
    '\n\n'
  );
}
