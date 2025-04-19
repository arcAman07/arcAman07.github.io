#!/bin/bash

# Exit on error
set -e

# Print commands
set -x

echo "=== Environment Information ==="
ruby -v
gem -v
echo "=== End Environment Information ==="

# Install specific bundler version
gem install bundler -v '2.3.26' --no-document

# Verify bundler installation
echo "Bundler version:"
bundle -v

# Remove any existing Gemfile.lock to avoid conflicts
rm -f Gemfile.lock

# Install dependencies
bundle install

# Build the site
JEKYLL_ENV=production bundle exec jekyll build

# Success message
echo "=== Build completed successfully ==="