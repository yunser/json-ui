import * as YAML from 'yaml'
import * as fs from 'fs'

console.log('yaml', YAML.stringify({
    a: 'aa',
    b: 'bb',
}))

const content = fs.readFileSync('ui.json', 'utf8')

const obj = JSON.parse(content)

// YAML.parse(str, options): value

fs.writeFileSync('out.yaml', YAML.stringify(obj, { indent: 4 }), 'utf8')
