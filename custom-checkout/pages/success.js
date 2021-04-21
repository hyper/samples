import { useRouter } from 'next/router';

export default function Success() {
  const router = useRouter();

  return `Success: ${router.query.license}`;
}
