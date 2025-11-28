import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { LuStar } from "react-icons/lu";
import { Button } from "@/components/ui/button";

interface GlassCardProps {
  imgSrc: string;
  title: string;
  description: string;
  onTry: () => void;
}

export default function GlassCard({ imgSrc, title, description, onTry }: GlassCardProps) {
  return (
    <div className="px-6 py-8 flex justify-center"> {/* outer padding / gap around card */}
      <Card
        className={`w-full max-w-5xl bg-white/20 backdrop-blur-md border border-[rgba(60,45,30,0.4)] rounded-2xl shadow-lg overflow-hidden transition-all duration-300 hover:border-[rgba(120,90,60,1)] hover:shadow-[0_0_45px_rgba(120,90,60,0.9)] hover:animate-pulse`
        }
      >
        {/* Horizontal layout on md+ screens, stacked on small screens */}
        <div className="flex flex-col md:flex-row">
          <div className="md:w-1/2 w-full h-64 md:h-auto">
            <img src={imgSrc} alt={title} className="w-full h-full object-cover" />
          </div>

          <div className="md:w-1/2 w-full p-6 flex flex-col justify-between">
            <div>
              <CardHeader className="p-0">
                <CardTitle className="text-2xl">{title}</CardTitle>
                <CardDescription className="mt-2">{description}</CardDescription>
              </CardHeader>

              <CardContent className="pt-4 space-y-4 flex items-center gap-3">
                <p className="text-sm leading-relaxed flex-1">This card now uses an icon instead of a vertical image section.</p>

                {/* example icon area */}
                <div className="text-3xl text-[rgba(120,90,60,1)]">
                  <LuStar />
                </div>
              </CardContent>
            </div>

            <CardFooter className="p-0 mt-4">
              <Button onClick={onTry} className="w-full">Try it</Button>
            </CardFooter>
          </div>
        </div>
      </Card>
    </div>
  );
}
