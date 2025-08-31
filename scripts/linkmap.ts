import fs from 'fs'
import path from 'path'

interface PageData {
  internal: number
  external: number
  fiveMx: number
  links: Set<string>
}

const pagesDir = path.join(process.cwd(), 'pages')
const mdxFiles: string[] = []

function walk(dir: string) {
  const entries = fs.readdirSync(dir, { withFileTypes: true })
  for (const entry of entries) {
    const full = path.join(dir, entry.name)
    if (entry.isDirectory()) walk(full)
    else if (entry.name.endsWith('.mdx')) mdxFiles.push(full)
  }
}

walk(pagesDir)

const graph = new Map<string, PageData>()

for (const file of mdxFiles) {
  const rel = path.relative(pagesDir, file)
  const content = fs.readFileSync(file, 'utf8')
  const data: PageData = { internal: 0, external: 0, fiveMx: 0, links: new Set() }
  const mdLink = /\[[^\]]+\]\(([^)]+)\)/g
  const htmlLink = /<a[^>]+href="([^"]+)"[^>]*>/g
  let match: RegExpExecArray | null
  while ((match = mdLink.exec(content))) {
    const url = match[1]
    if (url.startsWith('/')) {
      data.internal++
      data.links.add(url.split('#')[0])
    } else if (url.startsWith('http')) {
      data.external++
      if (url.includes('5mx.com')) data.fiveMx++
    }
  }
  while ((match = htmlLink.exec(content))) {
    const url = match[1]
    if (url.startsWith('/')) {
      data.internal++
      data.links.add(url.split('#')[0])
    } else if (url.startsWith('http')) {
      data.external++
      if (url.includes('5mx.com')) data.fiveMx++
    }
  }
  graph.set(rel, data)
}

const inbound: Record<string, number> = {}
for (const [page, data] of graph.entries()) {
  for (const link of data.links) {
    const target = link.replace(/^\//, '')
    inbound[target] = (inbound[target] || 0) + 1
  }
}

const orphanPages: string[] = []
for (const file of mdxFiles) {
  const rel = path.relative(pagesDir, file)
  const key = rel.replace(/index\.mdx$/, '').replace(/\.mdx$/, '')
  if (!inbound[key] && !inbound[rel] && !inbound['/' + key]) {
    orphanPages.push(rel)
  }
}

const totalInternal = Array.from(graph.values()).reduce((sum, d) => sum + d.internal, 0)
const totalFiveMx = Array.from(graph.values()).reduce((sum, d) => sum + d.fiveMx, 0)
const avgInternal = totalInternal / mdxFiles.length

console.log(JSON.stringify({
  pages: mdxFiles.length,
  avgInternal: Number(avgInternal.toFixed(2)),
  orphanPages,
  totalFiveMx
}, null, 2))
