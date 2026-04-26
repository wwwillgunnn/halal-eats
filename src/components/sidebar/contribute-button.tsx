import { Plus, Store, MapPin, Utensils, FileText } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

export function ContributeButton() {
  return (
    <Dialog>
      <DialogTrigger
        render={
          <Button
            variant="outline"
            className="h-10 w-full rounded-xl px-3 font-normal"
          >
            <Plus className="size-4" />
            Contribute
          </Button>
        }
      />

      <DialogContent className="max-w-md rounded-2xl">
        <DialogHeader>
          <DialogTitle>Add a halal restaurant</DialogTitle>
          <DialogDescription>
            Share details about a halal food spot so it can be reviewed and
            added to the map.
          </DialogDescription>
        </DialogHeader>

        <form className="space-y-3">
          <div className="relative">
            <Utensils className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
            <Input className="pl-9" placeholder="Restaurant name" />
          </div>

          <div className="relative">
            <Store className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              className="pl-9"
              placeholder="Cuisine, e.g. Lebanese, burgers, cafe"
            />
          </div>

          <div className="relative">
            <MapPin className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
            <Input className="pl-9" placeholder="Address or suburb" />
          </div>

          <div className="relative">
            <FileText className="absolute left-3 top-3 size-4 text-muted-foreground" />
            <Textarea
              className="min-h-24 pl-9"
              placeholder="Halal status, opening hours, popular dishes, website..."
            />
          </div>

          <Button type="submit" className="w-full">
            Submit restaurant
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
