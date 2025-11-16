import { Loader2 } from "lucide-react";
import { useCreateCheckoutSessionMutation } from "../../features/api/purchaseApi";
import { Button } from "../ui/button";
import { useEffect } from "react";
import { toast } from "sonner";

export default function BuyCourseButton({ courseId }) {
  const [
    createCheckoutSession,
    { data, isLoading, isSuccess, isError, error },
  ] = useCreateCheckoutSessionMutation();
  const purchaseCourseHandler = async () => {
    await createCheckoutSession(courseId);
  };
  useEffect(() => {
    if (isSuccess) {
      if (data?.url) {
        window.location.href = data.url;
      }
    } else {
      toast.error("Something went wrong");
    }
    if (isError) {
      toast.error(error?.data?.message || "Something went wrong");
    }
  }, [data, isSuccess, isError, error]);
  return (
    <Button
      className="w-full"
      disabled={isLoading}
      onClick={purchaseCourseHandler}
    >
      {isLoading ? (
        <>
          <Loader2 className="animate-spin mr-2 h-4 w-4" /> Please wait
        </>
      ) : (
        "Buy Now"
      )}
    </Button>
  );
}
