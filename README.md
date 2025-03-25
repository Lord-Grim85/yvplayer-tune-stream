# YVPlayer - YouTube Video Player Application

A modern video player application that organizes and plays YouTube videos in playlists, with support for both English and Hindi content.

## Features

- Two language tabs: English and Hindi
- Organized playlists with video collections
- Built-in YouTube video player
- Responsive design with system theme support
- Supabase backend for data storage

## Prerequisites

- Node.js 18+ and npm/yarn/pnpm
- A Supabase account and project

## Setup Instructions

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd yvplayer-tune-stream
   ```

2. Install dependencies:
   ```bash
   npm install
   # or
   yarn install
   # or
   pnpm install
   ```

3. Set up Supabase:
   - Create a new project in Supabase
   - Copy the SQL from `supabase/migrations/20240325_initial_schema.sql`
   - Run the SQL in your Supabase project's SQL editor
   - Get your project URL and anon key from Project Settings > API

4. Configure environment variables:
   ```bash
   cp .env.example .env
   ```
   Then edit `.env` and add your Supabase project URL and anon key:
   ```
   VITE_SUPABASE_URL=your_project_url
   VITE_SUPABASE_ANON_KEY=your_anon_key
   ```

5. Start the development server:
   ```bash
   npm run dev
   # or
   yarn dev
   # or
   pnpm dev
   ```

6. Open [http://localhost:5173](http://localhost:5173) in your browser

## Project Structure

```
yvplayer-tune-stream/
├── src/
│   ├── components/      # React components
│   ├── lib/            # Utilities and Supabase client
│   ├── pages/          # Page components
│   └── ...
├── supabase/
│   └── migrations/     # Database migrations
└── ...
```

## Database Schema

### Playlists Table
```sql
CREATE TABLE playlists (
    id UUID PRIMARY KEY,
    title VARCHAR(255),
    description TEXT,
    thumbnail_url TEXT,
    language language_type,
    created_at TIMESTAMPTZ,
    updated_at TIMESTAMPTZ
);
```

### Videos Table
```sql
CREATE TABLE videos (
    id UUID PRIMARY KEY,
    playlist_id UUID REFERENCES playlists,
    title VARCHAR(255),
    description TEXT,
    thumbnail_url TEXT,
    video_id VARCHAR(50),
    duration VARCHAR(10),
    position INTEGER,
    created_at TIMESTAMPTZ,
    updated_at TIMESTAMPTZ
);
```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.
