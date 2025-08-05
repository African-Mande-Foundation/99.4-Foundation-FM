export function flattenStrapiResponse(data: any): any {
  if (!data) return null;

  if (Array.isArray(data)) {
    return data.map(flattenStrapiResponse);
  }

  // If data is an object with an 'attributes' key, flatten it
  if (typeof data === 'object' && data !== null && 'attributes' in data) {
    const flattened = { id: data.id, ...data.attributes };

    // Recursively flatten nested objects and arrays within attributes
    for (const key in flattened) {
      const value = flattened[key];
      if (typeof value === 'object' && value !== null) {
        if ('data' in value) {
          flattened[key] = flattenStrapiResponse(value.data);
        } else if (Array.isArray(value)) {
          flattened[key] = value.map(flattenStrapiResponse);
        }
      }
    }
    return flattened;
  }

  // If data is already a flattened object (e.g., from a nested relation that was already flattened)
  // or a primitive, return it as is.
  return data;
}
