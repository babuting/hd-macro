import Resolver from '@forge/resolver';
import { storage } from '@forge/api';
import api, { route } from '@forge/api';

const resolver = new Resolver();

// 기본 조직 데이터
const defaultOrganizationData = [
  {
    id: 1,
    category: '조직',
    chonggwal: '(C) ICT본부',
    hyundai: '(H) CEO 직속',
    kia: '(K) CEO 직속',
    group: '42dot'
  },
  {
    id: 2,
    category: '조직',
    chonggwal: '(C) 통합보안센터',
    hyundai: '(H) 글로벌사업관리본부',
    kia: '(K) 글로벌사업관리본부',
    group: ''
  },
  {
    id: 3,
    category: '조직',
    chonggwal: '(C) 기획조정본부',
    hyundai: '(H) Global Sales and Marketing',
    kia: '(K) 기업전략실',
    group: ''
  },
  {
    id: 4,
    category: '조직',
    chonggwal: '(C) 미래전략본부',
    hyundai: '(H) Global DND',
    kia: '(K) PBV비즈니스사업부',
    group: ''
  },
  {
    id: 5,
    category: '조직',
    chonggwal: '(C) HMG에너지&수소사업본부',
    hyundai: '(H) 경영지원본부',
    kia: '(K) 경영지원본부',
    group: ''
  },
  {
    id: 6,
    category: '조직',
    chonggwal: '(C) 기획조정담당 직속',
    hyundai: '(H) HR본부',
    kia: '',
    group: ''
  },
  {
    id: 7,
    category: '조직',
    chonggwal: '(C) 정책개발실',
    hyundai: '(H) 재경본부',
    kia: '(K) 재경본부',
    group: ''
  },
  {
    id: 8,
    category: '조직',
    chonggwal: '(C) 법무실',
    hyundai: '(H) Strategy & Governance',
    kia: '',
    group: ''
  },
  {
    id: 9,
    category: '조직',
    chonggwal: '(C) 전략기획담당',
    hyundai: '(H) IR담당',
    kia: '(K) IR/전략투자담당',
    group: ''
  },
  {
    id: 10,
    category: '조직',
    chonggwal: '(C) 인사실',
    hyundai: '(H) 브랜드마케팅본부',
    kia: '(K) 고객경험본부',
    group: ''
  },
  {
    id: 11,
    category: '조직',
    chonggwal: '(C) 감사실',
    hyundai: '(H) 제네시스사업본부',
    kia: '',
    group: ''
  },
  {
    id: 12,
    category: '조직',
    chonggwal: '(C) 전략기획담당 직속',
    hyundai: '(H) 글로벌생산&LCV사업본부',
    kia: '(K) 특수사업부',
    group: ''
  },
  {
    id: 13,
    category: '조직',
    chonggwal: '(C) HMG경영연구원',
    hyundai: '(H) 글로벌생산운영본부',
    kia: '',
    group: ''
  },
  {
    id: 14,
    category: '조직',
    chonggwal: '(C) 워성담당 직속',
    hyundai: '(H) 미주대전역',
    kia: '(K) 북미지역본부',
    group: ''
  }
];

resolver.define('getText', (req) => {
  console.log(req);
  return 'HMG Index Data Loaded Successfully!';
});

