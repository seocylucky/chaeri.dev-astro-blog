export type TimelineItem = {
  start: string;
  end?: string;
  titleEn: string;
  titleKr?: string;
  role?: string;
  location?: string;
  description?: string;
  link?: string;
  tags?: string[];
};

export const activities: TimelineItem[] = [
  {
    start: '2025.07',
    end: 'now',
    titleEn: '2025 Open Source Contribution Academy',
    titleKr: '오픈소스 컨트리뷰션 아카데미',
    role: '(참여형) Githru-vscode-ext Mentee',
    link: 'https://github.com/githru/githru-vscode-ext',
  },
  {
    start: '2024.12',
    end: '2025.06',
    titleEn: 'Woori FISA',
    titleKr: '우리FIS아카데미',
    role: '4기 클라우드 서비스 개발 과정 교육 수료',
    link: 'https://woorifisa.com/',
  },
  {
    start: '2023.09',
    end: '2024.08',
    titleEn: 'Google Developer Student Club (GDSC) Soongsil',
    titleKr: '지디에스씨',
    role: '교내 IT 커뮤니티 동아리 | 3rd Core Member(운영진)',
    link: 'http://developers.google.com/community?hl=ko',
  },
  {
    start: '2023.01',
    end: '2025.02',
    titleEn: 'YOURSSU',
    titleKr: '유어슈',
    role: '교내 IT 동아리 | WEB FrontEnd Member',
    link: 'https://yourssu.com/',
  },
  {
    start: '2022.03',
    end: '2023.12',
    titleEn: 'LIKELION',
    titleKr: '멋쟁이사자처럼',
    role: 'IT 연합 동아리 | 10기 프론트엔드 수료생, 11기 대표',
    link: 'https://likelion.university/',
  },
];

export const awards: TimelineItem[] = [
  {
    start: '2025.06.17',
    titleEn: '우리FIS아카데미 프로젝트 발표회',
    titleKr: '최우수상(부문 1위)',
  },
  {
    start: '2025.06.17',
    titleEn: '우리FIS아카데미 클라우드서비스개발 FE 기술세미나',
    titleKr: '우수상',
  },
  {
    start: '2023.08.16',
    titleEn: '숭실대학교 IT대학 소프트웨어공모전',
    titleKr: '은상',
  },
  {
    start: '2022.12.20',
    titleEn: '멋쟁이사자처럼 프로젝트 성과 공유회',
    titleKr: '최우수상(1위)',
  },
  {
    start: '2022.11.18',
    titleEn: '멋쟁이사자처럼대학 연합해커톤 단풍톤',
    titleKr: '대상(1위)',
  },
];
