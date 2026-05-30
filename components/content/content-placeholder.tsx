import { PlaceholderPage } from "@/components/layout/placeholder-page";

type ContentPlaceholderProps = {
  description: string;
  deferred: string[];
  permission: string;
  scaffoldState: string;
  title: string;
};

export function ContentPlaceholder(props: ContentPlaceholderProps) {
  return <PlaceholderPage {...props} />;
}
