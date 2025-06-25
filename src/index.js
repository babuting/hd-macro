import Resolver from '@forge/resolver';

const resolver = new Resolver();

resolver.define('getText', (req) => {
  console.log(req);
  return 'HMG Index Data Loaded Successfully!';
});

resolver.define('getNotices', (req) => {
  // 실제 구현에서는 데이터베이스나 외부 API에서 공지사항을 가져올 수 있습니다
  return {
    notices: [
      {
        space: 'COMMONGUIDE',
        summary: '(2025.05.19) Bi Weekly Report of ICT',
        updated: '2025-05-19',
        creator: '김동진 책임매니저 IT정책지원팀'
      },
      {
        space: 'COMMONGUIDE', 
        summary: '(2025.05.04) Bi Weekly Report of ICT',
        updated: '2025-05-02',
        creator: '차협성 팀장 IT정책지원팀'
      }
    ]
  };
});

export const handler = resolver.getDefinitions();