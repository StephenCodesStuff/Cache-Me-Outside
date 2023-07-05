//Creating model for data table to record every instance of a cache being found
//foreign keys for foundcaches and finders, work as through table for M:M relationship between users and foundcaches
//model to keep all finders information for each foundcache, ex. foundcache_id===cache_id, but each "find event" has a different finder/user
//in order to save all past finders of a given cache, each event must be stored as a 'time-found' while the actual NUMBER of times the cache has been found is stored in the value inside 'times-found' column
