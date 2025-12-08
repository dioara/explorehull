import { useEffect } from 'react';

interface AdSenseProps {
  slot?: string;
  format?: 'auto' | 'fluid' | 'rectangle' | 'vertical' | 'horizontal';
  style?: React.CSSProperties;
  className?: string;
}

/**
 * Google AdSense Component
 * 
 * Displays Google AdSense ads in a responsive, non-intrusive way.
 * 
 * @param slot - AdSense ad slot ID (optional, uses auto ads if not provided)
 * @param format - Ad format: 'auto', 'fluid', 'rectangle', 'vertical', 'horizontal'
 * @param style - Custom inline styles
 * @param className - Additional CSS classes
 */
export function AdSense({ 
  slot, 
  format = 'auto',
  style = {},
  className = ''
}: AdSenseProps) {
  useEffect(() => {
    try {
      // Push ad to AdSense queue
      if (typeof window !== 'undefined' && (window as any).adsbygoogle) {
        ((window as any).adsbygoogle = (window as any).adsbygoogle || []).push({});
      }
    } catch (error) {
      console.error('AdSense error:', error);
    }
  }, []);

  return (
    <div className={`adsense-container my-8 ${className}`} style={style}>
      <ins
        className="adsbygoogle"
        style={{
          display: 'block',
          textAlign: 'center',
          ...style
        }}
        data-ad-client="ca-pub-1991880044399293"
        data-ad-slot={slot}
        data-ad-format={format}
        data-full-width-responsive="true"
      />
    </div>
  );
}

/**
 * Horizontal Ad Banner
 * Best for: Between content sections, after hero sections
 */
export function AdBanner({ className = '' }: { className?: string }) {
  return (
    <AdSense 
      format="horizontal"
      className={className}
      style={{ minHeight: '90px' }}
    />
  );
}

/**
 * Square/Rectangle Ad
 * Best for: Sidebars, between listing cards
 */
export function AdSquare({ className = '' }: { className?: string }) {
  return (
    <AdSense 
      format="rectangle"
      className={className}
      style={{ minHeight: '250px' }}
    />
  );
}

/**
 * Vertical Ad
 * Best for: Sidebars on detail pages
 */
export function AdVertical({ className = '' }: { className?: string }) {
  return (
    <AdSense 
      format="vertical"
      className={className}
      style={{ minHeight: '600px' }}
    />
  );
}

/**
 * Fluid Responsive Ad
 * Best for: Mobile-friendly placements
 */
export function AdFluid({ className = '' }: { className?: string }) {
  return (
    <AdSense 
      format="fluid"
      className={className}
      style={{ minHeight: '100px' }}
    />
  );
}
