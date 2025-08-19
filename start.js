#!/usr/bin/env node

import { spawn } from 'child_process'
import { existsSync } from 'fs'
import { join } from 'path'

const standaloneServerPath = join(process.cwd(), '.next', 'standalone', 'server.js')

if (existsSync(standaloneServerPath)) {
  console.log('🚀 Starting standalone server...')
  const child = spawn('node', [standaloneServerPath], {
    stdio: 'inherit',
    env: process.env,
  })

  child.on('exit', (code) => {
    process.exit(code)
  })
} else {
  console.log('🚀 Starting Next.js development server...')
  const child = spawn('next', ['start'], {
    stdio: 'inherit',
    env: process.env,
  })

  child.on('exit', (code) => {
    process.exit(code)
  })
}