resolver.define('getNotices', (req) => {
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

// 조직 데이터 가져오기
resolver.define('getOrganizationData', async (req) => {
  try {
    const organizationData = await storage.get('organizationData');
    
    if (!organizationData) {
      // 기본 데이터가 없으면 초기 데이터를 저장하고 반환
      await storage.set('organizationData', defaultOrganizationData);
      return { data: defaultOrganizationData };
    }
    
    return { data: organizationData };
  } catch (error) {
    console.error('Error fetching organization data:', error);
    return { data: defaultOrganizationData };
  }
});

// 조직 데이터 저장하기
resolver.define('saveOrganizationData', async (req) => {
  try {
    const { data } = req.payload;
    await storage.set('organizationData', data);
    return { success: true, message: '조직 데이터가 저장되었습니다.' };
  } catch (error) {
    console.error('Error saving organization data:', error);
    return { success: false, message: '조직 데이터 저장 중 오류가 발생했습니다.' };
  }
});

// 조직 데이터 업데이트
resolver.define('updateOrganizationItem', async (req) => {
  try {
    const { id, updatedItem } = req.payload;
    const organizationData = await storage.get('organizationData') || defaultOrganizationData;
    
    const updatedData = organizationData.map(item => 
      item.id === id ? { ...item, ...updatedItem } : item
    );
    
    await storage.set('organizationData', updatedData);
    return { success: true, data: updatedData };
  } catch (error) {
    console.error('Error updating organization item:', error);
    return { success: false, message: '조직 데이터 업데이트 중 오류가 발생했습니다.' };
  }
});

// 조직 데이터 추가
resolver.define('addOrganizationItem', async (req) => {
  try {
    const { newItem } = req.payload;
    const organizationData = await storage.get('organizationData') || defaultOrganizationData;
    
    const newId = Math.max(...organizationData.map(item => item.id), 0) + 1;
    const itemWithId = { ...newItem, id: newId };
    
    const updatedData = [...organizationData, itemWithId];
    await storage.set('organizationData', updatedData);
    
    return { success: true, data: updatedData };
  } catch (error) {
    console.error('Error adding organization item:', error);
    return { success: false, message: '조직 데이터 추가 중 오류가 발생했습니다.' };
  }
});

// 조직 데이터 삭제
resolver.define('deleteOrganizationItem', async (req) => {
  try {
    const { id } = req.payload;
    const organizationData = await storage.get('organizationData') || defaultOrganizationData;
    
    const updatedData = organizationData.filter(item => item.id !== id);
    await storage.set('organizationData', updatedData);
    
    return { success: true, data: updatedData };
  } catch (error) {
    console.error('Error deleting organization item:', error);
    return { success: false, message: '조직 데이터 삭제 중 오류가 발생했습니다.' };
  }
});

// Service Desk 요청 생성
resolver.define('createServiceDeskRequest', async (req) => {
  try {
    const { title, content, accountId } = req.payload;
    
    console.log('Creating service desk request:', { title, content, accountId });
    
    // JSM 공식 명세에 맞는 요청 본문
    const requestBody = {
      serviceDeskId: "33",
      requestTypeId: "279",
      requestFieldValues: {
        summary: title,
        description: content
      },
      // 'reporter' 필드는 명세에 없음. 대신, asUser()로 호출 시 현재 사용자로 생성됨
    };

    console.log('Request body:', JSON.stringify(requestBody, null, 2));

    const response = await api.asUser().requestJira(
      route`/rest/servicedeskapi/request`,
      {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestBody)
      }
    );

    console.log('Service Desk API Response Status:', response.status);

    if (response.status === 201) {
      const responseData = await response.json();
      console.log('Success response data:', responseData);
      return {
        success: true,
        issueKey: responseData.issueKey || responseData.issueId,
        message: '서비스 요청이 성공적으로 생성되었습니다.'
      };
    } else {
      const errorData = await response.text();
      console.error('Service Desk API Error Response:', errorData);
      
      return {
        success: false,
        message: `서비스 요청 생성 실패: ${response.status} ${response.statusText}`,
        details: errorData
      };
    }

  } catch (error) {
    console.error('Error creating service desk request:', error);
    return {
      success: false,
      message: '서비스 요청 생성 중 오류가 발생했습니다: ' + error.message
    };
  }
});

// 스페이스 검색
resolver.define('searchSpaces', async (req) => {
  try {
    const { query } = req.payload;
    console.log('Searching spaces with query:', query);
    let allSpaces = [];
    let cursor = null;
    let hasMore = true;
    let iterationCount = 0;
    const maxIterations = 10; // 최대 10번까지만 반복
    const seenCursors = new Set(); // 중복 cursor 방지
    
    while (hasMore && iterationCount < maxIterations) {
      iterationCount++;
      console.log(`Iteration ${iterationCount}/${maxIterations}`);
      
      const options = {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
        },
        query: {
          limit: 100
        }
      };
      
      // cursor가 있으면 추가
      if (cursor) {
        options.query.cursor = cursor;
      }
      
      console.log('Making API request with options:', JSON.stringify(options, null, 2));
      
      const response = await api.asUser().requestConfluence(
        route`/wiki/api/v2/spaces`,
        options
      );
      
      console.log('Confluence API Response Status:', response.status);
      
      if (response.status !== 200) {
        const errorData = await response.text();
        console.error('Confluence API Error Response:', errorData);
        return {
          success: false,
          message: `스페이스 검색 실패: ${response.status} ${response.statusText}`,
          details: errorData
        };
      }
      
      const responseData = await response.json();
      console.log('Response data received:', {
        resultsCount: responseData.results ? responseData.results.length : 0,
        hasNext: !!(responseData._links && responseData._links.next),
        nextLink: responseData._links ? responseData._links.next : null
      });
      
      // 결과 추가
      if (responseData.results) {
        allSpaces = allSpaces.concat(responseData.results);
      }
      
      // 다음 페이지 확인
      if (responseData._links && responseData._links.next) {
        // next URL에서 cursor 파라미터 추출
        const nextUrl = new URL(responseData._links.next, 'https://example.com');
        const newCursor = nextUrl.searchParams.get('cursor');
        
        // 중복 cursor 체크
        if (newCursor && !seenCursors.has(newCursor)) {
          cursor = newCursor;
          seenCursors.add(newCursor);
          hasMore = true;
          console.log('Next cursor:', cursor);
        } else {
          console.log('Duplicate cursor or no cursor found, stopping pagination');
          hasMore = false;
        }
      } else {
        hasMore = false;
      }
    }
    
    if (iterationCount >= maxIterations) {
      console.log('Reached maximum iterations, stopping pagination');
    }
    
    console.log(`Total spaces collected: ${allSpaces.length}`);
    
    // 검색어가 있으면 프론트엔드에서 부분 일치 필터링
    let spaces = allSpaces;
    if (query && query.trim()) {
      const searchTerm = query.trim().toLowerCase();
      spaces = spaces.filter(space =>
        (space.name && space.name.toLowerCase().includes(searchTerm)) ||
        (space.key && space.key.toLowerCase().includes(searchTerm))
      );
    }
    
    return {
      success: true,
      spaces: spaces.map(space => ({
        id: space.id,
        key: space.key,
        name: space.name,
        _links: space._links
      }))
    };
  } catch (error) {
    console.error('Error searching spaces:', error);
    return {
      success: false,
      message: '스페이스 검색 중 오류가 발생했습니다: ' + error.message
    };
  }
});

