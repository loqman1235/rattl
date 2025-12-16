"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import { profileSchema, ProfileInput } from "@/validators/onboarding";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Camera, Loader2 } from "lucide-react";
import Image from "next/image";
import { updateAvatar, updateProfile } from "@/actions/onboarding";

export default function ProfilePage() {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [avatarPreview, setAvatarPreview] = useState<string>("");
  const [avatarUrl, setAvatarUrl] = useState<string>("");
  const [isUploading, setIsUploading] = useState(false);
  const [uploadError, setUploadError] = useState<string>("");

  const form = useForm<ProfileInput>({
    resolver: zodResolver(profileSchema),
    defaultValues: { bio: "", location: "", website: "" },
  });

  // Upload file to cloudinary via API
  const handleAvatarUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploadError("");

    if (file.size > 5 * 1024 * 1024) {
      setUploadError("File too large. Maximum size is 5MB.");
      return;
    }

    // Preview
    const reader = new FileReader();
    reader.onloadend = () => setAvatarPreview(reader.result as string);
    reader.readAsDataURL(file);

    // Upload
    setIsUploading(true);
    try {
      const formData = new FormData();
      formData.append("avatar", file);

      const response = await fetch("/api/upload/avatar", {
        method: "POST",
        body: formData,
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || "Upload failed");
      }

      // Store url
      setAvatarUrl(result.url);
    } catch (error) {
      console.error(error);
      setUploadError(error instanceof Error ? error.message : "Upload failed");
      setAvatarPreview("");
    } finally {
      setIsUploading(false);
    }
  };

  const onSubmit = async (data: ProfileInput) => {
    startTransition(async () => {
      try {
        if (avatarUrl) {
          await updateAvatar(avatarUrl);
        }

        await updateProfile({
          bio: data.bio,
          location: data.location,
          website: data.website,
        });

        router.push("/onboarding/interests");
      } catch (error) {
        console.error(error);
      }
    });
  };

  const handleSkip = () => {
    router.push("/onboarding/interests");
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Set up your profile</h1>
        <p className="text-muted-foreground mt-2">
          Tell others about yourself. You can skip this and do it later.
        </p>
      </div>

      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        {/* Avatar Upload */}
        <div className="flex justify-center">
          <div className="relative">
            <Avatar className="h-32 w-32">
              <AvatarImage src={avatarPreview} />
              <AvatarFallback>
                <Image
                  src="/avatar_light.svg"
                  width={200}
                  height={200}
                  alt="Avatar"
                />
              </AvatarFallback>
            </Avatar>
            <label
              htmlFor="avatar-upload"
              className={`
                absolute bottom-0 right-0 h-10 w-10 rounded-full 
                bg-primary text-primary-foreground 
                flex items-center justify-center 
                cursor-pointer hover:bg-primary/90 
                transition-colors
                ${isUploading ? "opacity-50 cursor-not-allowed" : ""}
              `}
            >
              {isUploading ? (
                <Loader2 className="size-5 animate-spin" />
              ) : (
                <Camera className="size-5" />
              )}
              <input
                id="avatar-upload"
                type="file"
                accept="image/jpeg,image/png,image/webp,image/gif"
                className="hidden"
                onChange={handleAvatarUpload}
                disabled={isUploading}
              />
            </label>
          </div>{" "}
          {uploadError && (
            <p className="text-sm text-destructive">{uploadError}</p>
          )}
        </div>

        <Field>
          <FieldLabel htmlFor="bio">Bio</FieldLabel>
          <Textarea
            {...form.register("bio")}
            id="bio"
            placeholder="Tell us about yourself..."
            rows={3}
            maxLength={160}
          />
          <p className="text-xs text-muted-foreground">
            {form.watch("bio")?.length || 0}/160
          </p>
        </Field>

        <Field>
          <FieldLabel htmlFor="location">Location</FieldLabel>
          <Input
            {...form.register("location")}
            id="location"
            placeholder="San Francisco, CA"
          />
        </Field>

        <Field>
          <FieldLabel htmlFor="website">Website</FieldLabel>
          <Input
            {...form.register("website")}
            id="website"
            type="url"
            placeholder="https://yoursite.com"
          />
          {form.formState.errors.website && (
            <FieldError errors={[form.formState.errors.website]} />
          )}
        </Field>

        <div className="flex gap-3">
          <Button
            type="button"
            variant="outline"
            className="flex-1"
            size="lg"
            onClick={handleSkip}
          >
            Skip for now
          </Button>
          <Button
            type="submit"
            className="flex-1"
            size="lg"
            disabled={isPending || isUploading}
          >
            {isPending ? "Saving..." : "Continue"}
          </Button>
        </div>
      </form>
    </div>
  );
}
