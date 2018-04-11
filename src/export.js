import fire from './fire.js'
import FileSaver from 'file-saver'

function exportPatients () {
  return fire.firestore().collection('patients').get()
    .then(snap => {
      let raw = ''
      snap.forEach(doc => {
        let data = doc.data()
        raw += `${data.name},${data.fatherSurname},${data.motherSurname},${data.phone}\n`
      })
      return raw
    })
}

export default function () {
  exportPatients().then(raw => {
    let blob = new Blob([raw], {type: 'text/plain;charset=utf-8'})
    FileSaver.saveAs(blob, 'data.csv')
  })
}
