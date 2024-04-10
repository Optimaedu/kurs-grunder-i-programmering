import {exec} from 'child_process';

export default function openFileInVsCode(file: string): Promise<undefined> {
  const promise = new Promise<undefined>((resolve, reject) => {
    const command = `code --reuse-window --goto ${file}`;
    exec(command, (error) => {
      if(error)
        reject(error);
      else
        resolve(undefined);
    });
  });
  return promise;
}
