import {useRouter} from 'next/router';
import {FC, memo} from 'react';

import {SectionId} from '../../data/data';
import Section from '../Layout/Section';

const Portfolio: FC = memo(() => {
  const router = useRouter();

  const handleButtonClick = () => {
    router.push("/portfolio");
  };

  return (
    <Section className="bg-neutral-800" sectionId={SectionId.Portfolio}>
      <div className="flex justify-center items-center h-screen">
        <button className="bg-orange-400 hover:bg-orange-500 text-white font-bold py-2 px-4 rounded"  onClick={handleButtonClick}>
          Access to Portfolio
        </button>
      </div>
    </Section>
  );
});

Portfolio.displayName = 'Portfolio';
export default Portfolio;