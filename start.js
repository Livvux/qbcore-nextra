#!/usr/bin/env node

const { spawn } = require('child_process')
const { existsSync } = require('fs')
const path = require('path')

const standaloneServerPath = path.join(process.cwd(), '.next', 'standalone', 'server.js')

if (existsSync(standaloneServerPath)) {
  console.log('🚀 Starting standalone server...')
  const child = spawn('node', [standaloneServerPath], {
    stdio: 'inherit',
    env: process.env
  })
  
  child.on('exit', (code) => {
    process.exit(code)
  })
} else {
  console.log('🚀 Starting Next.js development server...')
  const child = spawn('next', ['start'], {
    stdio: 'inherit',
    env: process.env
  })
  
  child.on('exit', (code) => {
    process.exit(code)
  })
}