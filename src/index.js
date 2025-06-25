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

// Service Desk 정보 조회
resolver.define('getServiceDeskInfo', async (req) => {
  try {
    console.log('Getting Service Desk information...');
    
    // 먼저 접근 가능한 Service Desk 목록을 조회
    const response = await api.asUser().requestJira(
      route`/rest/servicedeskapi/servicedesk`,
      {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
        }
      }
    );

    console.log('Service Desk List Response Status:', response.status);
    
    if (response.status === 200) {
      const data = await response.json();
      console.log('Available Service Desks:', data);
      return {
        success: true,
        serviceDesks: data.values || []
      };
    } else {
      const errorText = await response.text();
      console.error('Service Desk List Error:', errorText);
      return {
        success: false,
        message: `Service Desk 목록 조회 실패: ${response.status} ${response.statusText}`
      };
    }
  } catch (error) {
    console.error('Error getting service desk info:', error);
    return {
      success: false,
      message: 'Service Desk 정보 조회 중 오류가 발생했습니다: ' + error.message
    };
  }
});

// Request Types 조회
resolver.define('getRequestTypes', async (req) => {
  try {
    const { serviceDeskId } = req.payload;
    console.log(`Getting request types for Service Desk ${serviceDeskId}...`);
    
    const response = await api.asUser().requestJira(
      route`/rest/servicedeskapi/servicedesk/${serviceDeskId}/requesttype`,
      {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
        }
      }
    );

    console.log('Request Types Response Status:', response.status);
    
    if (response.status === 200) {
      const data = await response.json();
      console.log('Available Request Types:', data);
      return {
        success: true,
        requestTypes: data.values || []
      };
    } else {
      const errorText = await response.text();
      console.error('Request Types Error:', errorText);
      return {
        success: false,
        message: `Request Type 목록 조회 실패: ${response.status} ${response.statusText}`
      };
    }
  } catch (error) {
    console.error('Error getting request types:', error);
    return {
      success: false,
      message: 'Request Type 정보 조회 중 오류가 발생했습니다: ' + error.message
    };
  }
});

// Service Desk 요청 생성 (개선된 버전)
resolver.define('createServiceDeskRequest', async (req) => {
  try {
    const { title, content, serviceDeskId, requestTypeId } = req.payload;
    
    console.log('Creating service desk request:', { title, content, serviceDeskId, requestTypeId });
    
    // 요청 본문을 Jira의 요구사항에 맞게 구성
    const requestBody = {
      serviceDeskId: parseInt(serviceDeskId) || 1, // 기본값 또는 사용자 입력값
      requestTypeId: parseInt(requestTypeId) || 1, // 기본값 또는 사용자 입력값
      requestFieldValues: {
        summary: title,
        description: content // 단순 텍스트로 시작
      }
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
    console.log('Response headers:', response.headers);

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
      
      // 403 에러의 경우 더 자세한 정보 제공
      if (response.status === 403) {
        return {
          success: false,
          message: `접근 권한이 없습니다. Service Desk ID(${serviceDeskId})나 Request Type ID(${requestTypeId})를 확인해주세요.`,
          details: errorData
        };
      }
      
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

// 현재 사용자 정보 조회
resolver.define('getCurrentUser', async (req) => {
  try {
    const response = await api.asUser().requestJira(
      route`/rest/api/3/myself`,
      {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
        }
      }
    );

    if (response.status === 200) {
      const userData = await response.json();
      console.log('Current user:', userData);
      return {
        success: true,
        user: userData
      };
    } else {
      return {
        success: false,
        message: `사용자 정보 조회 실패: ${response.status}`
      };
    }
  } catch (error) {
    console.error('Error getting current user:', error);
    return {
      success: false,
      message: '사용자 정보 조회 중 오류가 발생했습니다: ' + error.message
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

export const handler = resolver.getDefinitions();