#!/bin/bash

echo "Testing builds for all tasks..."
echo "================================"

SUCCESS=0
FAILED=0

for i in {0..10}; do
    echo ""
    echo "Testing task_$i..."
    if cd task_$i/dashboard 2>/dev/null && npm run build > build_output.log 2>&1; then
        echo "✓ Task $i: BUILD SUCCESS"
        SUCCESS=$((SUCCESS + 1))
    else
        echo "✗ Task $i: BUILD FAILED"
        FAILED=$((FAILED + 1))
    fi
    cd ../..
done

echo ""
echo "================================"
echo "Results:"
echo "  ✓ Successful: $SUCCESS"
echo "  ✗ Failed: $FAILED"
echo "================================"
