---
layout: "post"
title: "Multiply Jekyll Config Files"
description: "Multiply Jekyll config files to make developing your site easier."
date: 2015-08-24 15:22
categories: "Jekyll"
vanityurlpath:
twitter_description: "Multiply Jekyll config files to make developing your site easier."
---
Here is an example of how having multiply Jekyll `_config.yml` files can make it easier when developing your site locally or building it for the staging or production servers.

Firstly, add this option to your current `_config.yml`.

~~~
...
production: true
...
~~~

Now, copy and rename the `_config.yml` file to `_config_debug.yml` and change the `production` option to `false`. That’s the setup complete.

The `production` option can be accessed in your template files using the `site` global variable. This allows code to be included in certain builds and not in others using `if` and `unless` statements. For example the following code is only included in staging builds.

~~~ ruby
{{ "{% unless site.production "}}%}
    <meta name=“robots” content=“noindex, nofollow”>
{{ "{% endunless "}}%}
~~~

Another example would be to not include any analytics code in local development or staging builds using an `if` statement.

~~~ ruby
{{ "{% if site.production "}}%}
    ...
{{ "{% endif "}}%}
~~~

## Serving & Building Your Site
To serve site using the debug config file run the following command in the Terminal:

~~~
jekyll serve -w —config _config_debug.yml
~~~

To build the site for production run:

~~~
jekyll build —config _config_debug.yml
~~~

Finally, to build the site for production run:

~~~
jekyll build —config _config.yml
~~~

Instead of having to remember and type out these commands each time you wan to use them, there is a easier way with a Rakefile.

## Simplify with a Rakefile
A Rakefile contains executable Ruby code. Anything legal in a ruby script is allowed in a Rakefile. If you haven’t already created a Rakefile in your project create one now and add the following:

~~~
desc “Start Jekyll using the debug config”
task :serve do
  sh “jekyll serve -w —config _config_debug.yml”
end

desc “Build the staging site”
task :build_staging do
  sh “jekyll build —config _config_debug.yml”
end

desc “Build the production site”
task :build do
  sh “jekyll build —config _config.yml”
end
~~~

Now to serve the site locally run:

~~~
rake serve
~~~

To build the site for production run:

~~~
rake build_staging
~~~

Finally, to build the site for production run:

~~~
rake build
~~~

## Conclusion
Having two `_config.yml` files means that if you want to add a new option you have to remember to add it to both config files. While this is a slight inconvenience the benefits of being able to not include certain code in different builds is worth it.

As always I would love to [hear](https://twitter.com/tomdiggle) from you if you have any improvements, comments or any Jekyll tips of your own.
