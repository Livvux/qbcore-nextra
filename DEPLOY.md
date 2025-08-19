# 🚀 Coolify Deployment Guide

## Quick Fix Summary

The deployment issues have been resolved:

1. ✅ **Added `packageManager` field** to package.json
2. ✅ **Fixed TypeScript configuration** - excluded test files from build
3. ✅ **Optimized Docker build** - skip typecheck in production build
4. ✅ **Added health check endpoint** at `/api/health`

## Deployment Options

### Option 1: Standard Dockerfile (Recommended)
Use the main `Dockerfile` with these Coolify settings:

**Environment Variables:**
```bash
NODE_ENV=production
NEXT_TELEMETRY_DISABLED=1
NEXT_PUBLIC_SITE_URL=https://your-domain.com
PORT=3000
```

**Health Check:**
- Path: `/api/health`
- Port: `3000`
- Interval: `30s`

### Option 2: Optimized Dockerfile
Rename `Dockerfile.optimized` to `Dockerfile` for:
- ✅ Built-in health checks
- ✅ Faster builds with pnpm store optimization
- ✅ Better security with proper user permissions

### Option 3: Static Export (Edge/CDN)
For static deployment:

**Build Settings:**
- Build Command: `pnpm install && pnpm run build:static`
- Output Directory: `out`

**Environment Variables:**
```bash
NEXT_OUTPUT=export
```

## Build Commands Explained

- `pnpm run build` - Full build with typecheck (development)
- `pnpm run build:production` - Fast build without typecheck (Docker)
- `pnpm run build:static` - Static export build

## Troubleshooting

If you encounter issues:

1. **Check logs** in Coolify dashboard
2. **Test health endpoint**: `curl https://your-domain.com/api/health`
3. **Verify environment variables** are set correctly

## Performance Tips

- Use the optimized Dockerfile for better performance
- Enable health checks for proper monitoring
- Set appropriate resource limits (512MB RAM recommended)

The app should now deploy successfully to Coolify! 🎉