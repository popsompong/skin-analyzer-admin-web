import type { Metadata } from "next";
import {
  AdminFluxSkyGoldenMockup,
  type FluxSkyMockupState
} from "@/components/visual-concepts/admin-flux-sky-golden-mockup";

export const metadata: Metadata = {
  title: "Flux Sky Golden Mockup | Skin Analyzer Admin",
  description:
    "Isolated visual concept for the Skin Analyzer Admin Flux Sky shell contract.",
  robots: {
    index: false,
    follow: false
  }
};

const mockupStates = new Set<FluxSkyMockupState>([
  "default",
  "hover-blog",
  "focus-tips",
  "collapsed",
  "command-open",
  "notifications-open",
  "profile-open",
  "drawer-open"
]);

type PageProps = {
  searchParams?: Promise<{
    state?: string | string[];
  }>;
};

export default async function AdminFluxSkyGoldenMockupPage({
  searchParams
}: PageProps) {
  const params = await searchParams;
  const rawState = Array.isArray(params?.state)
    ? params?.state[0]
    : params?.state;
  const state = mockupStates.has(rawState as FluxSkyMockupState)
    ? (rawState as FluxSkyMockupState)
    : "default";

  return <AdminFluxSkyGoldenMockup initialState={state} />;
}
