---
layout: post
title: Data Persistence 0.1.0
date: 2015-11-15 21:13
categories: iOS
vanityurlpath:
---
DataPersistence is a drop in class that allows easy persistence of data using NSKeyedArchiver/NSKeyedUnarchiver.

## Usage
DataPersistence has two class methods one to save data to disk and one to load data from disk.

To save data to disk call:

```
DataPersistence.saveData(data: AnyObject, directory: NSSearchPathDirectory, filename: String)
```

To load data from disk call:

```
DataPersistence.loadData(directory: NSSearchPathDirectory, filename: String)
```

## License
Data Persistence is released under the MIT license.
