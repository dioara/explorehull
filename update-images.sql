-- Update attraction images with real Hull photos

UPDATE attractions SET imageUrl = '/images/attractions/the-deep.jpg' WHERE slug = 'the-deep';
UPDATE attractions SET imageUrl = '/images/attractions/maritime-museum.jpg' WHERE slug = 'hull-maritime-museum';
UPDATE attractions SET imageUrl = '/images/attractions/ferens-art-gallery.jpg' WHERE slug = 'ferens-art-gallery';
UPDATE attractions SET imageUrl = '/images/attractions/hull-old-town.jpg' WHERE slug = 'hull-old-town';
UPDATE attractions SET imageUrl = '/images/attractions/streetlife-museum.jpg' WHERE slug = 'streetlife-museum';
UPDATE attractions SET imageUrl = '/images/attractions/humber-bridge.jpg' WHERE slug = 'humber-bridge';
UPDATE attractions SET imageUrl = '/images/attractions/hull-minster.jpg' WHERE slug = 'hull-minster';

-- Update event images with real Hull photos
UPDATE events SET imageUrl = '/images/events/freedom-festival.jpg' WHERE slug = 'hull-freedom-festival';
UPDATE events SET imageUrl = '/images/events/hull-fair.jpg' WHERE slug = 'hull-fair';
