-- Enable the UUID extension if not already enabled
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Create an enum for language
CREATE TYPE language_type AS ENUM ('english', 'hindi');

-- Create the playlists table
CREATE TABLE playlists (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    title VARCHAR(255) NOT NULL,
    description TEXT,
    thumbnail_url TEXT NOT NULL,
    language language_type NOT NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- Create the videos table
CREATE TABLE videos (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    playlist_id UUID NOT NULL REFERENCES playlists(id) ON DELETE CASCADE,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    thumbnail_url TEXT NOT NULL,
    video_id VARCHAR(50) NOT NULL, -- YouTube video ID
    duration VARCHAR(10) NOT NULL, -- Duration in format like "10:15"
    position INTEGER NOT NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(playlist_id, position) -- Ensure unique positions within a playlist
);

-- Create indices for better performance
CREATE INDEX idx_playlists_language ON playlists(language);
CREATE INDEX idx_videos_playlist_id ON videos(playlist_id);
CREATE INDEX idx_videos_position ON videos(playlist_id, position);

-- Create a function to update the updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Create triggers to automatically update the updated_at column
CREATE TRIGGER update_playlists_updated_at
    BEFORE UPDATE ON playlists
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_videos_updated_at
    BEFORE UPDATE ON videos
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

-- Enable Row Level Security (RLS)
ALTER TABLE playlists ENABLE ROW LEVEL SECURITY;
ALTER TABLE videos ENABLE ROW LEVEL SECURITY;

-- Create policies for public access (read-only)
CREATE POLICY "Enable read access for all users" ON playlists
    FOR SELECT
    TO public
    USING (true);

CREATE POLICY "Enable read access for all users" ON videos
    FOR SELECT
    TO public
    USING (true);

-- Insert sample data
INSERT INTO playlists (title, description, thumbnail_url, language) VALUES
    ('Learning React', 'Comprehensive React tutorials for beginners', 'https://img.youtube.com/vi/w7ejDZ8SWv8/maxresdefault.jpg', 'english'),
    ('Web Development', 'Advanced web development techniques', 'https://img.youtube.com/vi/TNhaISOUy6Q/maxresdefault.jpg', 'english'),
    ('UI/UX Design', 'Design principles and practices', 'https://img.youtube.com/vi/O6P86uwfdR0/maxresdefault.jpg', 'english'),
    ('JavaScript Mastery', 'Advanced JavaScript concepts', 'https://img.youtube.com/vi/hdI2bqOjy3c/maxresdefault.jpg', 'english'),
    ('हिंदी में प्रोग्रामिंग', 'प्रोग्रामिंग की मूल बातें', 'https://img.youtube.com/vi/hKB-YGF14SY/maxresdefault.jpg', 'hindi'),
    ('वेब डेवलपमेंट सीखें', 'वेब डेवलपमेंट के लिए मार्गदर्शिका', 'https://img.youtube.com/vi/1y8aYd9CqZI/maxresdefault.jpg', 'hindi'),
    ('फ्रंट-एंड मास्टरी', 'रिएक्ट और जावास्क्रिप्ट सीखें', 'https://img.youtube.com/vi/IyBwvNiqGdI/maxresdefault.jpg', 'hindi');

-- Insert videos for the React playlist
WITH react_playlist AS (SELECT id FROM playlists WHERE title = 'Learning React' LIMIT 1)
INSERT INTO videos (playlist_id, title, description, thumbnail_url, video_id, duration, position) VALUES
    ((SELECT id FROM react_playlist), 'React Basics', 'Learn the fundamentals of React', 'https://img.youtube.com/vi/w7ejDZ8SWv8/maxresdefault.jpg', 'w7ejDZ8SWv8', '10:15', 1),
    ((SELECT id FROM react_playlist), 'React Hooks', 'Understanding React hooks in depth', 'https://img.youtube.com/vi/TNhaISOUy6Q/maxresdefault.jpg', 'TNhaISOUy6Q', '18:22', 2),
    ((SELECT id FROM react_playlist), 'State Management', 'Managing state in React applications', 'https://img.youtube.com/vi/O6P86uwfdR0/maxresdefault.jpg', 'O6P86uwfdR0', '14:30', 3);

-- Insert videos for the Hindi programming playlist
WITH hindi_playlist AS (SELECT id FROM playlists WHERE title = 'हिंदी में प्रोग्रामिंग' LIMIT 1)
INSERT INTO videos (playlist_id, title, description, thumbnail_url, video_id, duration, position) VALUES
    ((SELECT id FROM hindi_playlist), 'जावास्क्रिप्ट परिचय', 'जावास्क्रिप्ट की मूल बातें', 'https://img.youtube.com/vi/hKB-YGF14SY/maxresdefault.jpg', 'hKB-YGF14SY', '12:45', 1),
    ((SELECT id FROM hindi_playlist), 'DOM मैनिपुलेशन', 'DOM के साथ काम करना', 'https://img.youtube.com/vi/1y8aYd9CqZI/maxresdefault.jpg', '1y8aYd9CqZI', '15:10', 2); 