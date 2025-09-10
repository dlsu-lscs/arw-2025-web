import { useQuery } from '@tanstack/react-query';
import { useSearchStore } from '@/features/orgs/store/useSearchStore';
import { getSearchOrg } from '@/features/orgs/services/client.orgs.services';
import { useMemo } from 'react';

/**
 * Hook to search organizations using the dedicated search API endpoint
 * Provides comprehensive search results across all organizations
 */
export function useSearchOrgs() {
  const { debouncedSearchTerm, isSearchActive, isTyping } = useSearchStore();

  const {
    data: searchData,
    isLoading,
    error,
    isFetching,
  } = useQuery({
    queryKey: ['orgs', { search: debouncedSearchTerm }],
    queryFn: () => getSearchOrg(debouncedSearchTerm, 0, 10), // Get up to 10 search results
    enabled: isSearchActive && debouncedSearchTerm.trim().length > 0,
    staleTime: 1000 * 60 * 5, // Cache search results for 5 minutes
  });

  const searchResults = useMemo(() => {
    return searchData?.content || [];
  }, [searchData]);

  return {
    searchResults,
    isSearchActive,
    searchTerm: debouncedSearchTerm,
    isLoading: isLoading, // Show loading while typing or fetching
    isTyping: isTyping,
    isFetching,
    error,
    totalResults: searchData?.page?.totalElements || 0,
    hasResults: searchResults.length > 0,
  };
}
