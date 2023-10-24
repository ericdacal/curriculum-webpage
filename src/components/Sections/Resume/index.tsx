import { FC, memo } from 'react';
import Section from '../../Layout/Section';
import { SectionId } from '../../../data/data';

const Resume: FC = memo(() => {
  return (
    <Section className="bg-neutral-100" sectionId={SectionId.Resume}>
      <div className="flex justify-center items-center h-screen">
        <button className="bg-orange-400 hover:bg-orange-500 text-white font-bold py-2 px-4 rounded">
          Download CV
        </button>
      </div>
    </Section>
  );
});

Resume.displayName = 'Resume';
export default Resume;