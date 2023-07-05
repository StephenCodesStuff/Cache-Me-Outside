DROP DATABASE IF EXISTS cacheme_db;
CREATE DATABASE cacheme_db;

INSERT INTO timesfound (num_times_found,finder_id,cache_id,found_cache_id,created_at,updated_at) VALUES (1,1,1,1,'2023-07-05 20:22:20','2023-07-05 20:22:20');


-- Update rows in table 'TableName'
UPDATE timesfound
SET
    found_cache_id = 1
    -- add more columns and values here
WHERE 	/* add search conditions here */
    id = 1;