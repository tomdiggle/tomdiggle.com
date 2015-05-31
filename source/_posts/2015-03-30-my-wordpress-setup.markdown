---
layout: post
title: "My WordPress Setup"
date: 2015-03-30 16:28
categories: WordPress
vanityurlpath:
twitter_description: Learn about my WordPress setup.
---

I have recently completed my first [WordPress](https://wordpress.org) site and would like to take the time to explain my local WordPress development environment and how I keep the production, staging and local sites in sync.

This is not a "how to setup” guide, I am merely documenting the tools I use because it took me quite some time to find the right setup that meets my goal of having a configurable sandboxed environment that is consistent and can be distributed between team members. No more it works on my machine bugs.

### VirtualBox
[VirtualBox](https://www.virtualbox.org) allows you to run a virtual machine sandboxed from your local environment. It’s freely available as Open Source Software. VirtualBox will be used to run the Vagrant environment.

### Vagrant
[Vagrant](https://www.vagrantup.com) is a tool for building and distributing development environments. Vagrant works great with VirtualBox and allows us to quickly create configurable sandboxed environments for working with WordPress.

### Varying Vagrant Vagrants
> [Varying Vagrant Vagrants](https://github.com/Varying-Vagrant-Vagrants/VVV) is an open source Vagrant configuration focused on WordPress development.

When VVV is first run it builds a virtualised Ubuntu server which contains everything needed to develop a WordPress theme or plugin. Although VVV allows you to develop [multiple projects](https://github.com/Varying-Vagrant-Vagrants/VVV#vvv-as-a-mampxampp-replacement) at once in the same environment, you can separate the client’s site into its own directory `vagrant-local/www/{client-site}`. You can then access the client site at `http://client-site.dev` when Vagrant is up.

VVV clones the WordPress `trunk` which is located in the directory `vagrant-local/www/wordpress-trunk` or you can access it in your browser at `http://local.wordpress-trunk.dev`. This is really handy because it allows you to check if there are any issues with your theme or plugin before the next version of WordPress is released.

VVV also has a dashboard containing several usefully tools which can be accessed in your browser `http://vvv.dev`.

### Variable VVV
> [VV](https://github.com/bradp/vv) makes it extremely easy to create a new WordPress site using Varying Vagrant Vagrants. vv supports site creation with many different options; site blueprints to set up all your plugins, themes, and more; deployments; and lots more features.

Using one command you can quickly and easily create a WordPress site. You can also create a [blueprint](https://github.com/bradp/vv#blueprints) which can setup different plugins, themes, options that will be installed when you create a new site. Blueprints can save a lot time because you don’t have to manually install plugins or themes and can be distributed between team members. vv is also available via [Homebrew](http://brew.sh).

### Vassh
When connecting to your Vagrant environment via ssh you have to `cd` to the directory you want to run the command that needs to be executed. [Vassh](https://github.com/xwp/vassh) solves this problem by making sure you start out in the corresponding directory. Vassh is also available via [Homebrew](http://brew.sh).

### Grunt
[Grunt](http://gruntjs.com) is a JavaScript task runner and has lots of plugins that help speed up the development of WordPress themes by compressing CSS and JavaScript, optimising images, reloading your browser automatically when changes are made and deploying code to the staging and production environments are a few examples.

### Git
[Git](http://git-scm.com) is a free and open source distributed version control system. Git allows you to track the history of a project and collaborate with others.

The Git repository is set up in `vagrant-local/www/{client-site}` and only changes to the theme get managed as well as the necessary Vagrant, Varying Vagrant Vagrants and Grunt files. By not tracking any core WordPress files you don’t have to have a messy `wp_config.php` file with separate database credentials for local, staging and production environments (exposing passwords in source control that could end up in public is a bad idea anyway) and when a new version of WordPress or a plugin is released you can update it with out needing to commit any changes to the Git repository.

There are ways to use Git to deploy changes to the staging and production sites but it’s much easier to use a Grunt plugin to manage that.

### WP Migrate DB Pro
If you ever need to migrate changes from a WordPress database [WP Migrate DB Pro](https://deliciousbrains.com/wp-migrate-db-pro/) is the tool. [WP Migrate DB Pro](https://deliciousbrains.com/wp-migrate-db-pro/) is a WordPress plugin by [Delicious Brains](https://deliciousbrains.com) and it migrates WordPress databases from one install to another effortlessly. There is also an addon to migrate media files. You can watch a demo about pulling live data into your local development environment on [YouTube](https://www.youtube.com/watch?v=fHFcH4bCzmU).

These are the tools I use to manage my WordPress sites. I hope you learn something from this post and if you have any questions or improvements feel free to [tweet me](https://twitter.com/tomdiggle).