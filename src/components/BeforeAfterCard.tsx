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
    <Card className="overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 h-full flex flex-col">
      <CardHeader>
        <CardTitle className="truncate capitalize">{title}</CardTitle>
      </CardHeader>
      <CardContent className="flex-grow flex flex-col">
        <div className="relative aspect-video w-full">
          <ResizablePanelGroup
            direction="horizontal"
            className="w-full h-full rounded-lg border"
          >
            <ResizablePanel defaultSize={50} minSize={10}>
              <div className="relative h-full w-full">
                <img
                  src={before.url}
                  alt={before.title}
                  className="absolute top-0 left-0 w-full h-full object-cover"
                />
                <div className="absolute top-2 left-2 bg-black/60 text-white text-xs font-bold px-2 py-1 rounded">
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
                <div className="absolute top-2 right-2 bg-black/60 text-white text-xs font-bold px-2 py-1 rounded">
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