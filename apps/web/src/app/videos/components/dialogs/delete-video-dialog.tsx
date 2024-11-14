"use client";

import {
  Credenza,
  CredenzaContent,
  CredenzaDescription,
  CredenzaHeader,
  CredenzaTitle,
} from "@/components/ui/credenza";
import { deleteVideoAtom } from "../../atoms";
import { useAtom } from "jotai";
import { Button } from "@/components/ui/button";
import { deleteVideo } from "../../actions";
import { toast } from "sonner";
import { useUserVideoDatastore } from "../../stores/user-video-data";

export function DeleteVideoDialog() {
  const videos = useUserVideoDatastore((s) => s.videos);
  const [deleteVideoData, setDeleteVideoData] = useAtom(deleteVideoAtom);

  async function doDeleteVideo() {
    if (!deleteVideoData) {
      return;
    }

    console.log({ videos });

    const oldVideos = [...videos];

    function reset(message?: string) {
      console.log("resetting videos to ", oldVideos);
      useUserVideoDatastore.setState({ videos: oldVideos });
      toast.error("Failed to delete video.", { description: message });
    }

    try {
      setDeleteVideoData(undefined);

      useUserVideoDatastore.setState({ videos: videos.filter((v) => v.id !== deleteVideoData.id) });

      const result = await deleteVideo(deleteVideoData.id);

      if (!result.success) {
        reset(result.message);
      } else {
        toast.success("Video deleted", {
          description: result.message,
        });
      }
    } catch (e) {
      console.error(e);
      reset();
    }
  }

  if (deleteVideoData === undefined) {
    return null;
  }

  return (
    <Credenza
      onOpenChange={(o) => {
        if (!o) {
          setDeleteVideoData(undefined);
        }
      }}
      open={deleteVideoData !== undefined}
    >
      <CredenzaContent>
        <CredenzaHeader>
          <CredenzaTitle>Confirm Video Deletion</CredenzaTitle>
          <CredenzaDescription>
            Are you sure you want to delete <strong>{deleteVideoData.name}</strong>?
          </CredenzaDescription>
        </CredenzaHeader>
        <div className="flex gap-2 items-end">
          <Button
            className="grow"
            onMouseDown={() => {
              setDeleteVideoData(undefined);
            }}
          >
            Cancel
          </Button>
          <Button
            className="grow"
            variant="destructive"
            onMouseDown={() => {
              doDeleteVideo();
            }}
          >
            Delete
          </Button>
        </div>
      </CredenzaContent>
    </Credenza>
  );
}
