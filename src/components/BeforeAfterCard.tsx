import {
  ResizablePanelGroup,
  ResizablePanel,
  ResizableHandle,
} from "@/components/ui/resizable"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

interface Media {
  url: string;
  title: string;
}

interface BeforeAfterCardProps {
  before: Media;
  after: Media;
  title: string;
}

export const BeforeAfterCard = ({ before, after, title }: BeforeAfterCardProps) => {
  return (
    <Card className="overflow-hidden border bg-card text-card-foreground shadow-sm hover:shadow-xl transition-shadow duration-300 h-full flex flex-col">
      <CardHeader>
        <CardTitle className="truncate capitalize text-lg font-semibold">{title}</CardTitle>
      </CardHeader>
      <CardContent className="flex-grow p-0">
        <div className="relative aspect-video w-full">
          <ResizablePanelGroup
            direction="horizontal"
            className="w-full h-full"
          >
            <ResizablePanel defaultSize={50} minSize={10}>
              <div className="relative h-full w-full">
                <img
                  src={before.url}
                  alt={before.title}
                  className="absolute top-0 left-0 w-full h-full object-cover"
                />
                <div className="absolute top-2 left-2 bg-background/70 text-foreground text-xs font-bold px-2 py-1 rounded-md backdrop-blur-sm">
                  VORHER
                </div>
              </div>
            </ResizablePanel>
            <ResizableHandle withHandle />
            <ResizablePanel defaultSize={50} minSize={10}>
              <div className="relative h-full w-full">
                <img
                  src={after.url}
                  alt={after.title}
                  className="absolute top-0 left-0 w-full h-full object-cover"
                />
                <div className="absolute top-2 right-2 bg-background/70 text-foreground text-xs font-bold px-2 py-1 rounded-md backdrop-blur-sm">
                  NACHHER
                </div>
              </div>
            </ResizablePanel>
          </ResizablePanelGroup>
        </div>
      </CardContent>
    </Card>
  );
};