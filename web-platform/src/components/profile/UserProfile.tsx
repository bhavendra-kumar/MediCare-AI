"use client";

import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { User, Mail, Phone, Save } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { toast } from "sonner";
import { TypographyH1, TypographyH3, TypographyP, TypographySmall } from "@/components/ui/typography";
import { useAuth } from "@/context/AuthContext";


const profileSchema = z.object({
  fullName: z.string().min(2, "Name is too short"),
  email: z.string().email("Invalid email address"),
  phone: z.string().optional(),
  address: z.string().optional(),
  dateOfBirth: z.string().optional(),
  bloodGroup: z.string().optional(),
  allergies: z.string().optional(),
});

type ProfileFormValues = z.infer<typeof profileSchema>;

export function UserProfile() {
  const { user, updateUser } = useAuth();
  const [isSaving, setIsSaving] = React.useState(false);

  const { register, handleSubmit, reset, formState: { errors } } = useForm<ProfileFormValues>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      fullName: user?.name || "Test User",
      email: user?.email || "user@example.com",
      phone: "+1 (555) 000-0000",
      dateOfBirth: "1985-06-15",
      bloodGroup: "O+",
      allergies: "Penicillin",
    },
  });

  useEffect(() => {
    if (user) {
      reset({
        fullName: user.name || "",
        email: user.email || "",
        phone: "+1 (555) 000-0000",
        dateOfBirth: "1985-06-15",
        bloodGroup: "O+",
        allergies: "Penicillin",
      });
    }
  }, [user, reset]);

  const onSubmit = async (data: ProfileFormValues) => {
    setIsSaving(true);
    try {
      updateUser({
        name: data.fullName,
        email: data.email,
      });
      // Simulate API saving latency
      await new Promise((resolve) => setTimeout(resolve, 1000));
      toast.success("Profile updated successfully");
    } catch (err) {
      console.error(err);
      toast.error("Failed to update profile");
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <TypographyH1 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white">Profile</TypographyH1>
          <TypographyP className="text-slate-500 mt-1 dark:text-slate-400">Manage your personal and medical information.</TypographyP>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-1 space-y-6">
          <Card>
            <CardContent className="pt-6 flex flex-col items-center">
              <Avatar className="h-24 w-24 mb-4 ring-4 ring-white dark:ring-slate-950">
                <AvatarImage src={user?.avatar || ""} />
                <AvatarFallback className="text-2xl bg-sky-100 text-sky-700 dark:bg-sky-900 dark:text-sky-300">
                  {user?.name?.charAt(0) || "U"}
                </AvatarFallback>
              </Avatar>
              <TypographyH3 className="text-lg font-bold text-slate-900 dark:text-white">{user?.name || "User"}</TypographyH3>
              <TypographyP className="text-sm text-slate-500 mb-4 dark:text-slate-400">Premium Member</TypographyP>
              <Button variant="outline" size="sm" className="w-full">Change Photo</Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-md">Quick Stats</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-between items-center py-2 border-b border-slate-100 dark:border-slate-800">
                <TypographySmall className="text-sm text-slate-500 dark:text-slate-400">Join Date</TypographySmall>
                <TypographySmall className="text-sm font-medium text-slate-900 dark:text-white">Oct 2023</TypographySmall>
              </div>
              <div className="flex justify-between items-center py-2 border-b border-slate-100 dark:border-slate-800">
                <TypographySmall className="text-sm text-slate-500 dark:text-slate-400">Total Consultations</TypographySmall>
                <TypographySmall className="text-sm font-medium text-slate-900 dark:text-white">24</TypographySmall>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="md:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>Personal Details</CardTitle>
              <CardDescription>Update your contact and medical details here.</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="fullName">Full Name</Label>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                      <Input id="fullName" className="pl-9" {...register("fullName")} />
                    </div>
                    {errors.fullName && <TypographyP className="text-xs text-red-500">{errors.fullName.message}</TypographyP>}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                      <Input id="email" type="email" className="pl-9" {...register("email")} />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone Number</Label>
                    <div className="relative">
                      <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                      <Input id="phone" className="pl-9" {...register("phone")} />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="dateOfBirth">Date of Birth</Label>
                    <Input id="dateOfBirth" type="date" {...register("dateOfBirth")} />
                  </div>
                </div>

                <div className="space-y-4 pt-4 border-t border-slate-100 dark:border-slate-800">
                  <TypographyH3 className="font-semibold text-slate-900 dark:text-white">Medical Information</TypographyH3>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="bloodGroup">Blood Group</Label>
                      <Input id="bloodGroup" {...register("bloodGroup")} />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="allergies">Known Allergies</Label>
                      <Input id="allergies" {...register("allergies")} />
                    </div>
                  </div>
                </div>

                <div className="flex justify-end pt-4">
                  <Button type="submit" disabled={isSaving} className="gap-2">
                    <Save className="h-4 w-4" />
                    {isSaving ? "Saving..." : "Save Changes"}
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
