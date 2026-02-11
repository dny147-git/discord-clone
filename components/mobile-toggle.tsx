import { Menu } from "lucide-react";
import NavigationSidebar from "./navigation/navigation-bar";
import ServerSidebar from "./server/server-sidebar";
import { Button } from "./ui/button";
import { Sheet, SheetContent, SheetTrigger } from "./ui/sheet";

export default function MobileToggle({ serverId }: { serverId: string }) {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant={"ghost"} size={"icon"} className="md:hidden">
          <Menu />
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="p-0 flex! flex-row gap-0">
        <div className="w-18">
          <NavigationSidebar />
        </div>
        <ServerSidebar serverId={serverId} />
      </SheetContent>
    </Sheet>
  );
}
