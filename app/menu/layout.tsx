import Tabs from '@/components/Tabs';

interface Props {
  tabs: React.ReactNode;
}

export default function Layout({ tabs }: Props) {
  return (
    <>
      <div className="flex-1 p-4 flex justify-center">
        <div className="w-full max-w-7xl">
          <Tabs />
          <div>{tabs}</div>
        </div>
      </div>
    </>
  );
}
