import { FC, memo } from 'react';
import Section from '../Layout/Section';
import { SectionId } from '../../data/data';

const Portfolio: FC = memo(() => {
  return (
    <Section className="bg-neutral-800" sectionId={SectionId.Portfolio}>
      <div className="flex justify-center items-center h-screen">
        <button className="bg-orange-400 hover:bg-orange-500 text-white font-bold py-2 px-4 rounded">
          Access to Portfolio
        </button>
      </div>
    </Section>
  );
});

Portfolio.displayName = 'Portfolio';
export default Portfolio;