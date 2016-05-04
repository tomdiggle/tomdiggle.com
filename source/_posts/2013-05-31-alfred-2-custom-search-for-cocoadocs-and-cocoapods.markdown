---
layout: post
title: Alfred 2 Custom Search for CocoaDocs &amp; CocoaPods
description: Alfred 2 Custom Search for CocoaDocs &amp; CocoaPods.
date: 2013-05-31 09:08
categories: Alfred
vanityurlpath:
---
I'm a huge fan of [Alfred](http://www.alfredapp.com/) and find myself using it more and more, especially since the release of version 2. Alfred allows you to create custom searches which is what I've done to help me quickly search [CocoaDocs](http://cocoadocs.org/) for documentation or [CocoaPods](http://cocoapods.org/) for a pod.

## Search CocoaDocs
To invoke the custom search, you simply use keyword `cd` in Alfred's input window. Then continue typing the library name you are searching for.

{% img cocoadocs-alfred.png alt:"Alfred CocoaDocs Search" %}

Hitting enter will take you to the CocoaDocs website using your default browser with the search results displayed.

To install the CocoaDocs custom search in **Safari** click the following link [alfred://customsearch/Search%20CocoaDocs%20for%20%7Bquery%7D/cd/utf8/noplus/http://cocoadocs.org/?q={query}](alfred://customsearch/Search%20CocoaDocs%20for%20%7Bquery%7D/cd/utf8/noplus/http://cocoadocs.org/?q={query}).

## Search CocoaPods
Similar to using the CocoaDocs custom search but replace `cd` with `cp` in Alfred's input window. Then continue typing the pod name you are searching for.

{% img cocoapods-alfred.png alt:"Alfred CocoaPods Search" %}

To install the CocoaPods custom search in **Safari** click the following link [alfred://customsearch/Search%20CocoaPods%20for%20%7Bquery%7D/cp/utf8/noplus/http://cocoapods.org/?q={query}](alfred://customsearch/Search%20CocoaPods%20for%20%7Bquery%7D/cp/utf8/noplus/http://cocoapods.org/?q={query}).

## Update
As [@simontaennler](https://twitter.com/simontaennler) pointed out on [Twitter](https://twitter.com/simontaennler/status/340404769204105217) you can insert the [CocoaPods icon]({% asset_path cocoapods-logo.png %}) to pretty the search up. This is done by editing the custom search in Alfred's preferences and dropping the icon where shown. The icon will then appear next to display text when searching.

{% img alfred-pref.png alt:"Alfred CocoaDocs Search" %}
