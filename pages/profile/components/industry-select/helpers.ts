import type { Nace } from '@/types';

type ExtendedNace = Nace & { isSearchMatch?: boolean };

// search condition
const searchCondition = (item: Nace, searchText: string) =>
  item.prefLabel.en.toLowerCase().includes(searchText.toLowerCase());

// try to find match with items & their children
export function isMatchWithSearch(item: Nace, searchText: string) {
  if (searchCondition(item, searchText)) {
    return true;
  }

  if (item.children) {
    for (const child of item.children) {
      if (isMatchWithSearch(child, searchText)) {
        return true;
      }
    }
  }

  return false;
}

// return matching items & their children
export function searchItems(items: Nace[], searchText: string): ExtendedNace[] {
  return items.reduce((acc: ExtendedNace[], current: Nace) => {
    if (isMatchWithSearch(current, searchText))
      acc.push({ ...current, isSearchMatch: true });
    return acc;
  }, []);
}
