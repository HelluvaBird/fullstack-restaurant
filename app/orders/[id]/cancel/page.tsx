import { redirect } from 'next/navigation';

interface Props {
  params: {
    id: string;
  };
}
export default function Page({ params: { id } }: Props) {
  return redirect('/orders/' + id);
}
