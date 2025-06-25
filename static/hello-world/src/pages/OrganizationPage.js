import React from 'react';

function OrganizationPage() {
  const organizationData = [
    {
      category: '조직',
      chonggwal: '(C) ICT본부',
      hyundai: '(H) CEO 직속',
      kia: '(K) CEO 직속',
      group: '42dot'
    },
    {
      category: '조직',
      chonggwal: '(C) 통합보안센터',
      hyundai: '(H) 글로벌사업관리본부',
      kia: '(K) 글로벌사업관리본부',
      group: ''
    },
    {
      category: '조직',
      chonggwal: '(C) 기획조정본부',
      hyundai: '(H) Global Sales and Marketing',
      kia: '(K) 기업전략실',
      group: ''
    },
    {
      category: '조직',
      chonggwal: '(C) 미래전략본부',
      hyundai: '(H) Global DND',
      kia: '(K) PBV비즈니스사업부',
      group: ''
    },
    {
      category: '조직',
      chonggwal: '(C) HMG에너지&수소사업본부',
      hyundai: '(H) 경영지원본부',
      kia: '(K) 경영지원본부',
      group: ''
    },
    {
      category: '조직',
      chonggwal: '(C) 기획조정담당 직속',
      hyundai: '(H) HR본부',
      kia: '',
      group: ''
    },
    {
      category: '조직',
      chonggwal: '(C) 정책개발실',
      hyundai: '(H) 재경본부',
      kia: '(K) 재경본부',
      group: ''
    },
    {
      category: '조직',
      chonggwal: '(C) 법무실',
      hyundai: '(H) Strategy & Governance',
      kia: '',
      group: ''
    },
    {
      category: '조직',
      chonggwal: '(C) 전략기획담당',
      hyundai: '(H) IR담당',
      kia: '(K) IR/전략투자담당',
      group: ''
    },
    {
      category: '조직',
      chonggwal: '(C) 인사실',
      hyundai: '(H) 브랜드마케팅본부',
      kia: '(K) 고객경험본부',
      group: ''
    },
    {
      category: '조직',
      chonggwal: '(C) 감사실',
      hyundai: '(H) 제네시스사업본부',
      kia: '',
      group: ''
    },
    {
      category: '조직',
      chonggwal: '(C) 전략기획담당 직속',
      hyundai: '(H) 글로벌생산&LCV사업본부',
      kia: '(K) 특수사업부',
      group: ''
    },
    {
      category: '조직',
      chonggwal: '(C) HMG경영연구원',
      hyundai: '(H) 글로벌생산운영본부',
      kia: '',
      group: ''
    },
    {
      category: '조직',
      chonggwal: '(C) 워성담당 직속',
      hyundai: '(H) 미주대전역',
      kia: '(K) 북미지역본부',
      group: ''
    }
  ];

  return (
    <section className="page-content">
      <div className="page-header">
        <h2>Organization</h2>
        <p>HMG 조직 구조를 확인하세요.</p>
      </div>
      
      <div className="organization-table">
        <div className="org-table-header">
          <div className="col-category">Category</div>
          <div className="col-chonggwal">총괄</div>
          <div className="col-hyundai">현대</div>
          <div className="col-kia">기아</div>
          <div className="col-group">그룹사</div>
        </div>
        
        {organizationData.map((org, index) => (
          <div key={index} className="org-table-row">
            <div className="col-category">{org.category}</div>
            <div className="col-chonggwal">
              {org.chonggwal && <a href="#" className="org-link">{org.chonggwal}</a>}
            </div>
            <div className="col-hyundai">
              {org.hyundai && <a href="#" className="org-link">{org.hyundai}</a>}
            </div>
            <div className="col-kia">
              {org.kia && <a href="#" className="org-link">{org.kia}</a>}
            </div>
            <div className="col-group">
              {org.group && <a href="#" className="org-link">{org.group}</a>}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default OrganizationPage;