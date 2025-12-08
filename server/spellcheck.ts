// Simple Levenshtein distance algorithm for spell checking
function levenshteinDistance(str1: string, str2: string): number {
  const len1 = str1.length;
  const len2 = str2.length;
  const matrix: number[][] = [];

  for (let i = 0; i <= len1; i++) {
    matrix[i] = [i];
  }

  for (let j = 0; j <= len2; j++) {
    matrix[0][j] = j;
  }

  for (let i = 1; i <= len1; i++) {
    for (let j = 1; j <= len2; j++) {
      const cost = str1[i - 1] === str2[j - 1] ? 0 : 1;
      matrix[i][j] = Math.min(
        matrix[i - 1][j] + 1, // deletion
        matrix[i][j - 1] + 1, // insertion
        matrix[i - 1][j - 1] + cost // substitution
      );
    }
  }

  return matrix[len1][len2];
}

export function findClosestMatch(query: string, candidates: string[]): string | null {
  if (!query || candidates.length === 0) return null;

  const queryLower = query.toLowerCase().trim();
  let closestMatch: string | null = null;
  let minDistance = Infinity;

  for (const candidate of candidates) {
    const candidateLower = candidate.toLowerCase().trim();
    const distance = levenshteinDistance(queryLower, candidateLower);

    // Only suggest if distance is small enough (1-3 characters different)
    // and the candidate is similar enough in length
    const lengthDiff = Math.abs(queryLower.length - candidateLower.length);
    if (distance > 0 && distance <= 3 && lengthDiff <= 3 && distance < minDistance) {
      minDistance = distance;
      closestMatch = candidate;
    }
  }

  return closestMatch;
}

// Common search terms for Hull attractions
export const COMMON_SEARCH_TERMS = [
  "museum",
  "aquarium",
  "gallery",
  "restaurant",
  "hotel",
  "accommodation",
  "event",
  "theatre",
  "maritime",
  "heritage",
  "park",
  "garden",
  "shopping",
  "market",
  "cathedral",
  "minster",
  "bridge",
  "marina",
  "waterfront",
  "historic",
  "art",
  "culture",
  "music",
  "entertainment",
  "food",
  "dining",
  "pub",
  "bar",
  "cafe",
  "coffee",
];
