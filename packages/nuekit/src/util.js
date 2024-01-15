
/* misc stuff. think shame.css */
import { sep, parse, normalize } from 'node:path'


export function log(msg, extra='') {
  console.log(colors.green('✓'), msg, extra)
}

log.error = function(msg, extra="") {
  console.log(colors.red('!!'), msg, extra)
}

function getColorFunctions() {
  const codes = { red: 31, green: 32, yellow: 33, blue: 34, magenta: 35, cyan: 36, gray: 90 }
  const fns = {}

  for (const key in codes) {
    fns[key] = msg => `\u001b[${codes[key]}m${msg}\u001b[39m`
  }
  return fns
}

// console colors
export const colors = getColorFunctions()



/* path parts */

export function getParts(path) {
  path = normalize(path)
  const { dir, name, base } = parse(path)
  const appdir = getAppDir(path)
  const url = getUrl(dir, name)
  return { url, dir, slug: name + '.html', appdir }
}


export function getAppDir(path) {
  path = normalize(path)
  const [ appdir ] = path.split(sep)
  return appdir == path ? '' : appdir
}

// getDirs('a/b/c') --> ['a', 'a/b', 'a/b/c']
export function getDirs(dir) {
  if (!dir) return []
  dir = normalize(dir)
  const els = dir.split(sep)
  return els.map((el, i) => els.slice(0, i + 1).join(sep))
}

export function getUrl(dir, name) {
  let url = getPosixPath(dir) + '/'
  if (url[0] != '/') url = '/' + url
  // if (name != 'index')
  url += name + '.html'
  return url
}

export function getPosixPath(path) {
  return path.replaceAll('\\', '/')
}
