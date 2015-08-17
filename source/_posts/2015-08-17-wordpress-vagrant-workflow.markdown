---
layout: post
title: "WordPress &amp; Vagrant Workflow"
date: 2015-08-17 19:40
categories: wordpress
vanityurlpath:
twitter_description: "A WordPress & Vagrant workflow to improve your local WordPress development."
---
I while back I posted about [my WordPress setup](http://tomdiggle.com/my-wordpress-setup) which covers the tools I use for my local WordPress development. In this article I will be going more in-depth about how to set everything up. At the end of this article you will have a configurable sandboxed environment that is consistent and can be distributed between team members.

When I started using WordPress I stored everything in Git. I quickly realised this is a bad idea because it means having custom `wp-config.php` files for different server configurations or awkward workarounds and keeping the local development version of WordPress in sync with the staging and production servers can be a nightmare. There must be an easier way.

I decided to take a step back and look what actually needed to be in the repository. It turns out that you don’t really need to keep track of the WordPress core files, plugins and uploads if all you're working on is a theme. All those other files add a layer of complexity that isn’t needed.

## Before We Begin
Before we begin the following software need to be installed:

- [Homebrew](http://brew.sh){:target="_blank"}
- [Git](https://git-scm.com){:target="_blank"}
- [Virtual Box](https://www.virtualbox.org){:target="_blank"}
- [Vagrant](https://www.vagrantup.com){:target="_blank"}

I’m using a Mac for local development, so if you’re using Windows, things will be slightly different.

## Varying Vagrant Vagrants
[Varying Vagrant Vagrants](https://github.com/Varying-Vagrant-Vagrants/VVV){:target="_blank"} is an open source Vagrant configuration focused on WordPress development. If you’re building a full WordPress site, theme or plugin VVV is the best place to do your local development. You can get VVV setup quickly following the [guide](https://github.com/Varying-Vagrant-Vagrants/VVV#the-first-vagrant-up){:target="_blank"} on the GitHub project page. While VVV is running there is a [default dashboard](http://vvv.dev/){:target="_blank"} available containing several useful tools.

To take advantage of Varying Vagrant Vagrants (VVV) all additional instances of WordPress will be created in `vagrant-local/www/` directory.

## Setting up a Git repository
First we need to create a project directory in `vagrant-local/www/` and set up an empty Git repository. In a Terminal session enter:

~~~
    mkdir site-name && cd site-name
    git init
~~~

Before creating WordPress, to keep our Git repository as empty as possible we only want to track our theme directory and ignore everything else. This is done by using the following `.gitignore`.

~~~
    #Thanks to: https://plausiblethought.net/wordpress-git-workflow/

    #Ignore everything in the htdocs except the “wp-content” directory.
    htdocs/*
    !wp-content/
 
    #Ignore everything in the “wp-content” directory, except the “themes” directory.
    htdocs/wp-content/*
    !htdocs/wp-content/themes/

    #Ignore everything in the “plugins” directory, except the plugins you specify
    #wp-content/plugins/*
    #!wp-content/plugins/my-single-file-plugin.php
    #!wp-content/plugins/my-directory-plugin/
 
    #Ignore everything in the “themes” directory, except the themes you specify.
    htdocs/wp-content/themes/*
    !htdocs/wp-content/themes/site-theme/
~~~

## Using Variable VVV
To create WordPress site we will be using [Variable VVV](https://github.com/bradp/vv){:target="_blank"}. VV makes it extremely easy to create a new WordPress site using Varying Vagrant Vagrants. If you haven’t already got VV installed you can install it easily using Homebrew.

`brew install bradp/vv/vv`

Once VV is installed, the command below will create a WordPress site named `site-name` that has the domain name `site-name.dev` with `WP_DEBUG` and `WP_DEBUG_LOG` turned on. The WordPress site will be located in `vagrant-local/www/` directory. VV will automatically find your VVV installation.

`vv create --debug -n {site-name} -d {site-url}.dev -u {site-url} --username {username} --password {password} --email {email}`

{% image vv-terminal.png alt="VV Terminal" class="post-img__medium" %}

Here are a few other VV commands you will find useful:

`vv list` - Lists all VVV sites.

`vv create` - Create a new site.

`vv remove` - Remove a site.

VV has many features and is updated regularly so the documentation on [GitHub](https://github.com/bradp/vv){:target="_blank"} is well worth reading.

## Using Varying Vagrant Vagrants
When creating the site, VV will run the command `vagrant up --provision` which will initialize the site by running provisioning scripts to make sure everything is set up correctly. It will also start the virtual machine that powers VVV and make the site visible at the url `http://site-name.dev`. You will be able to log in to the WordPress admin panel using the username and password you set when creating the site.

{% image vvv-dashboard.png alt="VVV Dashboard" class="post-img__medium" %}

Below are the most common Vagrant commands you’ll be using. It’s worth reading the [documentation](https://docs.vagrantup.com/v2/){:target="_blank"} because there are plenty more.

`vagrant up` - When in the VVV root directory this will start the VVV virtual machine.

`vagrant halt` - Stops the virtual machine.

`vagrant ssh` - Allows you to connect to the VVV virtual machine via ssh. Connecting to the virtual machine is really useful because it allows you to run [WP-CLI](http://wp-cli.org){:target="_blank"} and other scripts inside of VVV. 

The one problem with `vagrant ssh` command is that you are not dropped into the corresponding working directory, so you have to `cd` to the directory then do whatever you needed to do. [Vassh](https://github.com/xwp/vassh){:target="_blank"} solves this.

## Vassh
You can install [Vassh](https://github.com/xwp/vassh){:target="_blank"} using Homebrew:

`brew install vassh`

Now, if you want to install a plugin make sure you start in the corresponding directory then all you need to do is: 

`vassh wp plugin install contact-form-7 --activate`

{%  image vassh-plugin-install.png alt="Installing a WordPress plugin with Vassh" class="post-img__medium" %}

That’s it, the plugin is now installed.

## Syncing Databases
Im use [WP Migrate DB Pro](https://deliciousbrains.com/wp-migrate-db-pro/){:target="_blank"} to keep the databases in sync. WP Migrate DB Pro makes it really easy to copy your database from one WordPress install to another with one click in your dashboard. To see how easy it is [watch](https://www.youtube.com/watch?v=u7jFkwwfeJc){:target="_blank"} this walkthrough.

## Conclusion
Hopefully, you’ve found this article useful and seen how powerful Vagrant and Varying Vagrant Vagrants can be when developing your WordPress sites locally. This isn’t where it stops. In another article, I’ll explain how I use [Grunt](http://gruntjs.com){:target="_blank"} to compile Sass files, compress assets and deploy the site to the staging and production servers. If you have any thoughts, suggestions or improvements then I would love to [know](https://twitter.com/tomdiggle){:target="_blank"}.

I’ve taken advice from the following sources:

- [http://webdevstudios.com/2015/01/14/getting-started-vagrant-vvv-local-development/](http://webdevstudios.com/2015/01/14/getting-started-vagrant-vvv-local-development/){:target="_blank"}
- [https://plausiblethought.net/wordpress-git-workflow/](https://plausiblethought.net/wordpress-git-workflow/){:target="_blank"}