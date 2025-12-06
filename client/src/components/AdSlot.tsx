/**
 * AdSlot Component
 * 
 * Flexible ad placeholder component for Google Ads or direct partnerships.
 * Can be easily connected to Google AdSense or custom ad serving.
 * 
 * Usage:
 * - <AdSlot type="banner" /> - Horizontal banner (728x90 or responsive)
 * - <AdSlot type="sidebar" /> - Vertical sidebar ad (300x250 or 300x600)
 * - <AdSlot type="in-feed" /> - Native in-feed ad (blends with content)
 */

interface AdSlotProps {
  type: "banner" | "sidebar" | "in-feed";
  className?: string;
}

export function AdSlot({ type, className = "" }: AdSlotProps) {
  // For now, show placeholder. Replace with Google AdSense code when ready.
  // Example Google AdSense integration:
  // <ins className="adsbygoogle"
  //      style={{ display: "block" }}
  //      data-ad-client="ca-pub-XXXXXXXXXXXXXXXX"
  //      data-ad-slot="XXXXXXXXXX"
  //      data-ad-format="auto"
  //      data-full-width-responsive="true"></ins>
  
  const getAdStyles = () => {
    switch (type) {
      case "banner":
        return "w-full h-[90px] md:h-[120px] bg-muted/30 border border-border/30 rounded-lg flex items-center justify-center";
      case "sidebar":
        return "w-full h-[250px] md:h-[600px] bg-muted/30 border border-border/30 rounded-lg flex items-center justify-center";
      case "in-feed":
        return "w-full h-[200px] bg-muted/30 border border-border/30 rounded-lg flex items-center justify-center";
      default:
        return "";
    }
  };

  // Set to false to hide ads (useful during development)
  const showAds = false;

  if (!showAds) {
    return null;
  }

  return (
    <div className={`${getAdStyles()} ${className}`}>
      <div className="text-center text-muted-foreground text-sm">
        <p className="font-medium">Advertisement</p>
        <p className="text-xs mt-1">
          {type === "banner" && "728x90 Banner"}
          {type === "sidebar" && "300x250 Sidebar"}
          {type === "in-feed" && "Native In-Feed Ad"}
        </p>
      </div>
    </div>
  );
}
