import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Skeleton } from "@/components/ui/skeleton";
import { humanFileSize } from "@/lib/utils";
import NumberFlow from "@number-flow/react";
import { XIcon } from "lucide-react";
import { toast } from "sonner";
import { onUploadCancelledServerFn } from "@/server-fns/videos";
import { useUploadingVideosStore } from "@/lib/stores/uploading-videos";
import { usageDataQueryOptions } from "@/lib/query-utils";
import { queryClient } from "@/routes/__root";

export function UploadingVideosContainer() {
  const { uploadingVideos, removeVideo } = useUploadingVideosStore();

  function handleUploadCancel(
    videoId: string,
    videoTitle: string,
    videoSizeBytes: number
  ) {
    removeVideo(videoId);
    queryClient.setQueryData(usageDataQueryOptions.queryKey, (oldData) => {
      if (!oldData) return oldData;
      return {
        ...oldData,
        totalStorageUsed: Math.max(
          oldData.totalStorageUsed - videoSizeBytes,
          0
        ),
      };
    });

    toast.promise(onUploadCancelledServerFn({ data: { videoId } }), {
      loading: "Cancelling upload...",
      success: "Upload cancelled",
      error: "Failed to cancel upload",
      description: videoTitle,
    });
  }

  return (
    <>
      {uploadingVideos.map((video) => (
        <Card
          key={video.id}
          className="group hover:cursor-pointer relative bg-card rounded-lg overflow-hidden shadow-md transition-shadow duration-300 ease-in-out hover:shadow-lg group aspect-video border-border/50 hover:border-border"
          onClick={() =>
            handleUploadCancel(video.id, video.title, video.file.size)
          }
        >
          <Skeleton className="absolute inset-0">
            <div className="group-hover:flex w-full h-full hidden items-center justify-center">
              <XIcon className="text-destructive w-16 h-16" />
            </div>
            <div className="absolute inset-0 bg-black bg-opacity-60 transition-opacity duration-300 ease-in-out group-hover:bg-opacity-40" />
          </Skeleton>
          <div className="absolute right-0 bg-black/50 p-1 m-1 rounded-md backdrop-blur-md text-xs">
            {humanFileSize(video.videoSizeBytes)}
          </div>
          <div className="relative z-10 p-4 h-full flex flex-col justify-end">
            <h2 className="text-lg font-semibold line-clamp-2 text-white transition-colors duration-300 ease-in-out">
              {video.title}
            </h2>
            <span className="text-sm text-muted-foreground flex items-center">
              <NumberFlow
                value={video.uploadProgress}
                format={{ minimumFractionDigits: 0, maximumFractionDigits: 0 }}
              />
              %
            </span>
            <Progress value={video.uploadProgress} />
          </div>
        </Card>
      ))}
    </>
  );
}
