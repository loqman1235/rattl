import { SearchBar } from "./search-bar";
import { PopularWidget } from "../widgets/popular-widget";

export const RightSidebar = () => {
  return (
    <aside className="hidden xl:block w-[var(--right-sidebar-width)] transition-all duration-300 ease-in-out border-l border-l-border p-5">
      <div className="sticky top-5 flex flex-col gap-4 min-h-screen pb-5">
        {/* SEARCH BAR */}
        <SearchBar />
        {/* TRENDS WIDGET */}
        <PopularWidget />

        {/* FOOTER */}
      </div>
    </aside>
  );
};
