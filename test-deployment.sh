#!/bin/bash

URL="https://aula-production-c563.up.railway.app"

echo "Testing Aula Dashboard Deployment"
echo "=================================="
echo ""
echo "URL: $URL"
echo ""

# Test main page
echo "Testing main page..."
response=$(curl -s -w "\n%{http_code}" "$URL/")
body=$(echo "$response" | head -n 1)
code=$(echo "$response" | tail -n 1)

echo "HTTP Status: $code"

if [ "$code" = "200" ]; then
  echo "✅ SUCCESS! Site is responding."
  if echo "$body" | grep -q "Sales Dashboard"; then
    echo "✅ Dashboard content found!"
  fi
else
  echo "❌ Error: Server returned $code"
  if echo "$body" | grep -q "502"; then
    echo "   This is a 502 Bad Gateway - check Railway logs"
  fi
fi

echo ""
echo "Raw response (first 200 chars):"
echo "$body" | head -c 200
echo ""
