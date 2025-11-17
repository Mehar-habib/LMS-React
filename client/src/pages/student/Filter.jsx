import { useState } from "react";
import { Checkbox } from "../../components/ui/checkbox";
import { Label } from "../../components/ui/label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "../../components/ui/select";
import { Separator } from "../../components/ui/separator";

const categories = [
  { id: "nextjs", label: "Next JS" },
  { id: "data science", label: "Data Science" },
  { id: "frontend development", label: "Frontend Development" },
  { id: "full stack development", label: "Full Stack Development" },
  { id: "mern stack development", label: "MERN Stack Development" },
  { id: "backend", label: "Backend" },
  { id: "javascript", label: "JavaScript" },
  { id: "docker", label: "Docker" },
  { id: "mongodb", label: "MongoDB" },
  { id: "html", label: "HTML" },
];

export default function Filter({ handleFilterChange }) {
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [sortByPrice, setSortByPrice] = useState("");

  const handleCategoryChange = (categoryId) => {
    setSelectedCategories((prevCategories) => {
      const newCategories = prevCategories.includes(categoryId)
        ? prevCategories.filter((id) => id !== categoryId)
        : [...prevCategories, categoryId];
      handleFilterChange(newCategories, sortByPrice);
      return newCategories;
    });
  };

  const selectByPriceHandler = (selectedValue) => {
    setSortByPrice(selectedValue);
    handleFilterChange(selectedCategories, selectedValue);
  };

  const clearFilters = () => {
    setSelectedCategories([]);
    setSortByPrice("");
    handleFilterChange([], "");
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 sticky top-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg font-semibold text-gray-900">Filters</h2>
        {(selectedCategories.length > 0 || sortByPrice) && (
          <button
            onClick={clearFilters}
            className="text-sm text-blue-600 hover:text-blue-800 font-medium"
          >
            Clear all
          </button>
        )}
      </div>

      {/* Sort by Price */}
      <div className="mb-6">
        <h3 className="text-sm font-medium text-gray-900 mb-3">
          Sort by Price
        </h3>
        <Select onValueChange={selectByPriceHandler} value={sortByPrice}>
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Select sort order" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Price Order</SelectLabel>
              <SelectItem value="low">Low to High</SelectItem>
              <SelectItem value="high">High to Low</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>

      <Separator className="my-6" />

      {/* Categories */}
      <div>
        <h3 className="text-sm font-medium text-gray-900 mb-4">Categories</h3>
        <div className="space-y-3 max-h-80 overflow-y-auto">
          {categories.map((category) => (
            <div key={category.id} className="flex items-center space-x-3">
              <Checkbox
                id={category.id}
                checked={selectedCategories.includes(category.id)}
                onCheckedChange={() => handleCategoryChange(category.id)}
                className="data-[state=checked]:bg-blue-600 data-[state=checked]:border-blue-600"
              />
              <Label
                htmlFor={category.id}
                className="text-sm text-gray-700 cursor-pointer hover:text-gray-900 flex-1"
              >
                {category.label}
              </Label>
            </div>
          ))}
        </div>
      </div>

      {/* Selected Filters */}
      {(selectedCategories.length > 0 || sortByPrice) && (
        <>
          <Separator className="my-6" />
          <div>
            <h3 className="text-sm font-medium text-gray-900 mb-3">
              Active Filters
            </h3>
            <div className="flex flex-wrap gap-2">
              {sortByPrice && (
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                  Price: {sortByPrice === "low" ? "Low to High" : "High to Low"}
                </span>
              )}
              {selectedCategories.map((categoryId) => {
                const category = categories.find((c) => c.id === categoryId);
                return (
                  <span
                    key={categoryId}
                    className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800"
                  >
                    {category?.label}
                  </span>
                );
              })}
            </div>
          </div>
        </>
      )}
    </div>
  );
}
