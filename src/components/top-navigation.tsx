import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarTrigger,
} from "@/components/ui/sidebar";

export function TopNavigation({
  company,
}: {
  company: {
    name: string;
    logo: React.ReactNode;
    plan: string;
  }[];
}) {
  const activeCompany = company[0];

  return (
    <SidebarMenu className="flex flex-row items-center justify-between group-data-[collapsible=icon]:flex-col group-data-[collapsible=icon]:items-start group-data-[collapsible=icon]:gap-2">
      <SidebarMenuItem className="group-data-[collapsible=icon]:hidden">
        <SidebarMenuButton
          size="lg"
          className="data-open:bg-green-500 data-open:text-sidebar-accent-foreground"
        >
          <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-green-500 text-sidebar-primary-foreground">
            {activeCompany.logo}
          </div>
          <div className="grid flex-1 text-left text-sm leading-tight">
            <span className="truncate font-medium">{activeCompany.name}</span>
            <span className="truncate text-xs">{activeCompany.plan}</span>
          </div>
        </SidebarMenuButton>
      </SidebarMenuItem>

      <SidebarMenuItem>
        <SidebarTrigger className="size-8 group-data-[collapsible=icon]:self-start" />
      </SidebarMenuItem>
    </SidebarMenu>
  );
}
