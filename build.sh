#!/bin/bash

# Print all commands for debugging
set -x

# Print Ruby and environment info
echo "Ruby version:"
ruby -v
echo "Bundler version if installed:"
bundle -v || echo "Bundler not installed yet"
echo "Environment:"
env | grep RUBY
env | grep BUNDLER

# Install specific bundler version
gem install bundler -v '2.3.26' --no-document
bundle -v

# Clear any existing lock file to avoid conflicts
rm -f Gemfile.lock

# Install dependencies
bundle install

# Build the site
JEKYLL_ENV=production bundle exec jekyll build

# Check if build succeeded
if [ $? -eq 0 ]; then
  echo "Jekyll build succeeded!"
  exit 0
else
  echo "Jekyll build failed!"
  exit 1
fi