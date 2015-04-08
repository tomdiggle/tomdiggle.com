# tomdiggle.com
---------------

## Setup
To get started run the following commands:

```
	git clone git@bitbucket.org:tomdiggle/tomdiggle.com.git
	cd tomdiggle.com
	bundle install
```

## Running
To serve the site run:

```
	rake serve
```

This will run the site at `http://127.0.0.1:4000` using the debug config. It will also watch for any changes and recompile the site if any are detected.

## Building
To build the site for the staging server run:

```
	rake build_staging
```

The site will be built into the `public` directory using the debug config.

To build the site for the production server run:

```
	rake build
```

## New Post
To create a new post run the following command:

```
	rake new_post "Post Title"
```

This will create a new post file in the markdown format located in `source/_posts` directory.