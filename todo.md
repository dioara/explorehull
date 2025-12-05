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
