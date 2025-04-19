source "https://rubygems.org"

# Pin ffi to a version compatible with RubyGems 3.1.4
gem "ffi", "~> 1.15.5"  # This older version is compatible with RubyGems 3.1.4

gem "jekyll", "~> 4.2.0"
gem "webrick", "~> 1.7.0"

# Jekyll plugins with pinned versions for compatibility
group :jekyll_plugins do
  gem "jekyll-feed", "~> 0.15.1"
  gem "jekyll-seo-tag", "~> 2.7.1"
  gem "jekyll-paginate", "~> 1.1.0"
  gem "jekyll-sitemap", "~> 1.4.0"
end

# Also pin these gems that might cause issues
gem "sassc", "~> 2.4.0"
gem "http_parser.rb", "~> 0.6.0"
gem "eventmachine", "~> 1.2.7"