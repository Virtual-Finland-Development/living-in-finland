import { useRouter } from 'next/router';
import { Button } from 'suomifi-ui-components';

export default function BackButton() {
  const router = useRouter();

  if (['/', '/profile', '/company'].includes(router.route)) {
    return null;
  }

  return (
    <div className="block md:hidden px-4 -mb-2">
      <Button
        key={router.route}
        variant="secondaryNoBorder"
        icon="arrowLeft"
        className="!px-0"
        onClick={() => router.back()}
      >
        BACK
      </Button>
    </div>
  );
}
