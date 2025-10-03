#!/bin/bash

echo "========================================="
echo "COMPREHENSIVE BUILD VERIFICATION"
echo "========================================="
echo ""

echo "1. TypeScript Type Check"
echo "-------------------------"
pnpm tsc --noEmit
if [ $? -eq 0 ]; then
    echo "✅ TypeScript: PASSED"
else
    echo "❌ TypeScript: FAILED"
    exit 1
fi
echo ""

echo "2. ESLint Code Quality Check"
echo "-----------------------------"
pnpm next lint
if [ $? -eq 0 ]; then
    echo "✅ ESLint: PASSED"
else
    echo "❌ ESLint: FAILED"
    exit 1
fi
echo ""

echo "3. Production Build"
echo "-------------------"
pnpm run build
if [ $? -eq 0 ]; then
    echo "✅ Build: PASSED"
else
    echo "❌ Build: FAILED"
    exit 1
fi
echo ""

echo "========================================="
echo "ALL CHECKS PASSED ✅"
echo "========================================="
echo "Ready for deployment!"

