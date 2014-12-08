---
layout: post
title: "Data Persistence with NSCoding in Swift"
date: 2014-12-08 12:52
categories: Swift NSCoding NSKeyedArchiver NSKeyedUnarchiver Wager
shorturlpath:
twitter_description: Data Persistence with NSCoding in Swift
---

I have recently started to give [Wager](https://itunes.apple.com/gb/app/wager/id378869159?mt=8&uo=4) some much needed TLC by updating it for iOS 8 and rebuilding it in Swift. I decided to ditch Core Data and use NSCoding instead.

I created a class to save and load data using NSKeyedArchiver/NSKeyedUnarchiver that you may find useful.

To save data call `saveData(data: AnyObject, directory: NSSearchPathDirectory, filename: String)` and to load data call `loadDataFromDirectory(directory: NSSearchPathDirectory, filename: String)` methods.

The data persistence class is below but if you want to make changes it is also available as a [GitHub Gist](https://gist.github.com/tomdiggle/75906f60a485affaabd2).

~~~ swift
import Foundation

// Data persistence errors
public let DataPersistenceErrorDomain = "com.tomdiggle.datapersistence.error"

class DataPersistence {

    // MARK: Saving Data

    /**
    * Save data to disk using NSKeyedArchiver.
    *
    * :param: AnyObject
    * :param: NSSearchPathDirectory
    * :param: String
    * :return: A tuple containing the error that occurred, if any and a success and a boolen value to indicate success or failure.
    */
    class func saveData(data: AnyObject, directory: NSSearchPathDirectory, filename: String) -> (error: NSError?, success: Bool) {
        let dataFilepath = DataPersistence.dataFilepath(directory, filename: filename)

        if dataFilepath.success {
            if let filepath = dataFilepath.filepath {
                return (nil, NSKeyedArchiver.archiveRootObject(data, toFile: filepath))
            }
        }

        return (dataFilepath.error, false)
    }

    // MARK: Loading Data

    /**
    * Load data from disk using NSKeyedUnarchiver.
    *
    * :param: NSSearchPathDirectory The directory the data is located.
    * :param: String The filename of the data.
    * :return: A tuple containing the data that has been loaded, the error that occurred, if any and a boolen value to indicate success or failure.
    */
    class func loadDataFromDirectory(directory: NSSearchPathDirectory, filename: String) -> (data: AnyObject?, error: NSError?, success: Bool) {
        let dataFilepath = DataPersistence.dataFilepath(directory, filename: filename)
        if let filepath = dataFilepath.filepath {
            let data: AnyObject? = NSKeyedUnarchiver.unarchiveObjectWithFile(filepath)

            return (data, nil, true)
        }

        return (nil, dataFilepath.error, false)
    }

    // MARK: Helper Methods

    private class func directoryURL(directory: NSSearchPathDirectory) -> (url: NSURL?, error: NSError?, success: Bool) {
        var error: NSError?

        if let fileDirectory = NSFileManager.defaultManager().URLForDirectory(directory, inDomain: NSSearchPathDomainMask.UserDomainMask, appropriateForURL: nil, create: false, error: &error) {
            return (fileDirectory, nil, true)
        }

        return (nil, error, false)
    }

    private class func dataFilepath(directory: NSSearchPathDirectory, filename: String) -> (filepath: String?, error: NSError?, success: Bool) {
        let directoryURL = DataPersistence.directoryURL(directory)
        let filepath = directoryURL.url!.relativePath! + filename

        if NSFileManager.defaultManager().fileExistsAtPath(filepath) {
            return (filepath, nil, true)
        }

        let error = NSError(domain: DataPersistenceErrorDomain, code: -1, userInfo: nil)
        return (nil, error, false)
    }

}
~~~