// Global Settings resolver
resolver.define('globalSettingsResolver', (req) => {
  console.log('Global settings resolver called:', req);
  return {
    message: 'HMG Index Settings loaded successfully',
    version: '1.1.10'
  };
});

// 외부 API에서 조직도 데이터 가져오기 (샘플)
resolver.define('getExternalOrganizationData', async (req) => {
  try {
    console.log('Fetching external organization data...');
    
    // 샘플 조직도 API 호출 (JSONPlaceholder 사용)
    const response = await fetch('https://jsonplaceholder.typicode.com/users');
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const users = await response.json();
    console.log('External API response:', users.length, 'users received');
    
    // 조직도 형태로 변환
    const organizationData = users.slice(0, 10).map((user, index) => ({
      id: user.id,
      category: '조직',
      chonggwal: `(C) ${user.company?.name || 'ICT본부'}`,
      hyundai: `(H) ${user.name}`,
      kia: `(K) ${user.email.split('@')[0]}`,
      group: user.company?.catchPhrase || '42dot'
    }));
    
    return {
      success: true,
      data: organizationData,
      source: 'External API',
      message: '외부 API에서 조직도 데이터를 성공적으로 가져왔습니다.'
    };
    
  } catch (error) {
    console.error('Error fetching external organization data:', error);
    return {
      success: false,
      message: '외부 API 호출 중 오류가 발생했습니다: ' + error.message
    };
  }
});

// 공공데이터포털 기업정보 API 호출 예시 (실제 사용 시 API 키 필요)
resolver.define('getPublicCompanyData', async (req) => {
  try {
    const { companyName } = req.payload;
    console.log('Fetching public company data for:', companyName);
    
    // 실제 사용 시: 공공데이터포털 API 키 필요
    // const apiKey = 'YOUR_API_KEY';
    // const url = `http://apis.data.go.kr/1160100/service/GetCorpBasicInfoService/getCorpOutline?serviceKey=${apiKey}&corp_code=${corpCode}`;
    
    // 샘플 응답 (실제로는 공공데이터 API 호출)
    const sampleData = {
      companyName: companyName || '샘플기업',
      ceo: '홍길동',
      established: '2020-01-01',
      employees: 1000,
      address: '서울시 강남구',
      business: 'IT 서비스'
    };
    
    return {
      success: true,
      data: sampleData,
      source: 'Public Data Portal',
      message: '공공데이터에서 기업 정보를 가져왔습니다.'
    };
    
  } catch (error) {
    console.error('Error fetching public company data:', error);
    return {
      success: false,
      message: '공공데이터 API 호출 중 오류가 발생했습니다: ' + error.message
    };
  }
});

export const handler = resolver.getDefinitions();