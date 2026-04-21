import { SearchIcon } from "lucide-react";
import { cn } from "@/lib/utils";

import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group";

type SearchBarProps = React.ComponentProps<"div">;

export function SearchBar({ className, ...props }: SearchBarProps) {
  return (
    <InputGroup className={cn(className)} {...props}>
      <InputGroupAddon align="inline-start">
        <SearchIcon className="text-muted-foreground" />
      </InputGroupAddon>
      <InputGroupInput id="inline-start-input" placeholder="Search..." />
    </InputGroup>
  );
}
