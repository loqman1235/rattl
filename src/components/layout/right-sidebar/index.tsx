import { SearchBar } from "./search-bar";
import { PopularWidget } from "../widgets/popular-widget";
import { FooterWidget } from "../widgets/footer-widget";
import { SuggestedForYouWidget } from "../widgets/suggested-for-you-widget";

export const RightSidebar = () => {
  return (
    <aside className="hidden xl:flex flex-col w-[var(--right-sidebar-width)] border-l border-l-border min-h-screen">
      <SearchBar />

      <div className="flex-1 px-5 flex flex-col gap-4">
        <PopularWidget />

        <div className="sticky top-[80px] flex flex-col gap-4 items-start">
          <SuggestedForYouWidget />
          <FooterWidget />
        </div>
      </div>
    </aside>
  );
};
