import Link from "next/link";

import { Container } from "@/components/shared/container";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <main className="flex min-h-screen items-center py-20 text-center">
      <Container className="max-w-xl">
        <p className="text-xs font-semibold tracking-[0.25em] text-accent-foreground uppercase">
          404
        </p>
        <h1 className="mt-4 font-serif text-5xl">This moment isn’t here.</h1>
        <p className="mt-5 text-muted-foreground">
          The page or invitation may have moved or is no longer available.
        </p>
        <Button asChild className="mt-8">
          <Link href="/">Return home</Link>
        </Button>
      </Container>
    </main>
  );
}
