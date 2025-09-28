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

// Handle database connection issues
if (process.env.DATABASE_URL) {
  console.log(`📊 Current DATABASE_URL: ${process.env.DATABASE_URL.replace(/:[^:@]+@/, ':***@')}`);
  
  // Set additional environment variables for better connection handling
  process.env.NODE_OPTIONS = (process.env.NODE_OPTIONS || '') + ' --dns-result-order=ipv4first';
  
  if (process.env.DATABASE_URL.includes('render.com') || process.env.DATABASE_URL.includes('onrender.com')) {
    console.log('🔧 Detected Render PostgreSQL database, applying optimized settings...');
    
    // Set additional environment variables for Render Postgres
    if (!process.env.DATABASE_CLIENT) process.env.DATABASE_CLIENT = 'postgres';
    if (!process.env.DATABASE_SSL) process.env.DATABASE_SSL = 'true';
    if (!process.env.DATABASE_SSL_REJECT_UNAUTHORIZED) process.env.DATABASE_SSL_REJECT_UNAUTHORIZED = 'false';
    if (!process.env.DATABASE_POOL_MIN) process.env.DATABASE_POOL_MIN = '1';
    if (!process.env.DATABASE_POOL_MAX) process.env.DATABASE_POOL_MAX = '20';
    
    console.log('✅ Render PostgreSQL environment variables configured');
  } else if (process.env.DATABASE_URL.includes('supabase')) {
    console.log('🔧 Detected Supabase database, applying IPv4 fixes...');
    
    // Check if we need to convert to pooler
    if (process.env.DATABASE_URL.includes('.supabase.co') && !process.env.DATABASE_URL.includes('pooler')) {
      console.log('🔄 Converting Supabase URL to use IPv4 pooler...');
      const url = new URL(process.env.DATABASE_URL);
      
      // Use Supabase's correct IPv4 pooler endpoint format
      // Format: aws-0-{region}.pooler.supabase.com
      let ipv4Hostname;
      if (url.hostname.includes('db.')) {
        // Extract the project reference from db.{project-ref}.supabase.co
        const projectRef = url.hostname.replace('db.', '').replace('.supabase.co', '');
        ipv4Hostname = `aws-0-us-west-1.pooler.supabase.com`;
      } else {
        // Fallback to original hostname if format is unexpected
        ipv4Hostname = url.hostname;
      }
      
      process.env.DATABASE_URL = process.env.DATABASE_URL.replace(url.hostname, ipv4Hostname);
      console.log(`✅ Updated DATABASE_URL to use pooler: ${ipv4Hostname}`);
    }
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
