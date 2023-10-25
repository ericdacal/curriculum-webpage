import {FC, memo} from 'react';

const ResumeSection: FC = memo(() => {
  return (
    <div className="flex justify-center items-center h-screen">
      <button className="bg-orange-400 hover:bg-orange-500 text-white font-bold py-2 px-4 rounded">Download CV</button>
    </div>
  );
});

ResumeSection.displayName = 'ResumeSection';
export default ResumeSection;
