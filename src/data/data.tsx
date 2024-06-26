import 'bootstrap/dist/css/bootstrap.min.css';

import {
  AcademicCapIcon,
  ArrowDownTrayIcon,
  BuildingOffice2Icon,
  CalendarIcon,
  FlagIcon,
  MapIcon,
  SparklesIcon,
} from '@heroicons/react/24/outline';

import GithubIcon from '../components/Icon/GithubIcon';
import LinkedInIcon from '../components/Icon/LinkedInIcon';
import heroImage from '../images/header-background.webp';
import profilepic from '../images/profile.jpeg';
import {About, ContactSection, ContactType, Hero, HomepageMeta, SkillGroup, Social} from './dataDef';
/**
 * Page meta data
 */
export const homePageMeta: HomepageMeta = {
  title: 'Eric Dacal Sánchez',
  description: 'Resume Eric Dacal Sánchez',
};

/**
 * Section definition
 */
export const SectionId = {
  Hero: 'hero',
  About: 'about',
  Contact: 'contact',
  Portfolio: 'portfolio',
  Resume: 'resume',
  Skills: 'skills',
  Stats: 'stats',
} as const;

export type SectionId = (typeof SectionId)[keyof typeof SectionId];

/**
 * Hero section
 */
export const heroData: Hero = {
  imageSrc: heroImage,
  name: `I'm Eric Dacal.`,
  description: (
    <>
      <p className="prose-sm text-stone-200 sm:prose-base lg:prose-lg">
        I consider myself a responsible person, very <strong className="text-stone-100">creative</strong>,{' '}
        <strong className="text-stone-100">adaptable</strong> and always{' '}
        <strong className="text-stone-100">willing to learn</strong>. I've participated in a lot of group projects and I
        think I am a person who knows how to work with others and communicate with the team.
      </p>
      <p className="prose-sm text-stone-200 sm:prose-base lg:prose-lg">
        In my free time time, I love <strong className="text-stone-100">cinema</strong>,
        <strong className="text-stone-100">photograpy</strong>, and <strong className="text-stone-100">travel</strong>.
      </p>
    </>
  ),
  actions: [
    {
      href: 'CV.pdf',
      text: 'Resume',
      primary: true,
      Icon: ArrowDownTrayIcon,
    },
    {
      href: `#${SectionId.Contact}`,
      text: 'Contact',
      primary: false,
    },
  ],
};

/**
 * About section
 */
export const aboutData: About = {
  profileImageSrc: profilepic,
  description: `I consider myself a responsible person, very creative, adaptable and always willing to learn. I've participated in a lot of group projects and I think I am a person who knows how to work with others and communicate with the team.`,
  aboutItems: [
    {label: 'Location', text: 'Barcelona, ES', Icon: MapIcon},
    {label: 'Age', text: '28', Icon: CalendarIcon},
    {label: 'Nationality', text: 'Spanish', Icon: FlagIcon},
    {label: 'Interests', text: 'Photography, Cinema, Travel', Icon: SparklesIcon},
    {label: 'Study', text: ' Universitat Politècnica de Catalunya', Icon: AcademicCapIcon},
    {label: 'Employment', text: 'Horizon Games', Icon: BuildingOffice2Icon},
  ],
};

/**
 * Skills section
 */
export const skills: SkillGroup[] = [
  {
    name: 'Spoken languages',
    skills: [
      {
        name: 'English',
        level: 10,
      },
      {
        name: 'French',
        level: 4,
      },
      {
        name: 'Spanish',
        level: 3,
      },
    ],
  },
  {
    name: 'Frontend development',
    skills: [
      {
        name: 'React',
        level: 9,
      },
      {
        name: 'Typescript',
        level: 7,
      },
      {
        name: 'GraphQL',
        level: 6,
      },
    ],
  },
  {
    name: 'Backend development',
    skills: [
      {
        name: 'Node.js',
        level: 8,
      },
      {
        name: 'Rust',
        level: 5,
      },
      {
        name: 'Golang',
        level: 4,
      },
    ],
  },
  {
    name: 'Mobile development',
    skills: [
      {
        name: 'React Native',
        level: 9,
      },
      {
        name: 'Flutter',
        level: 4,
      },
      {
        name: 'Swift',
        level: 3,
      },
    ],
  },
];

export const contact: ContactSection = {
  headerText: 'Get in touch.',
  description: 'Here is a good spot for a message to your readers to let them know how best to reach out to you.',
  items: [
    {
      type: ContactType.Email,
      text: 'eric@dacal.es',
      href: 'mailto:eric@dacal.es',
    },
    {
      type: ContactType.Location,
      text: 'Barcelona, Spain',
      href: 'https://www.google.es/maps/place/Barcelona/@41.5377064,1.8530945,11.48z/data=!4m6!3m5!1s0x12a49816718e30e5:0x44b0fb3d4f47660a!8m2!3d41.3873974!4d2.168568!16zL20vMDFmNjI?entry=ttu',
    },
    {
      type: ContactType.Github,
      text: 'ericdacal',
      href: 'https://github.com/ericdacal',
    },
  ],
};

/**
 * Social items
 */
export const socialLinks: Social[] = [
  {label: 'Github', Icon: GithubIcon, href: 'https://github.com/ericdacal'},
  {label: 'LinkedIn', Icon: LinkedInIcon, href: 'https://www.linkedin.com/in/erdasa'},
];
