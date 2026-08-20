import {
  useMemo,
  useState,
} from "react";

import BrandsHeader from "../../../../components/admin/products/brands/BrandsHeader";
import BrandFilters from "../../../../components/admin/products/brands/BrandFilters";
import BrandStats from "../../../../components/admin/products/brands/BrandStats";
import BrandTableCard from "../../../../components/admin/products/brands/BrandTableCard";
import BrandOverview from "../../../../components/admin/products/brands/BrandOverview";
import TopBrands from "../../../../components/admin/products/brands/TopBrands";
import BrandQuickTips from "../../../../components/admin/products/brands/BrandQuickTips";


import {
  brandOverview,
  brandStats,
  brands,
  topBrands,
} from "../../../../data/admin/products/brands.data";

const BrandsPage = () => {
  const [search, setSearch] =
    useState("");

  const [status, setStatus] =
    useState("");

  const [page, setPage] =
    useState(1);

  const [limit, setLimit] =
    useState(10);

  const filteredBrands =
    useMemo(() => {
      const normalizedSearch =
        search
          .trim()
          .toLowerCase();

      return brands.filter(
        (brand) => {
          const matchesSearch =
            !normalizedSearch ||
            brand.name
              .toLowerCase()
              .includes(
                normalizedSearch,
              ) ||
            brand.slug
              .toLowerCase()
              .includes(
                normalizedSearch,
              );

          const matchesStatus =
            !status ||
            brand.status ===
              status;

          return (
            matchesSearch &&
            matchesStatus
          );
        },
      );
    }, [
      search,
      status,
    ]);

  const paginatedBrands =
    useMemo(() => {
      const start =
        (page - 1) *
        limit;

      return filteredBrands.slice(
        start,
        start + limit,
      );
    }, [
      filteredBrands,
      page,
      limit,
    ]);

  const totalPages =
    Math.max(
      Math.ceil(
        filteredBrands.length /
          limit,
      ),
      1,
    );

  const handleReset =
    () => {
      setSearch("");
      setStatus("");
      setPage(1);
    };

  return (
    <main
      className="
        min-h-screen
        bg-[#fafbfe]
        px-4
        py-5
        sm:px-5
        lg:px-6
      "
    >
      <div className="mx-auto max-w-375">
        <BrandsHeader
          onExport={() =>
            console.log(
              "Export brands",
            )
          }
          onAddBrand={() =>
            console.log(
              "Add brand",
            )
          }
        />

        <BrandFilters
          search={search}
          status={status}
          onSearchChange={
            setSearch
          }
          onStatusChange={
            setStatus
          }
          onFilter={() =>
            setPage(1)
          }
          onReset={
            handleReset
          }
        />

        <div
          className="
            mt-4
            grid
            grid-cols-1
            gap-4
            xl:grid-cols-[minmax(0,1fr)_340px]
          "
        >
          <div className="min-w-0 space-y-4">
            <BrandStats
              stats={brandStats}
            />

            <BrandTableCard
              brands={
                paginatedBrands
              }
              page={page}
              limit={limit}
              total={
                filteredBrands.length
              }
              totalPages={
                totalPages
              }
              onPageChange={
                setPage
              }
              onLimitChange={(
                newLimit,
              ) => {
                setLimit(
                  newLimit,
                );

                setPage(1);
              }}
              onEdit={(brand) =>
                console.log(
                  "Edit brand",
                  brand,
                )
              }
              onDelete={(brand) =>
                console.log(
                  "Delete brand",
                  brand,
                )
              }
              onToggleFeatured={(
                brand,
              ) =>
                console.log(
                  "Toggle featured",
                  brand,
                )
              }
            />
          </div>

          <aside
            className="
              grid
              gap-4
              md:grid-cols-2
              xl:grid-cols-1
            "
          >
            <BrandOverview
              overview={
                brandOverview
              }
            />

            <TopBrands
              brands={
                topBrands
              }
              onViewAll={() =>
                console.log(
                  "View all brands",
                )
              }
            />

            <BrandQuickTips />
          </aside>
        </div>
      </div>
    </main>
  );
};

export default BrandsPage;