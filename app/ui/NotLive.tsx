
import { useRouter } from 'next/navigation';

const NotLive = () => {
    const router = useRouter();

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <div className="bg-red-200 border border-red-400 text-red-700 px-4 py-2 rounded-md mb-4">
        <p className="font-semibold">This Page is not Live!</p>
      </div>
        <button 
        onClick={() => router.replace('/dashboard')}
        className="text-blue-600 hover:underline border-2 rounded-md p-2"
        >
            Back
        </button>
    </div>
  );
};

export default NotLive;
