#!/usr/bin/env node
// Bundle size budget checker - reads gzipped sizes
// Run with: npm run perf:budget

import fs from 'fs';
import path from 'path';

const BUDGETS = {
  // Gzipped sizes in KB - based on actual build output
  'total-js': 150,
  'vendor-react-dom': 60,
  'vendor-other': 55,
  'vendor-react': 25,
  'vendor-markdown': 5,
  'vendor': 35,
  'main': 30,
  'DinoGame': 5,
  'ReflectionDetail': 5,
  'total-css': 6,
};

const DIST_DIR = path.resolve('dist');
const ASSETS_DIR = path.join(DIST_DIR, 'assets');

function getGzipSize(filePath) {
  if (!fs.existsSync(filePath)) return 0;
  const content = fs.readFileSync(filePath);
  return content.length / 1024; // KB
}

function main() {
  console.log('📦 Checking bundle size budgets (gzipped)...\n');
  
  const results = {};
  let hasFailures = false;
  
  // Check JS bundles - read .gz files
  const jsDir = path.join(ASSETS_DIR, 'js');
  if (fs.existsSync(jsDir)) {
    const jsFiles = fs.readdirSync(jsDir).filter(f => f.endsWith('.js.gz'));
    
    for (const file of jsFiles) {
      const filePath = path.join(jsDir, file);
      const size = getGzipSize(filePath);
      // Remove .js.gz and hash for display name
      const name = file
        .replace(/\.js\.gz$/, '')
        .replace(/-[a-z0-9]+$/, '');
      results[name] = size;
    }
  }
  
  // Check CSS bundles - read .gz files
  const cssDir = path.join(ASSETS_DIR, 'css');
  if (fs.existsSync(cssDir)) {
    const cssFiles = fs.readdirSync(cssDir).filter(f => f.endsWith('.css.gz'));
    let totalCss = 0;
    for (const file of cssFiles) {
      const filePath = path.join(cssDir, file);
      const size = getGzipSize(filePath);
      totalCss += size;
      const name = `css-${file.replace(/\.css\.gz$/, '').replace(/-[a-z0-9]+$/, '')}`;
      results[name] = size;
    }
    results['total-css'] = totalCss;
  }
  
  // Calculate total JS
  let totalJs = 0;
  for (const [name, size] of Object.entries(results)) {
    if (!name.startsWith('css-') && name !== 'total-css') {
      totalJs += size;
    }
  }
  results['total-js'] = totalJs;
  
  // Map to budget categories
  const budgetMap = {
    'total-js': results['total-js'] || 0,
    'vendor-react-dom': results['vendor-react-dom'] || 0,
    'vendor-other': results['vendor-kqLsVCUu'] || results['vendor'] || 0,
    'vendor-react': results['vendor-react'] || 0,
    'vendor-markdown': results['vendor-markdown'] || 0,
    'main': results['index'] || 0,
    'DinoGame': results['DinoGame'] || 0,
    'ReflectionDetail': results['ReflectionDetail'] || 0,
    'total-css': results['total-css'] || 0,
  };
  
  // Print results
  console.log('Bundle Sizes (gzipped):');
  console.log('------------------------');
  
  const sortedEntries = Object.entries(budgetMap).sort((a, b) => b[1] - a[1]);
  
  for (const [name, size] of sortedEntries) {
    const budget = BUDGETS[name];
    const status = budget !== undefined && size > budget ? '❌ OVER' : '✅';
    if (budget !== undefined && size > budget) hasFailures = true;
    const budgetStr = budget !== undefined ? ` (budget: ${budget} KB)` : '';
    console.log(`  ${name.padEnd(25)} ${size.toFixed(1).padStart(6)} KB ${status}${budgetStr}`);
  }
  
  console.log('');
  
  if (hasFailures) {
    console.log('❌ Bundle size budget exceeded!');
    process.exit(1);
  } else {
    console.log('✅ All bundle size budgets met!');
    process.exit(0);
  }
}

main();