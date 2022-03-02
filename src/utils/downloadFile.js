import axios from 'axios'
import * as path from 'path'
import fs from 'fs'

const downloadFile = async url => {
  const pdfPath = path.join('/tmp', 'sample')
  const file = fs.createWriteStream(pdfPath)
  const response = await axios.get(url, { responseType: 'stream' })
  await response.data.pipe(file)
  return pdfPath
}
export default downloadFile
