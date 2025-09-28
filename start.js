#!/usr/bin/env node

// Custom startup script for Railway deployment
console.log('🚀 Starting ManjuDelight Strapi application...');
console.log('📊 Environment variables:');
console.log(`   NODE_ENV: ${process.env.NODE_ENV}`);
console.log(`   PORT: ${process.env.PORT}`);
console.log(`   HOST: ${process.env.HOST}`);
console.log(`   DATABASE_CLIENT: ${process.env.DATABASE_CLIENT}`);
console.log(`   DATABASE_URL exists: ${!!process.env.DATABASE_URL}`);

// Set default environment variables if not set
if (!process.env.HOST) {
  process.env.HOST = '0.0.0.0';
}

// Handle IPv6 issues with Supabase
if (process.env.DATABASE_URL && process.env.DATABASE_URL.includes('supabase')) {
  console.log('🔧 Detected Supabase database, applying IPv4 fixes...');
  
  // Set additional environment variables for better connection handling
  process.env.NODE_OPTIONS = (process.env.NODE_OPTIONS || '') + ' --dns-result-order=ipv4first';
  
  // Force IPv4 DNS resolution
  process.env.NODE_OPTIONS = (process.env.NODE_OPTIONS || '') + ' --dns-result-order=ipv4first';
  
  // Log the current DATABASE_URL for debugging
  console.log(`📊 Current DATABASE_URL: ${process.env.DATABASE_URL.replace(/:[^:@]+@/, ':***@')}`);
  
  // Check if we need to convert to pooler
  if (process.env.DATABASE_URL.includes('.supabase.co') && !process.env.DATABASE_URL.includes('pooler')) {
    console.log('🔄 Converting Supabase URL to use IPv4 pooler...');
    const url = new URL(process.env.DATABASE_URL);
    const ipv4Hostname = url.hostname.replace(/\.supabase\.co$/, '.pooler.supabase.co');
    process.env.DATABASE_URL = process.env.DATABASE_URL.replace(url.hostname, ipv4Hostname);
    console.log(`✅ Updated DATABASE_URL to use pooler: ${ipv4Hostname}`);
  }
}

console.log('🔧 Starting Strapi...');

// Start Strapi with error handling
try {
  // For Strapi v5, use the correct import and start method
  const strapi = require('@strapi/strapi');
  strapi().start();
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
