import New from './pages/New.vue'
import Record from './pages/Record.vue'
import Search from './pages/Search.vue'
import notFound from './pages/404.vue'

export default function (route) {
  switch (route) {
    case '/':
      return {
        name: 'Busqueda',
        view: Search
      }
    case '/new':
      return {
        name: 'new',
        view: New
      }
    case '/record':
      return {
        name: 'Historia',
        view: Record
      }
    default:
      return {
        name: 'Not found :(',
        view: notFound
      }
  }
}
