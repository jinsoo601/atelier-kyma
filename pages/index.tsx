import { useRouter } from 'next/router';

export default function Index() {
	const router = useRouter();
	router.push('/exhibition');
	return null;
}
