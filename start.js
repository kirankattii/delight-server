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

// Handle IPv6 issues with Supabase
if (process.env.DATABASE_URL && process.env.DATABASE_URL.includes('supabase')) {
  console.log('🔧 Detected Supabase database, applying IPv4 fixes...');
  
  // Force IPv4 for Node.js DNS resolution
  const dns = require('dns');
  dns.setDefaultResultOrder('ipv4first');
  
  // Set additional environment variables for better connection handling
  process.env.NODE_OPTIONS = (process.env.NODE_OPTIONS || '') + ' --dns-result-order=ipv4first';
}

console.log('🔧 Starting Strapi...');

// Start Strapi with error handling
try {
  require('@strapi/strapi').start();
} catch (error) {
  console.error('❌ Failed to start Strapi:', error.message);
  
  // If it's a database connection error, provide helpful information
  if (error.message.includes('ENETUNREACH') || error.message.includes('IPv6')) {
    console.log('💡 This appears to be an IPv6 connectivity issue with Supabase.');
    console.log('💡 The application has been configured to use IPv4 connections.');
    console.log('💡 Please check your Supabase connection string and ensure it uses IPv4.');
  }
  
  process.exit(1);
}
