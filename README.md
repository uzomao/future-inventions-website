# Future Inventions Lab

A research and development lab prototyping liberatory Afro-technological futures through workshops, reading groups, and digital experiments connecting creative technologists, thinkers, and communities across London, Abuja, and online.

## Project Overview

Future Inventions Lab is a static website hosted on Netlify that showcases educational sessions, workshops, and events. The site features:

- **Home page** with current information
- **Upcoming sessions** listing
- **Archive** of past events
- **About page** with project information
- **Sessions database** with detailed event information including dates, venues, descriptions, and thumbnail images

## Project Structure

```
_sessions/        # Session event files (JSON format)
_index/          # Index files for organizing sessions
_pages/          # Static pages (about, contact, home)
admin/           # Decap CMS configuration
images/          # Assets (uploads, sessions images)
fonts/           # Custom fonts
styles.css       # Main stylesheet
index.html       # Home page
about.html       # About page
sessions.html    # Sessions listing page
```

## Content Management with Decap CMS

This project uses **Decap CMS** (formerly NetlifyCMS) as a headless CMS for content management. All content updates go through the CMS interface rather than direct file editing.

### Accessing Decap CMS

1. Navigate to `/admin/` on your deployed site (e.g., `https://your-site.netlify.app/admin/`)
2. You'll be prompted to log in with **Netlify Identity**
3. Use your Netlify credentials to authenticate

### Netlify Identity Setup

To find your Netlify login information:

1. Go to your project's **Netlify dashboard**
2. Navigate to the **Identity** section (in the left sidebar)
3. You'll find authentication settings and user management here
4. This section also shows your login details and connected identity providers

Netlify Identity allows you to manage who can edit content through the CMS.

### Available Collections in Decap CMS

#### Sessions
- **Location**: `_sessions/` folder
- **Format**: JSON
- **Fields**: Title, Date, Featured Image (thumbnail), Body (markdown), Venue
- Create new sessions directly through the CMS interface
- Files are automatically slugified from the title

#### Sessions Index
- **Location**: `_index/` folder
- **Purpose**: Maintains an organized list of all active sessions
- **File**: `sessions-list.json`
- Contains a "sessions" array with session slugs for indexing and ordering

#### Pages (About, Home, Contact)
- **Location**: `_pages/` folder
- **Format**: JSON
- **Fields**: Title, Featured Image, Body (markdown), and additional fields depending on page type
- Update site content without touching HTML files

## Session File Naming & Indexing System

Sessions use a slug-based naming and indexing system:

### File Naming Convention

Session files in `_sessions/` are named using the session slug (automatically generated from the title):
- Example: `intro-to-ai-how-machines-think-london.json`
- Format: lowercase, hyphen-separated, no special characters

### The `sessionsIndex` Collection

The `sessions-list.json` file in `_index/` maintains the authoritative list of active sessions:

```json
{
  "title": "Sessions Index",
  "sessions": [
    "intro-to-digital-colonialism-london",
    "intro-to-ai-how-machines-think-london",
    "design-workshop-imagining-afro-technological-futures",
    // ... more session slugs
  ]
}
```

**Important**: 
- The order in this array determines how sessions appear on the website
- Only sessions listed in `sessions-list.json` will be displayed publicly
- You can have session files in `_sessions/` that aren't indexed if you want to keep drafts or archived content
- When creating a new session through Decap CMS, remember to add its slug to the `sessions-list.json` index

## Workflow

### Adding a New Session

1. Go to `/admin/` and navigate to the **Session** collection
2. Click **New Session**
3. Fill in the required fields:
   - Title (auto-generates the slug)
   - Date
   - Featured Image (thumbnail)
   - Body (use Markdown)
   - Venue
4. Save/Publish the session
5. Go to the **Sessions Index** collection
6. Add the new session's slug to the `sessions` array in the correct order
7. Save/Publish the index

### Updating Existing Content

1. Go to `/admin/`
2. Find the collection you need (Sessions, Pages, etc.)
3. Click the item to edit
4. Make your changes
5. Save/Publish

All changes are committed to the `main` branch via Decap CMS's Git integration.

## Deployment

This project is deployed on **Netlify**. Any commits to the `main` branch will automatically trigger a new build and deployment.

### Important Files for Deployment
- `admin/config.yml` - Decap CMS configuration
- `admin/index.html` - CMS interface entry point
- All content files in `_sessions/`, `_pages/`, and `_index/`

## Technologies

- **Frontend**: HTML, CSS, JavaScript
- **CMS**: Decap CMS (Git-based)
- **Hosting**: Netlify
- **Authentication**: Netlify Identity
- **Content Format**: JSON and Markdown

## Local Development

To develop locally:

1. Clone the repository
2. Open the project in your code editor
3. Use a local server to view the site (e.g., `python -m http.server`)
4. To test Decap CMS locally, you can configure the local backend in `admin/config.yml`

## Contact & Support

For questions about the site, events, or workshops, reach out to the Future Inventions Lab team.
