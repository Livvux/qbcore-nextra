# QBCore Documentation Images

This directory contains all visual assets for the QBCore documentation site.

## Directory Structure

- **`installation/`** - Screenshots and images for installation guides (Windows/Linux setup)
- **`resources/`** - UI screenshots and interface images for QBCore resources
- **`guides/`** - Step-by-step tutorial screenshots and examples
- **`diagrams/`** - Technical diagrams, flowcharts, and architecture visuals
- **`architecture/`** - QBCore framework architecture and system diagrams

## Image Guidelines

### File Naming Convention
Use descriptive, kebab-case filenames:
- `qbcore-installation-windows-step1.png`
- `inventory-ui-overview.png`
- `player-data-structure-diagram.svg`
- `migration-workflow-flowchart.png`

### Image Standards
- **Format**: Use WebP for photos/screenshots, SVG for diagrams when possible
- **Resolution**: Screenshots should be at least 1920x1080, diagrams scalable
- **Compression**: Optimize file sizes while maintaining clarity
- **Alt Text**: All images must have descriptive alt text in documentation

### Adding Images to Documentation
```markdown
![QBCore Installation Step 1](/images/installation/windows-step1.webp "Windows installation step 1")
```

## Priority Images Needed

### Installation Documentation
- [ ] Windows server setup screenshots
- [ ] Linux installation terminal screenshots
- [ ] txAdmin interface screenshots
- [ ] Database configuration examples

### Architecture Documentation
- [ ] QBCore framework architecture diagram
- [ ] Event system flowchart
- [ ] Database schema visualization
- [ ] Resource interaction diagram

### Resource Documentation
- [ ] qb-inventory UI screenshots
- [ ] qb-phone interface examples
- [ ] qb-banking ATM interface
- [ ] Job system overview diagrams

### Migration Documentation
- [ ] Migration process flowchart
- [ ] Database schema comparison
- [ ] Before/after code examples
- [ ] Compatibility matrix visualization