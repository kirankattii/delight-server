#!/usr/bin/env node

// Custom startup script for Render deployment
console.log('🚀 Starting ManjuDelight Strapi application...');
console.log('📊 Environment variables:');
console.log(`   NODE_ENV: ${process.env.NODE_ENV}`);
console.log(`   RENDER: ${process.env.RENDER}`);
console.log(`   PORT: ${process.env.PORT}`);
console.log(`   HOST: ${process.env.HOST}`);
console.log(`   DATABASE_CLIENT: ${process.env.DATABASE_CLIENT}`);
console.log(`   DATABASE_URL exists: ${!!process.env.DATABASE_URL}`);

// Set default environment variables if not set
if (!process.env.HOST) {
  process.env.HOST = '0.0.0.0';
}
if (!process.env.RENDER) {
  process.env.RENDER = 'true';
}

console.log('🔧 Starting Strapi...');

// Start Strapi
require('@strapi/strapi').start();
