import New from './pages/New.vue'
import Record from './pages/Record.vue'
import Search from './pages/Search.vue'
import notFound from './pages/404.vue'

const routes = {
  '': {
    name: 'Busqueda',
    view: Search
  },
  'new': {
    name: 'new',
    view: New
  },
  'record': {
    name: 'Historia',
    view: Record
  }
}

export default function (route) {
  let key = route.split('/')[1]
  if (routes[key]) {
    return routes[key]
  } else {
    return {
      name: 'Not found :(',
      view: notFound
    }
  }
}
