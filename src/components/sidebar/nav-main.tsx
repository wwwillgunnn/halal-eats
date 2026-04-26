import { SidebarGroup } from "@/components/ui/sidebar";
import { SearchBar } from "./search-bar";
import { SelectGroup } from "./select-group";
import { ModeSwitch } from "./mode-switch";
import { ContributeButton } from "./contribute-button";

export function NavMain() {
  return (
    <SidebarGroup className="group-data-[collapsible=icon]:hidden">
      <div className="space-y-4 p-2">
        <ContributeButton />
        <SearchBar />
        <SelectGroup />
        <ModeSwitch />
      </div>
    </SidebarGroup>
  );
}
