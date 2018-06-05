import fire from './fire.js'
import models from './models.js'
import FileSaver from 'file-saver'

const db = fire.firestore()

function exporter (collection, model, hasHeader = true, type) {
  return db.collection(collection).get()
    .then(snap => {
      let raw = hasHeader ? (type ? 'Tipo,' : '') + model.header : ''

      snap.forEach(doc => {
        if (doc.id === 'master') return
        let data = doc.data()
        raw += type ? type + ',' : ''
        for (let id of model.ids) {
          if (data[id]) {
            if (id === 'birthday' || id === 'createdAt') {
              raw += `${data[id].getDate()}/${data[id].getMonth() + 1}/${data[id].getFullYear()},`
            } else if (id === 'alergies') {
              raw += data[id] ? 'sí,' : 'no,'
            } else {
              raw += `${data[id]},`
            }
          } else {
            raw += ','
          }
        }
        raw += '\n'
      })
      return raw
    })
}

function saver (filename) {
  return (raw) => {
    let blob = new Blob([raw], {type: 'text/plain;charset=utf-8'})
    FileSaver.saveAs(blob, filename)
  }
}

export function exportPatients () {
  exporter('patients', models.patient).then(saver('pacientes.csv'))
}

export function exportVisitors () {
  exporter('visitors', models.visitor).then(saver('visitantes.csv'))
}

export function exportAll () {
  Promise.all([
    exporter('patients', models.patient, true, 'paciente'),
    exporter('visitors', models.patient, false, 'visitante')
  ])
    .then(([pat, vis]) => pat + vis)
    .then(saver('todo.csv'))
}
