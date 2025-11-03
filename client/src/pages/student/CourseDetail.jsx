import { BadgeInfo, Lock, PlayCircle } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../../components/ui/card";
import { Separator } from "../../components/ui/separator";
import { Button } from "../../components/ui/button";
import BuyCourseButton from "../../components/component/BuyCourseButton";

export default function CourseDetail() {
  const purchaseCourse = false;
  return (
    <div className="mt-20 space-y-5">
      <div className="bg-[#2d2f31] text-white">
        <div className="max-w-7xl mx-auto py-8 px-4 md:px-8 flex flex-col gap-2">
          <h1 className="font-bold text-2xl md:text-3xl">Course Title</h1>
          <p className="text-base md:text-lg">Course Sub Title</p>
          <p>
            Created By{" "}
            <span className="text-[#c0c4fc] underline italic">Mehar HAbib</span>{" "}
          </p>
          <div className="flex items-center gap-2 text-sm">
            <BadgeInfo size={16} />
            <p>Last updated 20-20-2025</p>
          </div>
          <p>Student enrolled 20</p>
        </div>
      </div>
      <div className="max-w-7xl mx-auto my-5 px-4 md:px-8 flex flex-col lg:flex-row justify-between gap-10">
        <div className="w-full lg:w-1/2 space-y-5">
          <h1 className="font-bold text-xl md:text-2xl">Description</h1>
          <p className="text-sm">
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Cupiditate
            velit minus quia reiciendis accusamus perferendis, hic iste repellat
            quidem. Tenetur, voluptatem dolorum dolore, ducimus necessitatibus
            facere at perspiciatis ipsa natus, iure illo similique blanditiis
            modi fugiat quis fugit dolor totam. Fugiat ab alias expedita
            laboriosam error non ratione? Temporibus, expedita!
          </p>
          <Card>
            <CardHeader>
              <CardTitle>Course Content</CardTitle>
              <CardDescription>4 lectures</CardDescription>
            </CardHeader>
            <CardContent>
              {[1, 2, 3].map((_, idx) => (
                <div key={idx} className="flex items-center gap-3 text-sm">
                  <span>
                    {true ? <PlayCircle size={14} /> : <Lock size={14} />}
                  </span>
                  <p>lecture Title</p>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
        <div className="w-full lg:w-1/3">
          <Card>
            <CardContent className="p-4 flex flex-col">
              <div className="w-full aspect-video mb-4">React Player Video</div>
              <h1>lecture Title</h1>
              <Separator className="my-2" />
              <h1 className="text-lg md:text-xl">Course Price</h1>
            </CardContent>
            <CardFooter className="flex justify-center p-4">
              {purchaseCourse ? (
                <Button className="w-full">Continue Course</Button>
              ) : (
                <BuyCourseButton />
              )}
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  );
}
