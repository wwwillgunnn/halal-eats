import { SidebarGroup } from "@/components/ui/sidebar";
import { SearchBar } from "./search-bar";
import { ModeSwitch } from "./mode-switch";
import { ContributeButton } from "./contribute-button";
import { HalalTierToggle } from "./halal-tier-toggle";

export function NavMain() {
  return (
    <SidebarGroup className="group-data-[collapsible=icon]:hidden">
      <div className="space-y-4 p-2">
        <ContributeButton />
        <SearchBar />
        <HalalTierToggle />
        <ModeSwitch />
      </div>
    </SidebarGroup>
  );
}
