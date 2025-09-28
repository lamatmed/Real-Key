import React from "react";
import { PropertyFilters as Filters } from "../types";

interface PropertyFiltersProps {
  filters: Filters;
  onFiltersChange: (filters: Filters) => void;
}

function PropertyFilters({ filters, onFiltersChange }: PropertyFiltersProps) {
  const handleFilterChange = (key: keyof Filters, value: any) => {
    onFiltersChange({
      ...filters,
      [key]: value === "" || value === "all" ? undefined : value,
    });
  };

  return (
    <div className="space-y-6">
      {/* Type de propriété */}
      <div>
        <label className="block text-sm font-semibold text-gray-800 mb-2">
          Type de propriété
        </label>
        <select
          className="w-full p-3 border border-gray-300 rounded-xl shadow-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
          value={filters.propertyType || "all"}
          onChange={(e) => handleFilterChange("propertyType", e.target.value)}
        >
          <option value="all">Tous les types</option>
          <option value="house">Maison</option>
          <option value="apartment">Appartement</option>
          <option value="condo">Condo</option>
          <option value="townhouse">Maison de ville</option>
        </select>
      </div>

      {/* Statut */}
      <div>
        <label className="block text-sm font-semibold text-gray-800 mb-2">
          Statut
        </label>
        <select
          value={filters.status || "all"}
          onChange={(e) => handleFilterChange("status", e.target.value)}
          className="w-full p-3 border border-gray-300 rounded-xl shadow-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
        >
          <option value="all">Tous les statuts</option>
          <option value="for-sale">À vendre</option>
          <option value="for-rent">À louer</option>
          <option value="sold">Vendu</option>
          <option value="rented">Loué</option>
        </select>
      </div>

      {/* Chambres et Salles de bain */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-semibold text-gray-800 mb-2">
            Chambres
          </label>
          <select
            className="w-full p-3 border border-gray-300 rounded-xl shadow-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
            value={filters.bedrooms || "all"}
            onChange={(e) =>
              handleFilterChange(
                "bedrooms",
                e.target.value ? Number(e.target.value) : undefined
              )
            }
          >
            <option value="">N'importe</option>
            <option value="1">1+</option>
            <option value="2">2+</option>
            <option value="3">3+</option>
            <option value="4">4+</option>
            <option value="5">5+</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-800 mb-2">
            Salles de bain
          </label>
          <select
            className="w-full p-3 border border-gray-300 rounded-xl shadow-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
            value={filters.bathrooms || "all"}
            onChange={(e) =>
              handleFilterChange(
                "bathrooms",
                e.target.value ? Number(e.target.value) : undefined
              )
            }
          >
            <option value="">N'importe</option>
            <option value="1">1+</option>
            <option value="2">2+</option>
            <option value="3">3+</option>
            <option value="4">4+</option>
            <option value="5">5+</option>
          </select>
        </div>
      </div>

      {/* Prix */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-semibold text-gray-800 mb-2">
            Prix minimum
          </label>
          <input
            type="number"
            placeholder="Prix minimum"
            className="w-full p-3 border border-gray-300 rounded-xl shadow-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
            value={filters.minPrice || ""}
            onChange={(e) =>
              handleFilterChange(
                "minPrice",
                e.target.value ? Number(e.target.value) : undefined
              )
            }
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-800 mb-2">
            Prix maximum
          </label>
          <input
            type="number"
            placeholder="Prix maximum"
            className="w-full p-3 border border-gray-300 rounded-xl shadow-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
            value={filters.maxPrice || ""}
            onChange={(e) =>
              handleFilterChange(
                "maxPrice",
                e.target.value ? Number(e.target.value) : undefined
              )
            }
          />
        </div>
      </div>
    </div>
  );
}

export default PropertyFilters;
