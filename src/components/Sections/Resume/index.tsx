import {FC, memo} from 'react';

import {SectionId} from '../../../data/data';
import Section from '../../Layout/Section';

const Resume: FC = memo(() => {
  const cvURL = "CV.pdf";
  return (
    <Section className="bg-neutral-100" sectionId={SectionId.Resume}>
       <div className="flex justify-center items-center h-screen">
          <a className="bg-orange-400 hover:bg-orange-500 text-white font-bold py-2 px-4 rounded inline-block" download href={cvURL}>
            Download CV
          </a>
    </div>
    </Section>
  );
});

Resume.displayName = 'Resume';
export default Resume;