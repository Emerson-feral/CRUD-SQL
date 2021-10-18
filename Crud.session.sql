CREATE TABLE movie_reviews(
    id INTEGER PRIMARY KEY AUTO_INCREMENT,
    movieName VARCHAR(255) NOT NULL,
    movieReview TEXT(500) NOT NULL
);

-- @BLOCK
SELECT * FROM movie_reviews;

