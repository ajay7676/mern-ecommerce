import { useCallback, useMemo, useState } from "react";

const DEFAULT_FILTERS = {
  activeTab: "all",
  search: "",
  status: "all",
  sortBy: "newest",
  page: 1,
  limit: 10,
};

const useReportFilters = (initialFilters = {}) => {
  const [filters, setFilters] = useState({
    ...DEFAULT_FILTERS,
    ...initialFilters,
  });

  const updateFilter = useCallback((key, value) => {
    setFilters((prev) => ({
      ...prev,
      [key]: value,
    }));
  }, []);

  const resetFilters = useCallback(() => {
    setFilters({
      ...DEFAULT_FILTERS,
      ...initialFilters,
    });
  }, [initialFilters]);

  const filterQuery = useMemo(() => {
    return {
      tab: filters.activeTab,
      search: filters.search,
      status: filters.status,
      sortBy: filters.sortBy,
      page: filters.page,
      limit: filters.limit,
    };
  }, [filters]);

  return {
    filters,

    updateFilter,

    resetFilters,

    filterQuery,
  };
};

export default useReportFilters;