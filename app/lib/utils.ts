export function flattenStrapiResponse<T>(data: unknown): T {
  if (!data) {
    return Array.isArray(data) ? ([] as unknown as T) : ({} as T);
  }

  if (Array.isArray(data)) {
    return data.map(flattenStrapiResponse) as unknown as T;
  }

  if (typeof data === 'object' && data !== null && 'attributes' in (data as Record<string, unknown>)) {
    const obj = data as { id: number; attributes: Record<string, unknown> };
    const flattened: Record<string, unknown> = { id: obj.id, ...obj.attributes };

    for (const key in flattened) {
      const value = flattened[key];
      if (typeof value === 'object' && value !== null) {
        if ('data' in (value as Record<string, unknown>)) {
          flattened[key] = flattenStrapiResponse((value as { data: unknown }).data);
        } else if (Array.isArray(value)) {
          flattened[key] = value.map(flattenStrapiResponse);
        }
      }
    }
    return flattened as T;
  }

  return data as T;
}
