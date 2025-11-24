export interface Project {
    title: string;
    subtitle: string;
    description: string;
    image: string;
    tags: string[];
    liveUrl?: string;
    codeUrl?: string;
    screenshotUrl: string;
  }
  
  export const projectsData: Project[] = [
    {
      title: "PierogiMeme.io",
      subtitle: "The Genesis of an Idea",
      description:
        "Kreatywna strona-mem dla fanów pierogów, zbudowana w duchu web3 i Solany. Humor spotyka technologię, by stworzyć coś viralowego.",
      image: "/images/pierogimeme.png",
      tags: ["Next.js", "Solana", "Memecoin", "Railway", "Cloudflare"],
      liveUrl: "https://pierogimeme.io",
      screenshotUrl: "/images/screenshots/pierogimeme.jpg",
    },
    {
      title: "BHP Stronie Śląskie",
      subtitle: "Lokalny Biznes Online",
      description:
        "Nowoczesna witryna dla firmy BHP. Projekt skupiony na SEO, szybkości i pełnej responsywności.",
      image: "/images/bhp-stronie.png",
      tags: ["Next.js", "TailwindCSS", "SEO", "Hosting"],
      liveUrl: "https://bhpstronieslaskie.pl",
      codeUrl: "https://github.com/twoj-profil/bhp-stronie",
      screenshotUrl: "/images/screenshots/bhp.jpg",
    },
  ];