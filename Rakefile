require "rubygems"
require "stringex"

## Configs
public_dir = "public"
source_dir = "source"
posts_dir = "_posts"
new_post_ext = "markdown"

# Usage
desc "Create a new post in #{source_dir}/#{posts_dir}"
task :new_post, :title do |t, args|
  if args.title
    title = args.title
  else
    title = get_stdin("Enter a title for your post: ")
  end

  filename = "#{source_dir}/#{posts_dir}/#{Time.now.strftime('%Y-%m-%d')}-#{title.to_url}.#{new_post_ext}"
  if File.exists?(filename)
    abort("rake aborted!") if ask("#{filename} already exists. Do you want to overwrite?", ['y', 'n']) == 'n'
  end

  puts "Creating new post: #{filename}"

  open(filename, 'w') do |post|
    post.puts "---"
    post.puts "layout: post"
    post.puts "title: \"#{title.gsub(/&/,'&amp;')}\""
    post.puts "date: #{Time.now.strftime('%Y-%m-%d %H:%M')}"
    post.puts "categories: "
    post.puts "shorturlpath:"
    post.puts "twitter_description:"
    post.puts "---"
  end
end

## Helper Methods

def get_stdin(message)
  print message
  STDIN.gets.chomp
end