import { Program } from "acorn"

export type StudentFileInfo = {
  filePath: string,
  name: string,
  code: string,
  ast: Program
}

let data: StudentFileInfo = {
  filePath: '',
  name: '',
  code: '',
  ast: {type: 'Program', body: [], sourceType: 'module', start: 0, end: 0}
};

export function setStudentFileInfo(info: StudentFileInfo) {
  data = info;
}

export function getStudentfileInfo() {
  return data;
}
