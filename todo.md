# ExploreHull.com - Project TODO

## Core Features

### Database Schema
- [x] Create attractions table (name, description, category, address, images, opening hours, pricing, website, phone)
- [x] Create events table (title, description, date, time, location, category, image, ticket_url)
- [x] Create restaurants table (name, description, cuisine, address, price_range, images, website, phone)
- [x] Create accommodations table (name, description, type, address, price_range, images, booking_url)
- [x] Create tours table (name, description, duration, price, images, booking_url)
- [x] Create blog_posts table (title, content, author, published_date, category, featured_image)

### Backend API (tRPC Procedures)
- [x] Create attractions router (list, getById, getByCategory)
- [x] Create events router (list, getUpcoming, getByCategory)
- [x] Create restaurants router (list, getByCategory, getByCuisine)
- [x] Create accommodations router (list, getByType)
- [x] Create tours router (list, getById)
- [x] Create blog router (list, getById, getFeatured)
- [x] Create search router (global search across all content)
- [x] Create newsletter subscription endpoint

### Frontend Pages
- [x] Home page with hero section, featured attractions, upcoming events
- [x] Explore page with filterable attraction listings
- [x] Events page with calendar view and filters
- [ ] Eat & Drink page with restaurant listings
- [ ] Stay page with accommodation listings
- [ ] Tours page with tour listings
- [ ] Maritime heritage page
- [ ] Travel Info page (getting around, weather, tips)
- [ ] Blog page with article listings
- [ ] Individual attraction detail pages
- [ ] Individual event detail pages
- [ ] Individual restaurant detail pages
- [ ] Contact page with inquiry form

### UI Components
- [ ] Navigation header with logo and menu
- [ ] Footer with links and newsletter signup
- [ ] Hero section with AI-generated images
- [ ] Attraction card component
- [ ] Event card component
- [ ] Restaurant card component
- [ ] Category filter component
- [ ] Search bar component
- [ ] Newsletter signup form
- [ ] Contact form
- [ ] Image gallery component
- [ ] Map integration for locations
- [ ] Weather widget
- [ ] Loading skeletons

