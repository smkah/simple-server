import fs, { readFileSync } from 'fs'
import path from 'path'

const getAllFiles = (dirPath: string, arrayOfFiles: string[]) => {
  arrayOfFiles = arrayOfFiles || []
  const files = fs.readdirSync(dirPath)
  files.forEach((file) => {
    const filePath = path.join(__dirname, dirPath.replace(__dirname, '').replace(/\\/g, ''), file)
    if (fs.statSync(dirPath + '/' + file).isDirectory()) {
      arrayOfFiles = getAllFiles(dirPath + '/' + file, arrayOfFiles)
    } else if (file.includes('.gql')) {
      const Schema = readFileSync(filePath, { encoding: 'utf-8' })
      arrayOfFiles.push(Schema)
    } else if (file.includes('.ts')) {
      const Module = require(filePath)
      arrayOfFiles.push(Module)
    }
  })
  return arrayOfFiles
}

const result = getAllFiles(path.join(__dirname, 'modules'), [])

export default result
