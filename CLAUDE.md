# QBCore Nextra Documentation Project

This is a QBCore documentation site built with **Nextra** (Next.js + MDX) and configured for optimal development with **pnpm**.

## Package Manager

**Use pnpm for all operations** - this project is configured specifically for pnpm:

```bash
# Install dependencies
pnpm install

# Development server
pnpm dev

# Build for production
pnpm build

# Start production server
pnpm start
```

## Development Scripts

### Core Commands
- `pnpm dev` - Start development server
- `pnpm build` - Build with type checking
- `pnpm start` - Start production server

### Code Quality
- `pnpm lint` - Lint code with ESLint
- `pnpm lint:fix` - Lint and auto-fix issues
- `pnpm typecheck` - Check TypeScript types
- `pnpm format` - Format code with Prettier
- `pnpm format:check` - Check code formatting
- `pnpm check-all` - Run all checks (lint + typecheck + test)

### Testing
- `pnpm test` - Run tests with Vitest
- `pnpm test:ui` - Run tests with UI
- `pnpm test:coverage` - Run tests with coverage
- `pnpm test:watch` - Run tests in watch mode

### Maintenance
- `pnpm clean` - Clean build artifacts and node_modules
- `pnpm precommit` - Pre-commit checks (used by git hooks)

## Technology Stack

- **Framework**: Next.js 14 with Nextra
- **Language**: TypeScript (strict mode)
- **Styling**: Tailwind CSS 4.x
- **Testing**: Vitest + React Testing Library
- **Code Quality**: ESLint + Prettier + TypeScript
- **Package Manager**: pnpm
- **Git Hooks**: Husky + lint-staged

## Code Standards

### TypeScript
- Strict mode enabled
- No explicit `any` types (warning)
- Unused variables are errors
- Use descriptive variable names with auxiliary verbs

### Code Style
- Prettier configuration:
  - No semicolons
  - Single quotes
  - 2 space tabs
  - 100 character line width
  - Tailwind CSS class sorting

### File Structure
- Use lowercase with dashes for directories (`components/auth-wizard`)
- Follow Nextra conventions for pages and meta files
- Components in `/components` directory
- Pages in `/pages` directory (Nextra requirement)

## Git Workflow

### Pre-commit Hooks
Git hooks are configured to run automatically:
1. **lint-staged** formats and lints changed files
2. **ESLint** fixes automatically fixable issues
3. **Prettier** formats code
4. Commit is blocked if there are unfixable errors

### Before Committing
Always run: `pnpm check-all` to ensure all checks pass.

## Testing Strategy

- **Unit Tests**: Components with React Testing Library
- **Test Location**: `__tests__` directories or `.test.tsx` files
- **Test Utils**: Available in `test-utils.tsx`
- **Coverage**: HTML reports generated in `/coverage`

## Build Process

1. **Type Check**: TypeScript compilation check
2. **Next.js Build**: Static generation and optimization
3. **Test**: All tests must pass
4. **Lint**: Code quality checks

## Nextra Specifics

- **MDX Files**: Documentation pages in `/pages`
- **Meta Files**: `_meta.json` for navigation
- **Theme**: nextra-theme-docs
- **Components**: Custom components in `/components`

## Performance Considerations

- **Server Components**: Prefer RSC over client components
- **Dynamic Imports**: Use for code splitting
- **Image Optimization**: WebP format with lazy loading
- **Bundle Analysis**: Run `pnpm build` to check bundle size

## Commands Reference

| Command | Description |
|---------|-------------|
| `pnpm dev` | Development server |
| `pnpm build` | Production build |
| `pnpm typecheck` | Type checking |
| `pnpm lint` | Linting |
| `pnpm format` | Code formatting |
| `pnpm test` | Run tests |
| `pnpm check-all` | All quality checks |

## Configuration Files

- `.prettierrc` - Prettier formatting rules
- `.eslintrc.json` - ESLint rules and plugins
- `.npmrc` - pnpm configuration
- `tsconfig.json` - TypeScript configuration
- `vitest.config.ts` - Test configuration
- `next.config.js` - Next.js configuration
- `tailwind.config.js` - Tailwind CSS configuration

---

**Always use pnpm for this project** - it's optimized for pnpm's linking strategy and dependency management.
- Coolify project data
Project ID: tk0wkwgssc480scs0scoggk0
Environment (Production): bo00o8oc0c4sskwkgcksc4o0
Application ID: n0ck0o0oo0googwk400ksskg