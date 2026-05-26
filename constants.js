export function isNullOrUndefined   (value: any | null | undefined): value is null | undefined    {
    return value === null || value === undefined;
  }