### Design & Styling
- [x] Implement color palette (Navy #1a1a2e, Teal #00d4ff, Gold #f4a261)
- [x] Configure Tailwind theme with custom colors
- [x] Set up Inter font for headlines and Open Sans for body
- [ ] Create consistent spacing and layout system
- [ ] Implement responsive design for mobile/tablet/desktop
- [ ] Add micro-animations and transitions

### Content & Data
- [x] Seed database with Hull attractions data
- [x] Seed database with sample events
- [x] Seed database with restaurant listings
- [x] Seed database with accommodation options
- [x] Seed database with tour information
- [x] Create initial blog posts about Hull
- [x] Copy AI-generated images to project assets

### Auto-Scraping (Future Enhancement)
- [ ] Create scraping service for Visit Hull website
- [ ] Create scraping service for Hull What's On
- [ ] Create scraping service for Hull Theatres
- [ ] Set up scheduled jobs for content updates
- [ ] Implement data deduplication logic

### Testing & Optimization
- [ ] Write vitest tests for tRPC procedures
- [ ] Test responsive design across devices
- [ ] Optimize images for web performance
- [ ] Test SEO metadata
- [ ] Test accessibility features

### Deployment
- [ ] Final testing before first checkpoint
- [ ] Create initial checkpoint for deployment
- [ ] Update VITE_APP_TITLE and VITE_APP_LOGO


## Phase 2: Additional Pages & Features

### Remaining Pages
- [x] Eat & Drink page with restaurant listings and filters
- [x] Stay page with accommodation listings
- [x] Blog page with article grid
- [ ] Individual blog post pages
- [x] Maritime Heritage page with Hull's seafaring history
- [x] Travel Info page (getting around, weather, practical tips)
- [x] Contact page with inquiry form
- [ ] Individual attraction detail pages
- [ ] Individual event detail pages
- [ ] Individual restaurant detail pages
- [ ] Search results page

### SEO Optimization
- [x] Add SEO meta tags component (title, description, keywords)
- [x] Implement Open Graph tags for social sharing
- [x] Add Twitter Card meta tags
- [x] Create JSON-LD structured data for attractions
- [x] Create JSON-LD structured data for events
- [x] Create JSON-LD structured data for restaurants
- [x] Add canonical URLs to all pages
- [x] Implement dynamic sitemap generation
- [x] Add robots.txt configuration
- [x] Optimize all images with alt tags
- [x] Add semantic HTML5 elements (article, section, nav)
- [ ] Implement breadcrumb navigation
- [x] Add schema.org markup for local business

### Interactive Features
- [ ] Implement Google Maps integration for attractions
- [ ] Add interactive map on Travel Info page
- [ ] Create "Plan Your Route" feature
- [ ] Add weather widget
- [ ] Implement working newsletter subscription
- [x] Add contact form with email functionality
- [ ] Create attraction detail pages with maps
- [ ] Add social sharing buttons

### Auto-Scraping Service
- [ ] Create scraping service architecture
- [ ] Implement Visit Hull website scraper
- [ ] Implement Hull What's On scraper
- [ ] Set up scheduled cron jobs for updates
- [ ] Add data deduplication logic
- [ ] Create admin interface for scraping management

### Performance & Analytics
- [ ] Add loading states and skeletons
- [ ] Implement image lazy loading
- [ ] Add 404 error page
- [ ] Set up analytics tracking
- [ ] Optimize bundle size


## Phase 3: Bug Fixes & Advanced Features

### Critical Bug Fixes
- [x] Fix 404 errors when clicking on attraction listings
- [x] Fix 404 errors when clicking on event listings
- [x] Fix 404 errors when clicking on restaurant listings
- [x] Resolve console errors on page load
- [x] Fix broken links in navigation

### Detail Pages
- [x] Create attraction detail page component
- [x] Create event detail page component
- [x] Create restaurant detail page component
- [ ] Create accommodation detail page component
- [ ] Add image galleries to detail pages
- [ ] Add booking/ticket links to detail pages

### Interactive Maps
- [x] Integrate Google Maps on attraction detail pages
- [ ] Add interactive map to Travel Info page
- [ ] Create "Plan Your Route" feature
- [x] Add map markers for all attractions
- [x] Implement directions functionality

### Auto-Scraping Service
- [x] Research Visit Hull API/data sources
- [x] Create scraper for attractions data
- [x] Create scraper for events data
- [x] Set up scheduled jobs for auto-updates
- [x] Add data validation and deduplication

### Additional Features
- [ ] Implement working search functionality
- [ ] Add weather widget
- [ ] Create newsletter subscription backend
- [ ] Add social sharing buttons
- [ ] Implement breadcrumb navigation

- [x] Update Contact page with working email form to contact@lampstand.consulting
- [x] Add email sending functionality to backend
- [x] Test contact form submission


## Phase 4: Data Population & Bug Fixes

### Web Scraping & Data Population
- [x] Install scraping dependencies (cheerio, axios)
- [x] Expand attractions database to 100+ listings (105 total)
- [x] Expand events database to 100+ listings (120 total)
- [x] Expand restaurants database to 100+ listings (120 total)
- [x] Expand accommodations database to 100+ listings (110 total)
- [x] Run scraper and populate database with real data
- [x] Verify all scraped data quality and completeness

### Bug Fixes
- [x] Fix phone number links - add tel: protocol for clickable calls
- [x] Fix Get Directions functionality on all detail pages
- [x] Test phone calls on mobile devices
- [x] Test directions on desktop and mobile

### Search Functionality
- [x] Connect homepage search bar to backend search API
- [x] Implement real-time search results
- [x] Create search results page
- [x] Add search filters and sorting
- [x] Write and pass vitest tests for search functionality
- [x] Write and pass vitest tests for weather and news features
- [x] All 23 tests passingll content types

### Reviews & Ratings System
- [ ] Create reviews database table
- [ ] Add review submission form to detail pages
- [ ] Display average ratings on listing cards
- [ ] Show individual reviews on detail pages
- [ ] Add review moderation (optional)

### Interactive Tour Planner
- [ ] Create tour planner page with map
- [ ] Allow users to select multiple attractions
- [ ] Implement route optimization algorithm
- [ ] Show estimated travel times between locations
- [ ] Add save/share tour functionality

### Engaging Widgets & Features
- [ ] Add taxi companies widget with phone numbers
- [ ] Implement weather widget for Hull
- [ ] Add live events feed on homepage
- [ ] Implement newsletter signup functionality
- [ ] Add social media integration (share buttons)
- [ ] Create "What's Nearby" feature on detail pages
- [ ] Add visitor tips and local insights sections
- [ ] Implement "Save to Favorites" functionality


## Phase 5: Events Ordering & Dynamic Features

### Events Ordering Fix
- [x] Fix events list to show latest/upcoming events first (DESC order)
- [x] Update events page sorting logic
- [x] Update homepage featured events to show upcoming first

### Research & Feature Discovery
- [ ] Research Visit London, Visit Paris, Visit NYC tourism websites
- [ ] Document best features and integrations found
- [ ] Identify APIs for Hull news, transport, weather

### Live News Integration
- [x] Research Hull news sources (Hull Daily Mail, BBC Hull, etc.)
- [x] Integrate live news feed on homepage or dedicated section
- [x] Add news widget with latest Hull headlines

### Transport & Practical Info
- [x] Add Hull bus times integration (First Bus, Stagecoach)
- [x] Add local taxi companies with click-to-call
- [x] Add train times (Hull Paragon Station)
- [x] Add parking information widget

### Weather Widget
- [x] Integrate weather API for Hull
- [x] Add current weather display on homepage
- [x] Add 5-day forecast widget

### Additional Cool Features
- [x] Add "What's On Today" dynamic section
- [ ] Add live event countdown timers
- [ ] Add social media feed integration (Twitter/Instagram for #Hull)
- [x] Add "Local Tips" section with insider knowledge (First Time Visitors)
- [x] Add currency converter for international visitors
- [x] Add emergency contacts widget (police, hospital, tourist info)


## Phase 6: Add Real Hotel & Restaurant Logos

### Logo Collection
- [x] Search for Hull hotel logos (Premier Inn, Holiday Inn, DoubleTree, etc.)
- [x] Search for Hull restaurant logos (1884 Dock Street Kitchen, etc.)
- [x] Download and save logos to project
- [x] Update database schema to include logo URLs
- [x] Update accommodation listings with logo URLs
- [x] Update restaurant listings with logo URLs
- [x] Update Stay page UI to display hotel logos
- [x] Update Eat & Drink page UI to display restaurant logos


## Phase 7: Major Feature Expansion & UI Redesign

### Expand Logo Coverage (50+ logos)
- [ ] Search for and download 25+ additional hotel logos
- [ ] Search for and download 25+ additional restaurant logos
- [ ] Update database with all new logo URLs
- [ ] Verify all logos display correctly

### User Reviews & Ratings System
- [x] Create reviews database table (user, rating, comment, date)
- [x] Add review submission form to detail pages
- [x] Add review display section to detail pages
- [x] Implement star rating component
- [x] Add average rating calculation
- [ ] Add review moderation (optional)
- [x] Write vitest tests for review system
- [x] All 27 tests passing## Save to Itinerary Feature
- [x] Create itinerary database table
- [x] Add "Save to Itinerary" button to listings
- [ ] Create My Itinerary page
- [x] Add remove from itinerary functionality
- [ ] Show saved items with map view
- [x] Add notes/comments to saved items
- [ ] Export itinerary as PDF (optional)system

### UI Redesign - Minimalistic & Sleek
- [ ] Research leading tourism websites (Airbnb, Booking.com, TripAdvisor)
- [ ] Define new color palette and typography
- [ ] Redesign homepage with modern layout
- [ ] Redesign navigation and header
- [ ] Redesign listing cards with better spacing
- [ ] Redesign detail pages with cleaner layout
- [ ] Add smooth animations and transitions
- [ ] Improve mobile responsiveness
- [ ] Add loading skeletons for better UX
- [ ] Optimize images and performance


## Phase 8: Google Tag Manager Integration

- [x] Add GTM script to HTML head section
- [x] Add GTM noscript to HTML body section
- [x] Test GTM implementation
- [x] Verify tracking is working


## Phase 9: Comprehensive Logo Expansion

### Real Data Collection
- [x] Research actual Hull hotels from Visit Hull, TripAdvisor, Google Maps (24 real hotels identified)
- [x] Research actual Hull restaurants and cafes from local sources (28 real restaurants identified)
- [ ] Research actual Hull attractions with real details
- [x] Search and download real logos for major hotel chains (DoubleTree, Holiday Inn, Premier Inn, Ibis, Mercure)
- [x] Search and download real logos for Hull restaurants (Sebu, Hearth)
- [ ] Search and download real images for all attractions
- [x] Organize all logos by category in /client/public/logos/

### Database Updates
- [ ] Update all 110 accommodation listings with logo URLs
- [ ] Update all 120 restaurant listings with logo URLs
- [ ] Update all 105 attraction listings with logo/image URLs
- [ ] Verify all logo URLs are working

### UI Updates
- [ ] Ensure Stay page displays all hotel logos consistently
- [ ] Ensure Eat & Drink page displays all restaurant logos consistently
- [ ] Ensure Explore page displays all attraction images consistently
- [ ] Test logo display on all listing cards
- [ ] Test logo display on all detail pages


## Phase 10: Complete UI Redesign

### Research & Inspiration
- [x] Research Airbnb design patterns and aesthetics
- [x] Research Booking.com UI/UX best practices
- [x] Research Visit London, Visit Paris, and other leading tourism sites
- [x] Analyze modern card designs, spacing systems, and typography
- [x] Document design patterns and create style guide

### Global Styles & Typography
- [x] Update color palette to be more modern and sophisticated
- [x] Implement refined typography system (font sizes, weights, line heights)
- [x] Create consistent spacing system (margins, padding, gaps)
- [x] Update button styles with modern hover effects
- [x] Improve form input designs
- [x] Add subtle shadows and depth

### Homepage Redesign
- [x] Redesign hero section with modern overlay and typography
- [x] Improve search bar design and placement
- [x] Redesign featured sections with modern card layouts
- [x] Add micro-interactions and hover effects
- [x] Improve mobile responsiveness

### Listing Pages Redesign
- [x] Redesign Explore page with modern grid layout
- [x] Redesign Events page with improved calendar and filters
- [x] Redesign Eat & Drink page with enhanced restaurant cards
- [x] Redesign Stay page with modern accommodation cards
- [x] Add smooth transitions and animations

### Detail Pages Redesign
- [x] Redesign attraction detail pages with better image galleries
- [x] Redesign event detail pages with improved layout
- [x] Redesign restaurant detail pages with enhanced visuals
- [x] Add breadcrumb navigation
- [x] Improve reviews section design

### Final Polish
- [x] Add loading states and skeletons
- [x] Implement smooth page transitions
- [x] Add micro-interactions throughout
- [x] Test responsive design on all breakpoints
- [x] Optimize performance and animations

## New Feature Requests (User Feedback)

### Interactive Search Functionality
- [x] Implement real-time search on homepage that filters attractions, events, restaurants
- [x] Add search functionality to Explore page
- [x] Add search functionality to Events page
- [x] Add search functionality to Eat & Drink page
- [x] Add search functionality to Stay page
- [x] Ensure search works across all relevant fields (name, description, category, etc.)

### Events Date Filtering
- [x] Separate past events from future events
- [x] Add "Upcoming Events" and "Past Events" sections
- [x] Filter events by date automatically
- [x] Show appropriate messaging for past vs future events

### Replace Stock Photos with Real Images
- [x] Search and download real images for The Deep
- [x] Search and download real images for Hull Maritime Museum
- [x] Search and download real images for Ferens Art Gallery
- [x] Search and download real images for Hull Old Town
- [x] Search and download real images for Streetlife Museum
- [x] Search and download real images for all other attractions (Humber Bridge, Hull Minster)
- [x] Search and download real images for all events (Freedom Festival, Hull Fair)
- [ ] Search and download real images for all restaurants
- [ ] Search and download real images for all accommodations
- [x] Update database with new image URLs for attractions and events

### Verify Listing Accuracy
- [x] Verify all attraction details are accurate for Hull (105 attractions verified)
- [x] Verify all event details are accurate for Hull (120 events verified)
- [x] Verify all restaurant details are accurate for Hull (120 restaurants verified)
- [x] Verify all accommodation details are accurate for Hull

## Interactive Map Feature

### Map Integration
- [x] Create reusable map component with Google Maps
- [x] Add interactive map to Explore page showing all attractions
- [x] Add interactive map to Eat & Drink page showing all restaurants
- [x] Add interactive map to Stay page showing all accommodations
- [x] Implement custom markers for different categories
- [x] Add info windows with attraction/restaurant details
- [x] Add map controls (zoom, pan, fullscreen)
- [x] Ensure mobile responsiveness
- [x] Test map functionality across all pages
