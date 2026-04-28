CREATE TABLE IF NOT EXISTS films (
    id UUID PRIMARY KEY,
    rating FLOAT NOT NULL,
    director VARCHAR(255) NOT NULL,
    tags TEXT[] NOT NULL DEFAULT '{}',
    title VARCHAR(255) NOT NULL,
    about TEXT NOT NULL,
    description TEXT NOT NULL,
    image VARCHAR(255) NOT NULL,
    cover VARCHAR(255) NOT NULL
);

CREATE TABLE IF NOT EXISTS schedules (
    id UUID PRIMARY KEY,
    film_id UUID NOT NULL REFERENCES films(id) ON DELETE CASCADE,
    daytime VARCHAR(50) NOT NULL,
    hall INTEGER NOT NULL,
    rows INTEGER NOT NULL,
    seats INTEGER NOT NULL,
    price INTEGER NOT NULL,
    taken TEXT[] NOT NULL DEFAULT '{}'
);
