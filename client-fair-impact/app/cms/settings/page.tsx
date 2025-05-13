import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import SettingsClient from "./client";
import { fetchSetting } from "@/hooks/use-setting";

export default async function SettingsCMSPage() {
  const queryClient = new QueryClient();
  await Promise.all([
    queryClient.prefetchQuery({
      queryKey: ["contactEmail"],
      queryFn: () => fetchSetting("ContactEmail"),
    }),
    queryClient.prefetchQuery({
      queryKey: ["privacyPolicyLink"],
      queryFn: () => fetchSetting("PrivacyPolicyLink"),
    }),
    queryClient.prefetchQuery({
      queryKey: ["introductionText"],
      queryFn: () => fetchSetting("IntroductionText"),
    }),
  ]);

  return (
    <>
      <HydrationBoundary state={dehydrate(queryClient)}>
        <SettingsClient />
      </HydrationBoundary>
    </>
  );
}
