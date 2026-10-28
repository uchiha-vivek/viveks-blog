import { illustrations, type IllustrationId } from "@/components/illustrations";

// A post's sketch framed as a cover plate for the home page.
export default function Cover({ id }: { id: IllustrationId }) {
  const Illustration = illustrations[id];
  return (
    <div className="cover" aria-hidden="true">
      <Illustration />
    </div>
  );
}
